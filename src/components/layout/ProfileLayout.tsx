import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { usersApi } from '@/services/api';
import type { UserDetail } from '@/types/user';
import { ProfileNavigation } from '../features/Profile/ProfileNavigation';

export const ProfileLayout = () => {
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    const fetchTempUser = async () => {
      try {
        const data = await usersApi.getById(10);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch temp user', error);
      }
    };

    fetchTempUser();
  }, []);

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
            font-[700] uppercase leading-none text-center
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
          <span>{user ? user.first_name : 'Loading'}</span>
          <div className="w-[32px] h-[32px] rounded-full bg-muted overflow-hidden flex items-center justify-center">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <span>{user ? user.last_name : '...'}</span>
        </div>
      </div>

      <main className="px-global max-w-[1440px] mx-auto w-full pt-[16px] pb-[32px]">
        <ProfileNavigation />
        <Outlet context={{user}} />
      </main>
    </div>
  );
};
