import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'home', path: '/' },
  { label: 'about', path: '/#about' },
  { label: 'gallery', path: '/gallery' },
  { label: 'profile', path: '/profile' },
];

const getLinkClass =
  (path: string) =>
  ({ isActive }: { isActive: boolean }) => {
    const isCurrent = isActive && !path.includes('#');

    return `
    inline-block text-background text-[24px] leading-[30px]
    transition-all duration-300 ease-out

    ${isCurrent
      ? 'font-[600] opacity-100'
      : 'font-[300] opacity-70 hover:opacity-100'
    }
  `;
  };

export const Navigation = () => {
  return (
    <nav aria-label="Navigation" className="flex w-[485px] h-[50px]">
      <ul className="flex w-full items-center justify-between">
        {NAV_ITEMS.map((item) => (
          <li key={item.path} className="flex-1 flex justify-center">
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={getLinkClass(item.path)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
