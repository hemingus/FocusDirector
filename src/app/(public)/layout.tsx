import Navbar from "@/components/Navbar/Navbar"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer>© 2026 Focus Director</footer>
    </>
  );
}