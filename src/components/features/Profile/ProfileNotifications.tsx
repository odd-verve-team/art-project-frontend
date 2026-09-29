import { useState } from 'react';
import { cn } from '@/utils/cn';
import ArrowIcon from '@/assets/social-arrow-icon.svg';

interface Notification {
  id: number;
  date: string;
  title: string;
  content?: string;
}

//! DELETE MOCKDATA in future
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    date: '12/07',
    title: 'MARY ARTWORK SHIPPED: YOUR ORDER HAS BEEN DISPATCHED',
  },
  {
    id: 2,
    date: '01/10',
    title:
      'INQUIRY ANSWERED: THE CURATOR HAS RESPONDED TO YOUR REQUEST REGARDING "THE SHADOW OF STILLNESS".',
    content:
      'THANK YOU FOR YOUR INTEREST IN THE SHADOW OF STILLNESS. OUR CURATOR HAS REVIEWED YOUR REQUEST AND PROVIDED THE FULL ARTWORK DETAILS, HIGH-RESOLUTION VISUAL DOCUMENTATION, AND CURRENT SHIPPING ESTIMATES.',
  },
  {
    id: 3,
    date: '21/04',
    title: 'MARY ARTWORK SHIPPED: YOUR ORDER HAS BEEN DISPATCHED',
  },
  {
    id: 4,
    date: '21/03',
    title: 'ARTIST HAS JUST BEEN LISTED IN OUR NEW CURATED COLLECTION',
  },
];
//! DELETE MOCKDATA in future

// #region Constants & Styles
const TEXT_BASE = 'font-[500] tracking-[1px] uppercase';

const DATE_CLASS = cn(TEXT_BASE, 'text-muted text-[10px]/[24px]');

const TITLE_CLASS = cn(
  TEXT_BASE,
  'text-[12px]/[24px] hover:text-muted transition-colors duration-300',
);

const CONTENT_CLASS = cn(
  TEXT_BASE,
  'mt-[24px] mb-[12px] text-primary text-[10px]/[16px] font-[300]',
);
// #endregion

export const ProfileNotifications = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleNotification = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="profile-notifications" className="mb-[32px]">
      <div className="border border-primary p-[16px_8px] md:p-[24px]">
        {MOCK_NOTIFICATIONS.map((item, index) => {
          const isOpen = expandedId === item.id;
          const hasBorder = index !== MOCK_NOTIFICATIONS.length - 1;

          return (
            <div
              key={item.id}
              onClick={() => toggleNotification(item.id)}
              className={`
                flex flex-col items-start p-[8px_16px] cursor-pointer
                ${hasBorder ? 'border-b border-primary' : ''}
              `}
            >
              <span className={DATE_CLASS}>{item.date}</span>

              <div className="w-full flex justify-between items-start gap-[8px]">
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
