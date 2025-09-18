export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-none leading-relaxed text-[oklch(var(--text-2))]
                 [&_h1]:mt-0 [&_h1]:mb-5 [&_h1]:text-[oklch(var(--text-1))]
                 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:text-[oklch(var(--text-1))] [&_h2]:underline [&_h2]:decoration-[#e19a28]/60 [&_h2]:underline-offset-4 [&_h2]:text-[1.125rem] md:[&_h2]:text-[1.25rem]
                 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[oklch(var(--text-1))]
                 [&_p]:my-5 [&_ul]:my-5 [&_ol]:my-5 [&_li]:my-1.5
                 [&_a]:text-[oklch(var(--brand))] hover:[&_a]:opacity-90 underline-offset-4
                 [&_strong]:text-[oklch(var(--text-1))]"
    >
      {children}
    </div>
  );
}
