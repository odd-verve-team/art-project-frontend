import { useState, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageIcon from '@/assets/image-icon.svg';

const getCroppedImg = async (
  image: HTMLImageElement,
  crop: PixelCrop,
): Promise<Blob | null> => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
};

interface Props {
  currentImage: FileList | null | undefined;
  onImageSelect: (files: FileList | null) => void;
}

export const ProfileArtUploader = ({ currentImage, onImageSelect }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageSrcToCrop, setImageSrcToCrop] = useState<string | null>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrcToCrop(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleSaveCrop = async () => {
    if (!imageSrcToCrop) return;

    const getFinalBlob = async () => {
      if (
        imgRef.current &&
        completedCrop &&
        completedCrop.width > 0 &&
        completedCrop.height > 0
      ) {
        return await getCroppedImg(imgRef.current, completedCrop);
      }
      const response = await fetch(imageSrcToCrop);
      return await response.blob();
    };

    const finalBlob = await getFinalBlob();

    if (finalBlob) {
      const croppedFile = new File([finalBlob], 'artwork.jpg', {
        type: 'image/jpeg',
      });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(croppedFile);
      onImageSelect(dataTransfer.files);

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(finalBlob));
    }

    setImageSrcToCrop(null);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  const handleCancelCrop = () => {
    setImageSrcToCrop(null);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  const handleRemoveImage = () => {
    onImageSelect(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[12px]">
      <label
        className={`
          relative group cursor-pointer overflow-hidden
          flex items-center justify-center
          w-[257px] h-[326px] m-auto
          bg-background border border-primary
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={onFileChange}
        />

        {currentImage && previewUrl ? (
          <div className="flex items-center justify-center w-full h-full p-[20px]">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : (
          <img
            src={ImageIcon}
            alt="Upload Image"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </label>

      {currentImage && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className={`
            text-[12px] text-primary/70 tracking-[1px] uppercase 
            underline underline-offset-4
            hover:text-primary transition-colors 
          `}
        >
          Remove Photo
        </button>
      )}

      {imageSrcToCrop && (
        <div
          className={`
            fixed inset-0 z-[100]
            flex flex-col items-center justify-center
            bg-black/95 p-[20px]
          `}
        >
          <div
            className={`
              relative flex items-center justify-center 
              w-full max-w-[90vw] max-h-[70vh]
              bg-black/50 overflow-auto
            `}
          >
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img
                ref={imgRef}
                src={imageSrcToCrop}
                alt="Crop preview"
                className="max-h-[70vh] w-auto object-contain"
              />
            </ReactCrop>
          </div>

          <div className="flex gap-[16px] mt-[24px]">
            <button
              type="button"
              onClick={handleCancelCrop}
              className={`
                px-[20px] py-[10px] border border-white
                text-[12px] text-white tracking-[1px] uppercase
                hover:bg-white/10 transition-colors
              `}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveCrop}
              className={`
                px-[20px] py-[10px] bg-white
                text-[12px] text-black tracking-[1px] uppercase
                hover:bg-gray-200 transition-colors
              `}
            >
              Save Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
