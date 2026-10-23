import { useState } from 'react';
import { cn } from '@/utils/cn';
import ArrowIcon from '@/assets/social-arrow-icon.svg';
import { MOCK_PROFILE_NOTIFICATIONS } from './profileMockData';

// #region Constants & Styles
const TEXT_BASE = 'font-[500] tracking-[1px] uppercase';

const DATE_CLASS = cn(
  TEXT_BASE,
  'text-muted text-[10px]/[24px] shrink-0 md:text-[11px]/[24px] lg:text-[12px]/[24px]',
);

const TITLE_CLASS = cn(
  TEXT_BASE,
  'text-[12px]/[24px] hover:text-muted transition-colors duration-300 md:text-[14px]/[24px] lg:text-[16px]/[24px]',
);

const CONTENT_CLASS = cn(
  TEXT_BASE,
  'mt-[24px] mb-[12px] text-primary text-[10px]/[16px] font-[300]',
  'md:mt-[16px] md:pl-[48px] md:text-[11px]/[18px]',
  'lg:pl-[56px] lg:text-[12px]/[20px]',
);
// #endregion

export const ProfileNotifications = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleNotification = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="profile-notifications" className="mb-[32px] lg:mb-0">
      <div
        className={`
          border border-primary p-[16px_8px]
          md:p-[24px]
          lg:border-none lg:p-0
        `}
      >
        {MOCK_PROFILE_NOTIFICATIONS.map((item, index) => {
          const isOpen = expandedId === item.id;
          const hasBorder = index !== MOCK_PROFILE_NOTIFICATIONS.length - 1;

          return (
            <div
              key={item.id}
              onClick={() => toggleNotification(item.id)}
              className={`
                flex flex-col items-start p-[8px_16px] cursor-pointer
                lg:py-[16px] lg:px-[8px]
                ${hasBorder ? 'border-b border-primary' : ''}
              `}
            >
              <div
                className={`
                  w-full flex flex-col items-start
                  md:flex-row md:items-center md:gap-[20px]
                  lg:gap-[24px]
                `}
              >
                <span className={DATE_CLASS}>{item.date}</span>

                <div className="w-full flex justify-between items-start gap-[8px] flex-1 min-w-0">
                  <div
                    className={`
                      ${TITLE_CLASS}
                      ${isOpen ? 'text-muted whitespace-normal' : 'text-primary truncate'}
                    `}
                  >
                    {item.title}
                  </div>

                  {item.content && (
                    <img
                      src={ArrowIcon}
                      aria-hidden="true"
                      className={`
                        w-[8px] h-[8px] mt-[8px] shrink-0 invert transition-transform duration-200
                        ${isOpen ? 'rotate-135' : '-rotate-45'}
                      `}
                    />
                  )}
                </div>
              </div>

              {isOpen && item.content && (
                <div className={CONTENT_CLASS}>{item.content}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
