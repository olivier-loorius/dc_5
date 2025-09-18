export default function TopOcclude() {
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      style={{
        height: "calc(var(--app-header-height, 64px) + 1px)",
        backgroundColor: "var(--bg-top)",
        backgroundImage: "var(--app-background)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center top",
      }}
    />
  );
}
