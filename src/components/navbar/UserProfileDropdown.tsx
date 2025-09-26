"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faGear,
  faCreditCard,
  faSignOutAlt,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserProfileDropdownProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  } | null;
  isConnected: boolean;
  tKey: {
    account: string;
    login: string;
    logout: string;
    profile: string;
    orders: string;
    favorites: string;
    settings: string;
    privacy: string;
  };
  onLogout?: () => void;
}

export function UserProfileDropdown({
  user,
  isConnected,
  tKey,
  onLogout,
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Si non connecté - bouton de connexion simple
  if (!isConnected) {
    return (
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="text-[color:var(--brand)] hover:bg-brand/10"
      >
        <Link href="/login">
          <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4" />
          {tKey.login}
        </Link>
      </Button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar/Bouton utilisateur */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={tKey.account}
        className={cn(
          "relative transition-all duration-200",
          isOpen
            ? "bg-brand/20 text-brand ring-2 ring-brand/30"
            : "hover:bg-brand/10 text-[color:var(--brand)]",
          // Bordure et fond uniquement si connecté
          isConnected && "ring-2 ring-emerald-400/50 bg-emerald-50/10"
        )}
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || tKey.profile}
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
        )}

        {/* Indicateur de statut connecté - Seulement si connecté */}
        {isConnected && (
          <span className="absolute -top-0.5 -right-0.5 flex">
            <span className="h-3 w-3 rounded-full bg-emerald-400 border-2 border-background shadow-sm" />
            <span className="absolute h-3 w-3 rounded-full bg-emerald-400/75 animate-ping" />
          </span>
        )}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
          {/* En-tête utilisateur */}
          <div className="px-4 py-3 bg-gradient-to-r from-brand/10 to-brand/5 border-b border-white/5">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-brand/20 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="h-5 w-5 text-brand"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || "Utilisateur"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/compte"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="text-brand h-4 w-4" />
              <span>{tKey.profile}</span>
            </Link>

            <Link
              href="/favoris"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faHeart} className="text-brand h-4 w-4" />
              <span>{tKey.favorites}</span>
            </Link>

            <Link
              href="/compte/commandes"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-brand h-4 w-4"
              />
              <span>{tKey.orders}</span>
            </Link>

            <div className="border-t border-white/5 my-1" />

            <Link
              href="/compte/parametres"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon
                icon={faGear}
                className="text-muted-foreground h-4 w-4"
              />
              <span>{tKey.settings}</span>
            </Link>

            <Link
              href="/compte/confidentialite"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-muted-foreground h-4 w-4"
              />
              <span>{tKey.privacy}</span>
            </Link>

            <div className="border-t border-white/5 my-1" />

            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-red-500/10 hover:text-red-400 transition-colors text-left"
              onClick={() => {
                setIsOpen(false);
                onLogout?.();
              }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-red-400 h-4 w-4"
              />
              <span>{tKey.logout}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
