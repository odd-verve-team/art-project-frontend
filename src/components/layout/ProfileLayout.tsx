import { Outlet } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/utils/cn';

import { ProfileNavigation } from '../features/Profile/ProfileNavigation';

// #region Constants & Styles
const AVATAR_BASE = `
  w-[32px] h-[32px] rounded-full
`;

const AVATAR_CONTAINER = cn(
  AVATAR_BASE,
  'flex items-center justify-center overflow-hidden bg-muted shrink-0',
);
// #endregion

export const ProfileLayout = () => {
  const user = useAuthStore((state) => state.user);

  const firstName = user?.first_name || 'User';
  const lastName = user?.last_name || 'Name';

  return (
    <div>
      <div
        className={`
          flex flex-col items-center gap-[34px]
          px-global pt-[100px] pb-[34px]
          md:pt-[60px] md:pb-[80px] lg:pt-[80px] lg:pb-[110px]
          bg-primary text-background
        `}
      >
        <h2
          className={`
            text-[42px] md:text-[100px] lg:text-[140px] leading-none
            font-[700] uppercase text-center
          `}
        >
          your profile
        </h2>

        <div
          className={`
            grid grid-cols-[1fr_auto_1fr] items-center gap-[12px] w-full max-w-[400px]
            text-[10px] font-[500] uppercase tracking-[1px]
          `}
        >
          <span className="text-right truncate">{firstName}</span>

          <div className={AVATAR_CONTAINER}>
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <span className="text-left truncate">{lastName}</span>
        </div>
      </div>

      <main
        className={`
          w-full max-w-[1440px] mx-auto px-global
          pt-[16px] pb-[32px]
        `}
      >
        <ProfileNavigation />
        <Outlet context={{ user }} />
      </main>
    </div>
  );
};