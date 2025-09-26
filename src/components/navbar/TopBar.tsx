"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faUser,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { UserAuth } from "./UserAuth";

type LogoProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  text?: string;
};

export function TopBar({
  logo = { text: "MonLogo" },
  ui,
}: {
  logo?: LogoProps;
  ui: {
    search: string;
    favorites: string;
    cart: string;
    account: string;
    cancel?: string;
    menu: string;
    login?: string;
    logout?: string;
    profile?: string;
    orders?: string;
    settings?: string;
    privacy?: string;
  };
}) {
  return (
    <div className="container mx-auto flex h-20 sm:h-24 md:h-28 xl:h-32 items-center justify-between px-4">
      <Logo logo={logo} />
      <RightZone
        tKey={{
          search: ui.search,
          favorites: ui.favorites,
          cart: ui.cart,
          account: ui.account,
          cancel: ui.cancel ?? "Annuler",
          menu: ui.menu,
          login: ui.login || "Se connecter",
          logout: ui.logout || "Se déconnecter",
          profile: ui.profile || "Profil",
          orders: ui.orders || "Commandes",
          settings: ui.settings || "Paramètres",
          privacy: ui.privacy || "Confidentialité",
        }}
      />
    </div>
  );
}

function Logo({ logo }: { logo: LogoProps }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 shrink-0"
      aria-label="Aller à l’accueil"
    >
      {logo.src ? (
        <Image
          src={logo.src}
          alt={logo.alt ?? "Logo"}
          width={logo.width ?? 96}
          height={logo.height ?? 96}
          className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 xl:h-32 xl:w-32 object-contain"
        />
      ) : (
        <span className="text-lg font-bold tracking-tight font-display text-brand">
          {logo.text ?? "Logo"}
        </span>
      )}
    </Link>
  );
}

function RightZone({
  tKey,
}: {
  tKey: {
    search: string;
    favorites: string;
    cart: string;
    account: string;
    cancel?: string;
    menu: string;
    login: string;
    logout: string;
    profile: string;
    orders: string;
    settings: string;
    privacy: string;
  };
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState<number>(0);
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <SearchBar placeholder={tKey.search} className="hidden md:flex" />

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={tKey.search}
          onClick={() => setIsSearchOpen(true)}
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="h-8 w-8 sm:h-7 sm:w-7 md:h-6 md:w-6 text-[color:var(--brand)]"
          />
        </Button>

        <Button asChild variant="ghost" size="icon" aria-label={tKey.favorites}>
          <Link href="/favoris">
            <FontAwesomeIcon
              icon={faHeart}
              className="h-8 w-8 sm:h-7 sm:w-7 md:h-6 md:w-6 text-[color:var(--brand)]"
            />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" aria-label={tKey.cart}>
          <Link href="/panier" className="relative">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="h-8 w-8 sm:h-7 sm:w-7 md:h-6 md:w-6 text-[color:var(--brand)]"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1.5 rounded-full bg-brand text-black text-[10px] leading-[18px] text-center border border-black/20">
                {cartCount}
              </span>
            )}
          </Link>
        </Button>
        <UserAuth
          tKey={{
            account: tKey.account,
            login: tKey.login,
            logout: tKey.logout,
            profile: tKey.profile,
            orders: tKey.orders,
            favorites: tKey.favorites,
            settings: tKey.settings,
            privacy: tKey.privacy,
          }}
        />

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={tKey.menu}
          onClick={() => setIsMenuOpen(true)}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="h-8 w-8 sm:h-7 sm:w-7 md:h-6 md:w-6 text-[color:var(--brand)]"
          />
        </Button>
      </div>

      {isSearchOpen && (
        <MobileSearchOverlay
          placeholder={tKey.search}
          cancelLabel={tKey.cancel ?? "Annuler"}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
      {isMenuOpen && <MobileMenuOverlay onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}

function SearchBar({
  placeholder,
  className = "",
}: {
  placeholder: string;
  className?: string;
}) {
  const [q, setQ] = useState("");
  return (
    <form
      action="/search"
      method="GET"
      className={`items-center gap-2 ${className}`}
    >
      <div className="flex h-10 items-center rounded-full border border-white/10 px-3 transition ring-brand focus-within:ring-1 focus-within:border-transparent">
        <FontAwesomeIcon
          icon={faSearch}
          className="mr-2 h-4 w-4 text-[color:var(--brand)]"
        />
        <input
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="h-8 w-[220px] border-0 bg-transparent p-0 md:w-[280px] placeholder:text-white/60 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none caret-[color:var(--brand)]"
        />
      </div>
    </form>
  );
}

function MobileSearchOverlay({
  placeholder,
  cancelLabel,
  onClose,
}: {
  placeholder: string;
  cancelLabel: string;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto max-w-screen-sm px-4 pt-6">
        <form action="/search" method="GET" className="flex items-center gap-2">
          <div className="flex h-12 flex-1 items-center rounded-full border border-white/15 bg-black/30 px-4 ring-brand focus-within:ring-1">
            <FontAwesomeIcon
              icon={faSearch}
              className="mr-3 h-4 w-4 text-[color:var(--brand)]"
            />
            <input
              type="search"
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              autoFocus
              ref={inputRef}
              inputMode="search"
              enterKeyHint="search"
              autoCapitalize="none"
              autoCorrect="off"
              className="h-10 w-full border-0 bg-transparent p-0 placeholder:text-white/70 outline-none"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            className="ml-1"
            onClick={onClose}
          >
            {cancelLabel}
          </Button>
        </form>
      </div>
      <button
        aria-label="Close"
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
}

function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <nav
        className="fixed right-0 top-0 h-[100dvh] w-[90%] max-w-sm bg-background/80 backdrop-blur-md border-l border-white/10 shadow-2xl p-6 pr-4 overflow-y-auto no-scrollbar pt-[calc(env(safe-area-inset-top)+16px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-display text-xl text-brand">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Fermer"
            onClick={onClose}
          >
            <span className="text-3xl leading-none">×</span>
          </Button>
        </div>
        <ul className="space-y-1 text-base">
          <li>
            <Link
              href="/"
              onClick={onClose}
              className="block px-3 py-3 rounded-md relative transition-colors duration-200 hover:text-brand after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:w-0 after:bg-[color:var(--brand)] after:transition-[width] after:duration-300 hover:after:w-[calc(100%-24px)]"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/nouveautes"
              onClick={onClose}
              className="block px-3 py-3 rounded-md relative transition-colors duration-200 hover:text-brand after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:w-0 after:bg-[color:var(--brand)] after:transition-[width] after:duration-300 hover:after:w-[calc(100%-24px)]"
            >
              Nouveautés
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
