import Navbar from "./navbar/Navbar";
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <ScrollShadowScript />
      {children}
    </>
  );
}

function ScrollShadowScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(() => { const h=document.getElementById('app-header'); if(!h) return; const onScroll=() => { h.dataset.scrolled = String(window.scrollY>8) }; onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); })();`,
      }}
    />
  );
}
