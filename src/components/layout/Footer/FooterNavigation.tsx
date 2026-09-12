import { NavLink } from 'react-router-dom';

import {
  FOOTER_TEXT_BASE,
  FOOTER_TITLE,
  FOOTER_HOVER,
} from './footerConstants';

import ArrowIcon from '@/assets/social-arrow-icon.svg';

const SOCIAL_ITEMS = [
  { label: 'facebook', url: '1' },
  { label: 'instagram', url: '2' },
  { label: 'youtube', url: '3' },
];

const NAV_ITEMS = [
  { label: 'home', path: '/' },
  { label: 'about', path: '/#about' },
  { label: 'gallery', path: '/gallery' },
  { label: 'profile', path: '/profile' },
];

const LINK_CLASS = `block leading-none w-fit ${FOOTER_HOVER}`;
const SOCIAL_LINK_CLASS = `flex items-center gap-[8px] w-fit ${FOOTER_HOVER}`;

export const FooterNavigation = () => {
  return (
    <div
      className={`
        grid grid-cols-2 gap-x-[95px] gap-y-[32px]
        lg:gap-x-[64px]
        ${FOOTER_TEXT_BASE}
      `}
    >
      <div
        className={`
          col-span-2 
          lg:col-span-1
        `}
      >
        <p className="max-w-[105px] mt-[16px] lg:mt-[10px] text-[10px]/[13px] font-[400]">
          please contact us in any way you like
        </p>
      </div>

      <div
        className={`
          col-span-1 
          lg:col-start-1 lg:row-start-2
        `}
      >
        <h3 className={FOOTER_TITLE}>Other Pages</h3>
        <ul className="mt-[8px] flex flex-col gap-[8px]">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={LINK_CLASS}
              >
                {({ isActive }) =>
                  isActive && !item.path.includes('#about')
                    ? `[ ${item.label} ]`
                    : item.label
                }
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`
          col-span-1 
          lg:col-start-2 lg:row-start-1 lg:row-span-2
        `}
      >
        <h3 className={FOOTER_TITLE}>Social</h3>
        <ul className="mt-[8px] flex flex-col gap-[8px]">
          {SOCIAL_ITEMS.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                className={SOCIAL_LINK_CLASS}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                <img src={ArrowIcon} alt="arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
