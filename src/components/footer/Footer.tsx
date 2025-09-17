import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faPinterest,
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";

export type FooterLabels = {
  sections: string;
  help: string;
  legal: string;
  contact: string;
  about: string;
  faq: string;
  phone_label: string;
  email_label: string;
  terms: string;
  privacy: string;
  tagline: string;
  shop: string;
  newsletter: string;
  newsletter_placeholder: string;
  newsletter_cta: string;
  newsletter_privacy: string;
  follow_us: string;
  adults_only: string;
  secure_payment: string;
  discreet_shipping: string;
  returns: string;
  payments: string;
  legal_notice: string;
  cookies: string;
};

export type NavLabels = {
  new: string;
  best: string;
  categories: string;
  lingerie: string;
  accessories: string;
  gifts: string;
  promotions: string;
};

export default function Footer({
  footer,
  nav,
}: {
  footer: FooterLabels;
  nav: NavLabels;
}) {
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="border-t border-white/10 mt-10">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="space-y-3 md:hidden max-w-7xl mx-auto px-4 md:px-6">
          <details className="rounded-md bg-black/10 p-3 open:bg-black/15">
            <summary className="cursor-pointer select-none section-title">
              {footer.shop}
            </summary>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/nouveautes" className="footer-link">
                  {nav.new}
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="footer-link">
                  {nav.best}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="footer-link">
                  {nav.categories}
                </Link>
              </li>
              <li>
                <Link href="/lingerie" className="footer-link">
                  {nav.lingerie}
                </Link>
              </li>
              <li>
                <Link href="/accessoires" className="footer-link">
                  {nav.accessories}
                </Link>
              </li>
              <li>
                <Link href="/idees-cadeaux" className="footer-link">
                  {nav.gifts}
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="footer-link">
                  {nav.promotions}
                </Link>
              </li>
            </ul>
          </details>

          <details className="rounded-md bg-black/10 p-3 open:bg-black/15">
            <summary className="cursor-pointer select-none section-title">
              {footer.help}
            </summary>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="footer-link">
                  {footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link">
                  {footer.faq}
                </Link>
              </li>
              <li>
                <a href="tel:+33123456789" className="footer-link">
                  {footer.phone_label}: +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="footer-link">
                  {footer.email_label}: contact@example.com
                </a>
              </li>
            </ul>
          </details>

          <details className="rounded-md bg-black/10 p-3 open:bg-black/15">
            <summary className="cursor-pointer select-none section-title">
              {footer.legal}
            </summary>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link href="/cgu" className="footer-link">
                  {footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="footer-link">
                  {footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="footer-link">
                  {footer.legal_notice}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="footer-link">
                  {footer.cookies}
                </Link>
              </li>
            </ul>
          </details>
        </div>

        <div className="md:hidden max-w-7xl mx-auto px-4 md:px-6 mt-3 space-y-3 text-sm">
          <p>{footer.tagline}</p>
          <form
            action="/newsletter"
            method="POST"
            className="flex items-center gap-2"
          >
            <label htmlFor="newsletter-email-m" className="sr-only">
              {footer.newsletter}
            </label>
            <div className="input-pill w-full">
              <input
                id="newsletter-email-m"
                name="email"
                type="email"
                required
                placeholder={footer.newsletter_placeholder}
                className="h-8 w-full border-0 bg-transparent p-0 placeholder:text-white/60 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none caret-[color:var(--brand)]"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              className="shrink-0 rounded-full"
            >
              {footer.newsletter_cta}
            </Button>
          </form>
          <p className="text-xs text-white/60">{footer.newsletter_privacy}</p>
          <ul
            aria-label={footer.follow_us}
            className="flex items-center gap-3 pt-1"
          >
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="hover:text-brand transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="hover:text-brand transition-colors"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Pinterest"
                className="hover:text-brand transition-colors"
              >
                <FontAwesomeIcon icon={faPinterest} className="h-5 w-5" />
              </a>
            </li>
          </ul>
          <ul className="flex flex-wrap items-center gap-3 text-xs text-white/70">
            <li>{footer.adults_only}</li>
            <li>•</li>
            <li>{footer.secure_payment}</li>
            <li>•</li>
            <li>{footer.discreet_shipping}</li>
            <li>•</li>
            <li>{footer.returns}</li>
          </ul>
          <div
            aria-label={footer.payments}
            className="flex items-center gap-3 pt-1 opacity-90"
          >
            <span className="icon-btn" aria-hidden>
              <FontAwesomeIcon icon={faCcVisa} className="h-6 w-6" />
            </span>
            <span className="icon-btn" aria-hidden>
              <FontAwesomeIcon icon={faCcMastercard} className="h-6 w-6" />
            </span>
            <span className="icon-btn" aria-hidden>
              <FontAwesomeIcon icon={faCcAmex} className="h-6 w-6" />
            </span>
            <span className="icon-btn" aria-hidden>
              <FontAwesomeIcon icon={faCcPaypal} className="h-6 w-6" />
            </span>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5 max-w-7xl mx-auto px-4 md:px-6">
          <nav
            aria-label={footer.sections}
            className="space-y-2 md:col-span-2 md:px-3"
          >
            <h2 className="sr-only">{footer.sections}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nouveautes" className="footer-link">
                  {nav.new}
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="footer-link">
                  {nav.best}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="footer-link">
                  {nav.categories}
                </Link>
              </li>
              <li>
                <Link href="/lingerie" className="footer-link">
                  {nav.lingerie}
                </Link>
              </li>
              <li>
                <Link href="/accessoires" className="footer-link">
                  {nav.accessories}
                </Link>
              </li>
              <li>
                <Link href="/idees-cadeaux" className="footer-link">
                  {nav.gifts}
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="footer-link">
                  {nav.promotions}
                </Link>
              </li>
            </ul>
          </nav>

          <nav
            aria-label={footer.help}
            className="space-y-2 md:col-span-2 md:px-3"
          >
            <h2 className="sr-only">{footer.help}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="footer-link">
                  {footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link">
                  {footer.faq}
                </Link>
              </li>
              <li>
                <a href="tel:+33123456789" className="footer-link">
                  {footer.phone_label}: +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="footer-link">
                  {footer.email_label}: contact@example.com
                </a>
              </li>
            </ul>
          </nav>

          <nav
            aria-label={footer.legal}
            className="space-y-2 md:col-span-2 md:px-3"
          >
            <h2 className="sr-only">{footer.legal}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cgu" className="footer-link">
                  {footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="footer-link">
                  {footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="footer-link">
                  {footer.legal_notice}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="footer-link">
                  {footer.cookies}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-3 text-sm md:col-span-6 md:px-3">
            <p>{footer.tagline}</p>
            <form
              action="/newsletter"
              method="POST"
              className="flex items-center gap-2"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {footer.newsletter}
              </label>
              <div className="input-pill w-full max-w-[320px]">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder={footer.newsletter_placeholder}
                  className="h-8 w-full border-0 bg-transparent p-0 placeholder:text-white/60 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none caret-[color:var(--brand)]"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                className="shrink-0 rounded-full"
              >
                {footer.newsletter_cta}
              </Button>
            </form>
            <p className="text-xs text-white/60">{footer.newsletter_privacy}</p>
            <ul
              aria-label={footer.follow_us}
              className="flex items-center gap-3 pt-1"
            >
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="hover:text-brand transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="hover:text-brand transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Pinterest"
                  className="hover:text-brand transition-colors"
                >
                  <FontAwesomeIcon icon={faPinterest} className="h-5 w-5" />
                </a>
              </li>
            </ul>
            <ul className="flex flex-wrap items-center gap-3 text-xs text-white/70">
              <li>{footer.adults_only}</li>
              <li>•</li>
              <li>{footer.secure_payment}</li>
              <li>•</li>
              <li>{footer.discreet_shipping}</li>
              <li>•</li>
              <li>{footer.returns}</li>
            </ul>
            <div
              aria-label={footer.payments}
              className="flex items-center gap-3 pt-1 opacity-90"
            >
              <span className="icon-btn" aria-hidden>
                <FontAwesomeIcon icon={faCcVisa} className="h-6 w-6" />
              </span>
              <span className="icon-btn" aria-hidden>
                <FontAwesomeIcon icon={faCcMastercard} className="h-6 w-6" />
              </span>
              <span className="icon-btn" aria-hidden>
                <FontAwesomeIcon icon={faCcAmex} className="h-6 w-6" />
              </span>
              <span className="icon-btn" aria-hidden>
                <FontAwesomeIcon icon={faCcPaypal} className="h-6 w-6" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-white/70 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 md:px-6">
          <p>&copy; {year} Boys & Toys By OL</p>
        </div>
      </div>
    </footer>
  );
}
