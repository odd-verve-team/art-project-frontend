import { useEffect, useState } from 'react';
import { useNotificationsStore } from '@/store/useNotificationsStore';
import { Loader } from '@/components/ui/Loader';

import ArrowIcon from '@/assets/social-arrow-icon.svg';
import { formatDate } from '@/utils/formatDate';
import { cn } from '@/utils/cn';

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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const fetchNotifications = useNotificationsStore((state => state.fetchNotifications));
  const notifications = useNotificationsStore((state => state.notifications));
  const isLoading = useNotificationsStore((state) => state.isLoading);

  const toggleNotification = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  let content;

  if (isLoading && notifications.length === 0) {
    content = (
      <div className="min-h-[100px] flex justify-center items-center">
        <Loader text="Loading notifications..." compact />
      </div>
    );
  } else if (notifications.length === 0) {
    content = (
      <div className="min-h-[100px] flex items-center justify-center text-center p-[24px]">
        <p className="text-primary text-[12px] uppercase font-[500] tracking-[1px]">
          You have no notifications yet
        </p>
      </div>
    );
  } else {
    content = notifications.map((item, index) => {
      const isOpen = expandedIndex === index;
      const hasBorder = index !== notifications.length - 1;

      return (
        <div
          key={`${item.created_at}-${index}`}
          onClick={() => toggleNotification(index)}
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
            <span className={DATE_CLASS}>{formatDate(item.created_at)}</span>

            <div className="w-full flex justify-between items-start gap-[8px] flex-1 min-w-0">
              <div
                className={`
                  ${TITLE_CLASS}
                  ${isOpen ? 'text-muted whitespace-normal' : 'text-primary truncate'}
                `}
              >
                {item.title}
              </div>

              {item.message_body && (
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

          {isOpen && item.message_body && (
            <div className={CONTENT_CLASS}>{item.message_body}</div>
          )}
        </div>
      );
    });
  }

  return (
    <section id="profile-notifications" className="mb-[32px] lg:mb-0">
      <div
        className={`
          border border-primary p-[16px_8px]
          md:p-[24px]
          lg:border-none lg:p-0
        `}
      >
        {content}
      </div>
    </section>
  );
};