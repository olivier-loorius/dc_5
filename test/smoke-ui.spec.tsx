import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Providers from "@/app/providers";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const footerLabels = {
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
  newsletter_success:
    "Merci, veuillez confirmer votre inscription via l’email reçu.",
  marketing_opt_in: "J’accepte de recevoir des emails marketing.",
  follow_us: "Suivez-nous",
  adults_only: "Usage réservé aux adultes (18+)",
  secure_payment: "Paiement sécurisé",
  discreet_shipping: "Expédition discrète",
  returns: "Retours 30 jours",
  payments: "Moyens de paiement",
  legal_notice: "Mentions légales",
  cookies: "Préférences cookies",
  settings: "Paramètres",
  close: "Fermer",
  language: "Langue",
  theme: "Thème",
  dark: "Sombre",
  light: "Clair",
  cookies_manage: "Gérer les préférences cookies",
  scroll_top: "Remonter en haut",
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

const navMenu = {
  new: "Nouveautés",
  best: "Best-sellers",
  categories_menu: "Catégories",
  lingerie: "Lingerie",
  accessories: "Accessoires",
  gifts: "Idées cadeaux",
  promotions: "Promotions",
};

const navUi = {
  search: "Rechercher",
  favorites: "Favoris",
  cart: "Panier",
  account: "Compte",
  cancel: "Annuler",
  menu: "Menu",
};

describe("Smoke UI (Navbar + Footer)", () => {
  it("rend Navbar et Footer sans crash et expose des éléments clés", () => {
    render(
      <Providers>
        <Navbar menu={navMenu} ui={navUi} />
        <Footer footer={footerLabels as any} nav={navLabels as any} />
      </Providers>
    );

    // Navbar: recherche et menu burger
    expect(screen.getAllByLabelText(/Rechercher/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/Menu/i).length).toBeGreaterThan(0);

    // Footer: rôle contentinfo et quelques liens essentiels
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    [
      /Nouveautés/i,
      /Best-sellers/i,
      /Catégories/i,
      /Lingerie/i,
      /Accessoires/i,
      /Idées cadeaux/i,
      /Promotions/i,
    ].forEach((re) => {
      expect(screen.getAllByRole("link", { name: re }).length).toBeGreaterThan(
        0
      );
    });

    // Footer: formulaire newsletter (placeholder + CTA)
    expect(
      screen.getAllByPlaceholderText(/Votre email/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", { name: /S’inscrire/i }).length
    ).toBeGreaterThan(0);
  });
});
