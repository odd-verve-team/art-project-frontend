import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="relative inline-flex items-center bg-primary">
      <span className="absolute top-0 left-0 w-[11px] h-[11px] border-t border-l border-white" />
      <span className="absolute top-0 right-0 w-[11px] h-[11px] border-t border-r border-white" />
      <span className="absolute bottom-0 left-0 w-[11px] h-[11px] border-b border-l border-white" />
      <span className="absolute bottom-0 right-0 w-[11px] h-[11px] border-b border-r border-white" />

      <div className="flex items-start px-[16px] py-[14px] leading-none">
        <span className="text-background font-black text-[36px]">
          ODD
        </span>
        <span className="text-background font-bold text-[16px] mt-[3px]">
          VERVE
        </span>
      </div>
    </Link>
  );
}