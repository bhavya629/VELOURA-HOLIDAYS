import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        const result = await res.json();

        if (!result.success) {
          alert(result.message);
          window.location.href = "/login";
          return;
        }

        setData(result);
      } catch {
    console.error("Admin dashboard failed to load");
alert("Admin dashboard failed to load");
window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    loadAdmin();
  }, []);

  if (loading) return <div style={styles.loading}>Loading Admin...</div>;
  if (!data || !data.stats) {
  return (
    <div style={styles.loading}>
      Admin data failed to load. Please login again as admin.
    </div>
  );
}

  return (
    <div style={styles.page}>
      <AdminSidebar />
      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>Dashboard</h1>
            <p style={styles.subtitle}>
              Manage Veloura Holidays bookings, users, and revenue.
            </p>
          </div>
          <div style={styles.adminBadge}>ADMIN</div>
        </header>

        <section style={styles.cards}>
          <Card title="Total Users" value={data.stats.totalUsers} />
          <Card title="Total Bookings" value={data.stats.totalBookings} />
          <Card title="Pending Bookings" value={data.stats.pendingBookings} />
          <Card title="Cancelled" value={data.stats.cancelledBookings} />
          <Card title="Total Revenue" value={`Rs. ${data.stats.totalRevenue}`} gold />
        </section>
        <section
  style={{
    display: "flex",
    gap: "15px",
    marginTop: "25px",
    flexWrap: "wrap",
  }}
>
  <Link href="/admin/bookings" style={styles.actionBtn}>
    Manage Bookings
  </Link>

  <Link href="/admin/users" style={styles.actionBtn}>
    Manage Users
  </Link>

  <Link href="/admin/packages" style={styles.actionBtn}>
    Manage Packages
  </Link>

  <Link href="/admin/hotels" style={styles.actionBtn}>
    Manage Hotels
  </Link>

  <Link href="/admin/destinations" style={styles.actionBtn}>
    Manage Destinations
  </Link>
</section>

        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>Recent Bookings</h2>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Booking</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td style={styles.td}>{booking.user?.name}</td>
                    <td style={styles.td}>{booking.user?.email}</td>
                    <td style={styles.td}>{booking.user?.phone}</td>
                    <td style={styles.td}>{booking.packageName}</td>
                    <td style={styles.td}>Rs. {booking.amount}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          booking.status === "Cancelled"
                            ? styles.cancelled
                            : styles.status
                        }
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>Users</h2>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Role</th>
                </tr>
              </thead>

              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.phone}</td>
                    <td style={styles.td}>
                      <span
                        style={
                          user.role === "ADMIN"
                            ? styles.adminRole
                            : styles.userRole
                        }
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ title, value, gold }) {
  return (
    <div style={gold ? { ...styles.card, ...styles.goldCard } : styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  );
}

const styles = {
  loading: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0b1f3a",
    color: "#d4af37",
    fontSize: "30px",
    fontWeight: "800",
  },
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "270px 1fr",
    background: "#eef2f7",
    fontFamily: "Arial, sans-serif",
  },
 
 main: {
  padding: "40px",
  overflowX: "hidden",
}, topbar: {
    background: "#fff",
    borderRadius: "24px",
    padding: "28px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
  heading: {
    margin: 0,
    fontSize: "42px",
    fontWeight: "900",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#475569",
  },
  adminBadge: {
    background: "#0b1f3a",
    color: "#d4af37",
    padding: "14px 24px",
    borderRadius: "999px",
    fontWeight: "900",
    fontSize: "18px",
  },
 cards: {
  marginTop: "28px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "22px",
},
  card: {
    background: "#fff",
    padding: "28px",
    borderRadius: "22px",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
    borderTop: "5px solid #d4af37",
    minHeight: "135px",
  },
  goldCard: {
    background: "linear-gradient(135deg, #d4af37, #ffe082)",
  },
  cardTitle: {
    margin: 0,
    fontSize: "18px",
    color: "#475569",
    fontWeight: "700",
  },
  cardValue: {
    margin: "14px 0 0",
    fontSize: "32px",
    color: "#0f172a",
    fontWeight: "900",
  },
  panel: {
    marginTop: "32px",
    background: "#fff",
    padding: "34px",
    borderRadius: "24px",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
  panelTitle: {
    marginTop: 0,
    marginBottom: "24px",
    fontSize: "30px",
    color: "#0f172a",
    fontWeight: "900",
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },
  th: {
    textAlign: "left",
    padding: "18px 16px",
    fontSize: "17px",
    color: "#0b1f3a",
    background: "#f8fafc",
    borderBottom: "2px solid #e5e7eb",
  },
  td: {
    padding: "18px 16px",
    fontSize: "16px",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle",
  },
  status: {
    background: "#fff7d6",
    color: "#7a5c00",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "800",
    display: "inline-block",
  },
  cancelled: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "800",
    display: "inline-block",
  },
  adminRole: {
    background: "#dbeafe",
    color: "#1e40af",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "800",
  },
  userRole: {
    background: "#dcfce7",
    color: "#166534",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "800",
  },
  actionBtn: {
  background: "#0b1f3a",
  color: "#d4af37",
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: "12px",
  fontWeight: "800",
},
};
