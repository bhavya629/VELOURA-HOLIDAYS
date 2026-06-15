import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminSidebar() {
  const router = useRouter();

  const links = [
    { label: "Dashboard", href: "/admin" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Users", href: "/admin/users" },
    { label: "Packages", href: "/admin/packages" },
    { label: "Hotels", href: "/admin/hotels" },
    { label: "Destinations", href: "/admin/destinations" },
  ];

  return (
    <aside style={styles.sidebar}>
      <div>
        <h1 style={styles.logo}>Veloura</h1>
        <p style={styles.subLogo}>Luxury Admin</p>
      </div>

      <nav style={styles.sideNav}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={
              router.pathname === link.href ? styles.activeLink : styles.sideLink
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link href="/" style={styles.websiteBtn}>
        &larr; Back to Website
      </Link>
    </aside>
  );
}

const styles = {
  sidebar: {
    background: "#0b1f3a",
    color: "#fff",
    padding: "30px 22px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    borderRight: "1px solid rgba(212,175,55,0.25)",
  },
  logo: {
    margin: 0,
    color: "#d4af37",
    fontSize: "34px",
    fontWeight: "900",
  },
  subLogo: {
    fontSize: "16px",
    marginTop: "6px",
    marginBottom: "35px",
    color: "rgba(248,246,240,0.76)",
  },
  sideNav: {
    display: "grid",
    gap: "10px",
  },
  sideLink: {
    padding: "14px 16px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    color: "#f8f6f0",
    cursor: "pointer",
    textDecoration: "none",
  },
  activeLink: {
    padding: "14px 16px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "800",
    color: "#0b1f3a",
    background: "#d4af37",
    cursor: "pointer",
    textDecoration: "none",
  },
  websiteBtn: {
    marginTop: "auto",
    background: "rgba(248,246,240,0.08)",
    color: "#d4af37",
    textDecoration: "none",
    padding: "15px",
    borderRadius: "14px",
    fontWeight: "900",
    fontSize: "16px",
    textAlign: "center",
    border: "1px solid rgba(212,175,55,0.32)",
  },
};
