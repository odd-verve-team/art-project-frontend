interface Props {
  text?: string;
  compact?: boolean;
}

export const Loader = ({ text = 'Loading...', compact = false }: Props) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center w-full gap-[24px]
        ${compact ? 'py-0' : 'py-[80px] lg:py-[120px]'}
      `}
    >
      <div className="custom-linear-loader"></div>

      {text && (
        <p className="text-primary font-[500] uppercase tracking-[1px] text-[14px]">
          {text}
        </p>
      )}

      <style>{`
        .custom-linear-loader {
          display: block;
          width: 130px;
          height: 4px;
          border-radius: 30px;
          background-color: rgba(17, 17, 17, 0.2);
          position: relative;
        }
        .custom-linear-loader::before {
          content: "";
          position: absolute;
          background: #111111;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          border-radius: 30px;
          animation: moving 1s ease-in-out infinite;
        }
        @keyframes moving {
          50% {
            width: 100%;
          }
          100% {
            width: 0;
            right: 0;
            left: unset;
          }
        }
      `}</style>
    </div>
  );
};
