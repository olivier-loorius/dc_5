import Link from "next/link";

export type LegalNavItem = {
  slug: string;
  label: string;
};

export default function LegalToc({
  items,
  basePath,
}: {
  items: LegalNavItem[];
  basePath: string;
}) {
  return (
    <nav aria-label="Pages légales" className="space-y-1">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`${basePath}/${item.slug}`}
          className="block rounded-md px-3 py-2 text-sm footer-link transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
