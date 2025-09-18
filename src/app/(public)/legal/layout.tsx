import { getTranslations } from "next-intl/server";
import LegalLayout from "@/components/legal/LegalLayout";
import LegalToc from "@/components/legal/LegalToc";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("legal");
  const items = [
    { slug: "mentions-legales", label: t("mentions") },
    { slug: "conditions-utilisation", label: t("terms") },
    { slug: "confidentialite", label: t("privacy") },
    { slug: "faq", label: t("faq") },
  ];
  return (
    <LegalLayout
      title={t("title")}
      subtitle={t("subtitle")}
      toc={<LegalToc items={items} basePath="/legal" />}
    >
      {children}
    </LegalLayout>
  );
}
