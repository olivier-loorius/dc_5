import Prose from "./Prose";

export default function LegalLayout({
  title,
  subtitle,
  toc,
  children,
}: {
  title: string;
  subtitle?: string;
  toc: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[oklch(var(--text-1))]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-[oklch(var(--text-3))]">{subtitle}</p>
        ) : null}
      </header>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        <aside className="md:col-span-2 lg:col-span-1 md:sticky md:top-[calc(var(--app-header-height)+1rem)] self-start">
          {toc}
        </aside>
        <article className="md:col-span-3 lg:col-span-4">
          <Prose>{children}</Prose>
        </article>
      </div>
    </section>
  );
}
