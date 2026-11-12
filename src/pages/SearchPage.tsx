import { ArtworkGrid } from '@/components/features/Artworks/ArtworkGrid';
import { GalleryToolbar } from '@/components/features/Gallery/GalleryToolbar';

import { MOCK_ARTWORKS } from '@/mocks/data/artworksData';

export const SearchPage = () => {
  return (
    <div>
      <div className="bg-primary text-background px-global">
        <div className="max-w-[1440px] mx-auto w-full">
          <h2
            className={`
              text-center font-[700] uppercase
              pt-[100px] pb-[60px] text-[52px]
              md:pt-[60px] md:pb-[80px] md:text-[100px]
              lg:pt-[80px] lg:pb-[100px] lg:text-[140px]
            `}
          >
            search
          </h2>
        </div>
      </div>

      <div className="w-full px-global">
        <div className="max-w-[1440px] mx-auto w-full">
          <div
            className={`
              my-[24px]
              md:bg-background md:my-[28px] md:p-[28px] md:border-[1px] md:border-primary
              lg:my-[32px] lg:p-[32px]
            `}
          >
            <GalleryToolbar />

            <div
              className={`
                bg-background md:bg-transparent
                border-primary border-[1px] px-[8px] py-[16px]
                md:border-none md:p-0
              `}
            >
              <ArtworkGrid artworks={MOCK_ARTWORKS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
