import { NavLink } from "react-router-dom";
import ArrowIcon from "@/assets/social-arrow-icon.svg";

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

export const FooterNavigation = () => {
  const hoverClasses = 'transition-all duration-500 ease-out hover:opacity-70';

  return (
    <div
      className="
      mt-[24px] grid grid-cols-3 gap-x-[64px] gap-y-[32px]
      text-[12px] font-[300] tracking-[1px] text-white uppercase
    "
    >
      <div>
        <p className="max-w-[105px] mt-[10px] text-[10px]/[13px] font-[400]">
          please contact us in any way you like
        </p>
      </div>

      <div>
        <h3 className="text-[16px]/[24px] font-[500]">Social</h3>
        <ul className="mt-[8px] flex flex-col gap-[8px]">
          {SOCIAL_ITEMS.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                className={`flex items-center gap-[8px] w-fit ${hoverClasses}`}
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

      <div className="max-w-[135px]">
        <h3 className="text-[16px]/[24px] font-[500]">Address</h3>
        <p className="w-max underline underline-offset-2">
          22 KHRESHCHATYK STREET, APT 15,
          <br />
          KYIV, 01001, UKRAINE
        </p>
      </div>

      <div className="col-start-1 row-start-2">
        <h3 className="text-[16px]/[24px] font-[500]">Other Pages</h3>
        <ul className="mt-[8px] flex flex-col gap-[8px]">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={`block leading-none w-fit ${hoverClasses}`}
                onClick={() => window.scrollTo(0, 0)}
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
    </div>
  );
}