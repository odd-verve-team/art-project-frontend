import { FooterNavigation } from './FooterNavigation';
import { NewsletterForm } from './NewsletterForm';
import { FOOTER_TEXT_BASE, FOOTER_TITLE } from './footerConstants';

export const Footer = () => {
  return (
    <footer
      className={`
        bg-primary text-background border-t border-background px-global pb-footer
      `}
    >
      <div className="max-w-[1440px] mx-auto w-full">
        <div
          className={`
          flex flex-col gap-[46px]
          lg:grid lg:grid-cols-12 lg:gap-[32px] lg:mt-[24px]
        `}
        >
          <div
            className={`
            order-1 
            lg:col-span-5
          `}
          >
            <FooterNavigation />
          </div>

          <div
            className={`
            order-2
            lg:order-3 lg:col-span-4 lg:mt-0
          `}
          >
            <NewsletterForm />
          </div>

          <div
            className={`
            order-3 flex justify-between items-end
            lg:order-2 lg:col-span-3 lg:mt-0 lg:block lg:items-stretch
            ${FOOTER_TEXT_BASE}
          `}
          >
            <div>
              <h3 className={FOOTER_TITLE}>Address</h3>
              <p className="mt-[8px] underline underline-offset-2">
                22 KHRESHCHATYK STREET, APT 15,
                <br />
                KYIV, 01001, UKRAINE
              </p>
            </div>

            <div className="text-right lg:hidden">
              <p className="text-muted text-[10px]/[24px] font-[500]">
                © 2026 ODD VERVE
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block text-right mt-[60px]">
          <p className="text-muted text-[10px]/[24px] font-[500]">
            © 2026 ODD VERVE
          </p>
        </div>
      </div>
    </footer>
  );
};
