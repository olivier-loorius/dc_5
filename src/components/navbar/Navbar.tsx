"use client";
import { TopBar } from "./TopBar";
import { SubNav, type SubNavItem } from "./SubNav";

export type NavbarMenuLabels = {
  new: string;
  best: string;
  categories_menu: string;
  lingerie: string;
  accessories: string;
  gifts: string;
  promotions: string;
};

export type NavbarUiLabels = {
  search: string;
  favorites: string;
  cart: string;
  account: string;
  cancel: string;
  menu: string;
};

const DEFAULT_MENU: NavbarMenuLabels = {
  new: "Nouveautés",
  best: "Best-sellers",
  categories_menu: "Catégories",
  lingerie: "Lingerie",
  accessories: "Accessoires",
  gifts: "Idées cadeaux",
  promotions: "Promotions",
};

const DEFAULT_UI: NavbarUiLabels = {
  search: "Rechercher",
  favorites: "Favoris",
  cart: "Panier",
  account: "Compte",
  cancel: "Annuler",
  menu: "Menu",
};

export default function Navbar({
  menu = DEFAULT_MENU,
  ui = DEFAULT_UI,
  subNav,
}: {
  menu?: NavbarMenuLabels;
  ui?: NavbarUiLabels;
  subNav?: SubNavItem[];
}) {
  const items: SubNavItem[] = subNav ?? [
    { label: menu.new, href: "/nouveautes" },
    { label: menu.best, href: "/best-sellers" },
    { label: menu.categories_menu, href: "/categories" },
    { label: menu.lingerie, href: "/lingerie" },
    { label: menu.accessories, href: "/accessoires" },
    { label: menu.gifts, href: "/idees-cadeaux" },
    { label: menu.promotions, href: "/promotions" },
  ];
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 transition-shadow duration-300 data-[scrolled=true]:shadow-lg/5"
      id="app-header"
    >
      <TopBar
        ui={ui}
        logo={{ src: "/Logo.png", alt: "Logo", width: 128, height: 128 }}
      />
      <SubNav items={items} />
    </header>
  );
}
