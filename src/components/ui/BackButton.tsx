import { useNavigate } from 'react-router-dom';

import ArrowIcon from '@/assets/social-arrow-icon.svg';

interface Props {
  className?: string;
}

export const BackButton = ({ className = '' }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className={`
        flex items-center justify-center cursor-pointer shrink-0
        transition-opacity duration-300 hover:opacity-50
        ${className}
      `}
    >
      <img
        src={ArrowIcon}
        aria-hidden="true"
        className="w-full h-full object-contain rotate-225 invert"
      />
    </button>
  );
};
