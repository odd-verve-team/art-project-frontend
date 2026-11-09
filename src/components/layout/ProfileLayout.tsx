import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

import { ProfileNavigation } from '@/components/features/Profile/ProfileNavigation';
import { Loader } from '@/components/ui/Loader';

import { DEFAULT_AVATAR } from '@/constants/common';
import { cn } from '@/utils/cn';

// #region Constants & Styles
const AVATAR_BASE = `
  w-[32px] h-[32px] rounded-full
  md:w-[64px] md:h-[64px]
`;

const AVATAR_CONTAINER = cn(
  AVATAR_BASE,
  'flex items-center justify-center overflow-hidden bg-muted shrink-0',
);
// #endregion

export const ProfileLayout = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const profile = useProfileStore((state) => state.profile);
  const isLoading = useProfileStore((state) => state.isLoading);

  const firstName = profile?.first_name || 'User';
  const lastName = profile?.last_name || 'Name';
  const avatar = profile?.avatar_url || DEFAULT_AVATAR;

  const handleLogout = () => {
    navigate('/', { replace: true });
    logout();
  };

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
            text-[52px] md:text-[80px] lg:text-[110px] xl:text-[140px]
            font-[700] uppercase text-center whitespace-nowrap
          `}
        >
          your profile
        </h2>

        <div className="flex flex-col items-center gap-[16px] w-full">
          <div
            className={`
              grid grid-cols-[1fr_auto_1fr] items-center gap-[12px] w-full max-w-[400px]
              text-[10px] font-[500] uppercase tracking-[1px]
              md:gap-[20px] md:text-[16px]
              ${isLoading && !profile ? 'animate-pulse opacity-60' : ''}
            `}
          >
            <span className="text-right truncate">{firstName}</span>

            <div className={AVATAR_CONTAINER}>
              <img
                src={avatar}
                alt={`${firstName} ${lastName}`}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-left truncate">{lastName}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className={`
              hidden lg:block
              text-[12px] text-background/70 font-[500] uppercase tracking-[1px]
              underline underline-offset-[4px]
              hover:text-background transition-colors duration-300 cursor-pointer
            `}
          >
            log out
          </button>
        </div>
      </div>

      <main
        className={`
          w-full px-global
          pt-[16px] pb-[32px]
          md:pt-[32px] md:pb-[48px]
          lg:pt-[48px] lg:pb-[64px]
        `}
      >
        <div
          className={`
            w-full max-w-[1440px] mx-auto
            lg:border lg:border-primary lg:p-[40px_32px]
          `}
        >
          <ProfileNavigation />
          {isLoading && !profile ? (
            <Loader text='Loading profile...'/>
          ) : (
            <Outlet context={{ user, profile }} />
          )} 
        </div>
      </main>
    </div>
  );
};
