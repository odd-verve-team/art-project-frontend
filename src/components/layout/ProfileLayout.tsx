import { Outlet } from 'react-router-dom';

export const ProfileLayout = () => {
  return (
    <div className="">
      <div
        className={`
          bg-primary text-background px-global
          flex flex-col items-center gap-[34px]
          pt-[100px] pb-[34px]
          md:pt-[60px] md:pb-[80px]
          lg:pt-[80px] lg:pb-[110px]
        `}
      >
        <h2
          className={`
            font-[700] uppercase leading-none
            text-[42px] md:text-[100px] lg:text-[140px]
          `}
        >
          your profile
        </h2>

        <div
          className={`
            flex items-center gap-[12px] uppercase
            text-[10px] font-[500] tracking-[1px]
          `}
        >
          <span>Test</span>
          <div className="w-[32px] h-[32px] rounded-full bg-muted overflow-hidden"></div>
          <span>Name</span>
        </div>
      </div>

      <main className="px-global max-w-[1440px] mx-auto w-full pt-[40px]">
        <Outlet />
      </main>
    </div>
  );
};
