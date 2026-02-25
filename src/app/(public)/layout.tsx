export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Optional public navbar */}
      <header>
        <h1>Focus Director</h1>
      </header>

      <main>{children}</main>

      <footer>© 2026 Focus Director</footer>
    </div>
  );
}