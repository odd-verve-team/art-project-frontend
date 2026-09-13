import { NavLink } from 'react-router-dom';

import { NAV_ITEMS, HEADER_HOVER, type HeaderTheme } from './headerConstants';

const getLinkClass =
  (path: string, theme: HeaderTheme) =>
  ({ isActive }: { isActive: boolean }) => {
    const isCurrent = isActive && !path.includes('#');
    const textColor = theme === 'dark' ? 'text-background' : 'text-primary';

    return `
      inline-block text-[24px] leading-[30px]
      ${textColor}
      ${HEADER_HOVER}
      ${isCurrent ? 'font-[600] opacity-100' : 'font-[300] opacity-70 hover:opacity-100'}
    `;
  };

export const HeaderNavigation = ({ theme }: { theme: HeaderTheme }) => {
  return (
    <nav aria-label="HeaderNavigation" className="flex w-[485px] h-[50px]">
      <ul className="flex w-full items-center justify-between">
        {NAV_ITEMS.map((item) => (
          <li key={item.path} className="flex-1 flex justify-center">
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={getLinkClass(item.path, theme)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
