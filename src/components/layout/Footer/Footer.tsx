import { FooterNavigation } from "./FooterNavigation"
import { NewsletterForm } from "./NewsletterForm"

export const Footer = () => {
  return (
    <div className="bg-primary text-background border-t border-background">
      <div className="flex justify-between">
        <FooterNavigation />
        <NewsletterForm />
      </div>
      <div className="text-right mt-[25px]">
        <p className="text-muted text-[10px]/[24px] font-[500]">© 2026 ODD VERVE</p>
      </div>
    </div>
  );
}