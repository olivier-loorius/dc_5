"use client";
import { TopBar } from "./TopBar";
import { SubNav, type SubNavItem } from "./SubNav";
import { useTranslations } from "next-intl";

export default function Navbar({ subNav }: { subNav?: SubNavItem[] }) {
  const t = useTranslations("nav");
  const items: SubNavItem[] = subNav ?? [
    { label: t("new") as string, href: "/nouveautes" },
    { label: t("best") as string, href: "/best-sellers" },
    { label: t("categories_menu") as string, href: "/categories" },
    { label: t("lingerie") as string, href: "/lingerie" },
    { label: t("accessories") as string, href: "/accessoires" },
    { label: t("gifts") as string, href: "/idees-cadeaux" },
    { label: t("promotions") as string, href: "/promotions" },
  ];
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 transition-shadow duration-300 data-[scrolled=true]:shadow-lg/5"
      id="app-header"
    >
      <TopBar
        logo={{ src: "/Logo.png", alt: "Logo", width: 128, height: 128 }}
      />
      <SubNav items={items} />
    </header>
  );
}
