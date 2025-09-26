import Navbar from "@/components/navbar/Navbar";
import ScrollShadow from "@/components/navbar/ScrollShadow";
import Footer from "@/components/footer/Footer";
import TopOcclude from "@/components/navbar/TopOcclude";
import { getTranslations } from "next-intl/server";
import QuickActions from "@/components/QuickActions";
import { ToasterClient } from "@/components/ui/ToasterClient";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tFooter = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  const menu = {
    new: tNav("new"),
    best: tNav("best"),
    categories_menu: tNav("categories_menu"),
    lingerie: tNav("lingerie"),
    accessories: tNav("accessories"),
    gifts: tNav("gifts"),
    promotions: tNav("promotions"),
  };

  const ui = {
    search: tNav("search"),
    favorites: tNav("favorites"),
    cart: tNav("cart"),
    account: tNav("account"),
    cancel: tNav("cancel"),
    menu: "Menu",
    login: "Se connecter",
    logout: "Se déconnecter",
    profile: "Profil",
    orders: "Commandes",
    settings: "Paramètres",
    privacy: "Confidentialité",
  } as const;

  return (
    <>
      <Navbar menu={menu} ui={ui} />
      <ScrollShadow />
      <TopOcclude />
      {children}
      <Footer
        footer={{
          sections: tFooter("sections"),
          help: tFooter("help"),
          legal: tFooter("legal"),
          contact: tFooter("contact"),
          about: tFooter("about"),
          faq: tFooter("faq"),
          phone_label: tFooter("phone_label"),
          email_label: tFooter("email_label"),
          terms: tFooter("terms"),
          privacy: tFooter("privacy"),
          tagline: tFooter("tagline"),
          shop: tFooter("shop"),
          newsletter: tFooter("newsletter"),
          newsletter_placeholder: tFooter("newsletter_placeholder"),
          newsletter_cta: tFooter("newsletter_cta"),
          newsletter_privacy: tFooter("newsletter_privacy"),
          follow_us: tFooter("follow_us"),
          adults_only: tFooter("adults_only"),
          secure_payment: tFooter("secure_payment"),
          discreet_shipping: tFooter("discreet_shipping"),
          returns: tFooter("returns"),
          payments: tFooter("payments"),
          legal_notice: tFooter("legal_notice"),
          cookies: tFooter("cookies"),
        }}
        nav={{
          new: tNav("new"),
          best: tNav("best"),
          categories: tNav("categories"),
          lingerie: tNav("lingerie"),
          accessories: tNav("accessories"),
          gifts: tNav("gifts"),
          promotions: tNav("promotions"),
        }}
      />
      <QuickActions />
      <ToasterClient />
    </>
  );
}
