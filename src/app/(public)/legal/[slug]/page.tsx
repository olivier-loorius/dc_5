import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import Mentions from "@/content/legal/fr/mentions-legales.mdx";
import Conditions from "@/content/legal/fr/conditions-utilisation.mdx";
import Confidentialite from "@/content/legal/fr/confidentialite.mdx";
import Faq from "@/content/legal/fr/faq.mdx";

// Désactive le cache pour voir immédiatement les modifications de contenu en dev
export const revalidate = 0;
export const dynamic = "force-dynamic";

const map: Record<string, React.ComponentType> = {
  "mentions-legales": Mentions,
  "conditions-utilisation": Conditions,
  confidentialite: Confidentialite,
  faq: Faq,
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const MDX = map[slug];
  if (!MDX) return notFound();
  const t = await getTranslations("legal");
  return (
    <div>
      <h2 className="sr-only">
        {t("page")}: {slug}
      </h2>
      <MDX />
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(map).map((slug) => ({ slug }));
}
