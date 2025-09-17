import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer, { type FooterLabels } from "./Footer";
import Providers from "@/app/providers";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}

const footerLabels: FooterLabels = {
  sections: "Sections",
  help: "Aide",
  legal: "Mentions légales",
  contact: "Contact",
  about: "À propos",
  faq: "FAQ",
  phone_label: "Tél",
  email_label: "Email",
  terms: "Conditions d’utilisation",
  privacy: "Politique de confidentialité",
  tagline: "Boys & Toys — Sélection premium, service attentionné.",
  shop: "Boutique",
  newsletter: "Inscription newsletter",
  newsletter_placeholder: "Votre email",
  newsletter_cta: "S’inscrire",
  newsletter_privacy:
    "Désabonnement en un clic. Nous respectons votre vie privée.",
  follow_us: "Suivez-nous",
  adults_only: "Usage réservé aux adultes (18+)",
  secure_payment: "Paiement sécurisé",
  discreet_shipping: "Expédition discrète",
  returns: "Retours 30 jours",
  payments: "Moyens de paiement",
  legal_notice: "Mentions légales",
  cookies: "Préférences cookies",
};

const navLabels = {
  new: "Nouveautés",
  best: "Best-sellers",
  categories: "Catégories",
  lingerie: "Lingerie",
  accessories: "Accessoires",
  gifts: "Idées cadeaux",
  promotions: "Promotions",
};

describe("Footer", () => {
  it("rend les sections et tous les liens Boutique alignés avec la nav", () => {
    render(<Footer footer={footerLabels} nav={navLabels} />, {
      wrapper: Wrapper,
    });
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    const links = [
      /Nouveautés/i,
      /Best-sellers/i,
      /Catégories/i,
      /Lingerie/i,
      /Accessoires/i,
      /Idées cadeaux/i,
      /Promotions/i,
    ];
    links.forEach((re) => {
      expect(screen.getAllByRole("link", { name: re }).length).toBeGreaterThan(
        0
      );
    });
  });

  it("affiche le formulaire newsletter harmonisé (placeholder, required, CTA)", () => {
    render(<Footer footer={footerLabels} nav={navLabels} />, {
      wrapper: Wrapper,
    });
    const input = screen.getAllByPlaceholderText(
      /Votre email/i
    )[0] as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
    const cta = screen.getAllByRole("button", { name: /S’inscrire/i })[0];
    expect(cta).toBeInTheDocument();
  });

  it("expose des liens sociaux sécurisés (target=_blank + rel)", () => {
    render(<Footer footer={footerLabels} nav={navLabels} />, {
      wrapper: Wrapper,
    });
    const insta = screen.getAllByLabelText(
      /Instagram/i
    )[0] as HTMLAnchorElement;
    const fb = screen.getAllByLabelText(/Facebook/i)[0] as HTMLAnchorElement;
    const pin = screen.getAllByLabelText(/Pinterest/i)[0] as HTMLAnchorElement;
    [insta, fb, pin].forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel") || "").toMatch(/noopener/);
      expect(a.getAttribute("rel") || "").toMatch(/noreferrer/);
    });
  });

  it("affiche les badges d’information (18+, paiement, expédition, retours)", () => {
    render(<Footer footer={footerLabels} nav={navLabels} />, {
      wrapper: Wrapper,
    });
    expect(screen.getAllByText(/18\+/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Paiement sécuris|Paiement sécurisé/i).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/Expédition discrète/i).length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText(/Retours 30 jours/i).length).toBeGreaterThan(0);
  });

  it("affiche les icônes de paiement (au moins 4)", () => {
    render(<Footer footer={footerLabels} nav={navLabels} />, {
      wrapper: Wrapper,
    });
    const payments = screen.getAllByLabelText(
      /Moyens de paiement/i
    )[0] as HTMLElement;
    const svgs = payments.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(4);
  });
});
