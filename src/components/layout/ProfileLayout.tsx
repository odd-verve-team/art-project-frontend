import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { usersApi } from '@/services/api';
import type { UserDetail } from '@/types/user';
import { cn } from '@/utils/cn';

import { ProfileNavigation } from '../features/Profile/ProfileNavigation';
import { Loader } from '@/components/ui/Loader';

// #region Constants & Styles
const AVATAR_BASE = `
  w-[32px] h-[32px] rounded-full
`;

const AVATAR_SKELETON = cn(
  AVATAR_BASE,
  'bg-muted/30 animate-pulse'
);

const AVATAR_CONTAINER = cn(
  AVATAR_BASE,
  'flex items-center justify-center overflow-hidden bg-muted'
);
// #endregion

export const ProfileLayout = () => {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTempUser = async () => {
      try {
        const data = await usersApi.getById(10);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch temp user', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTempUser();
  }, []);

  return (
    <div className="">
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
            flex items-center gap-[12px] 
            text-[10px] font-[500] uppercase tracking-[1px]
          `}
        >
          <span>{isLoading ? '...' : user?.first_name}</span>

          {isLoading ? (
            <div className={AVATAR_SKELETON} />
          ) : (
            <div className={AVATAR_CONTAINER}>
              {user?.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <span>{isLoading ? '...' : user?.last_name}</span>
        </div>
      </div>

      <main
        className={`
          w-full max-w-[1440px] mx-auto px-global
          pt-[16px] pb-[32px]
        `}
      >
        <ProfileNavigation />

        {isLoading ? (
          <Loader text="Loading profile..." />
        ) : (
          <Outlet context={{ user }} />
        )}
      </main>
    </div>
  );
};
