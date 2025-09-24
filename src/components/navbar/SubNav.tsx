"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export type SubNavItem = { label: string; href: string };

export function SubNav({ items = [] }: { items?: SubNavItem[] }) {
  const pathname = usePathname();
  if (!items.length) return null;
  return (
    <div className="border-t border-white/10 hidden md:block">
      <div className="container mx-auto px-2 md:px-4 py-2">
        <NavigationMenu className="justify-center" viewport={false}>
          <NavigationMenuList className="gap-4 md:gap-6 justify-center max-w-5xl mx-auto overflow-x-auto no-scrollbar snap-x">
            {items.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`px-3 py-2 md:py-3 text-sm rounded-md relative transition-colors duration-200 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-1 after:h-px after:bg-[color:var(--brand)] after:transition-[width] after:duration-300 hover:text-brand hover:after:w-3/4 snap-center ${
                      pathname === item.href
                        ? "text-brand after:w-3/4"
                        : "after:w-0"
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
