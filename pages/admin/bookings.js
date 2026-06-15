import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
      } else {
        alert(data.message);
        window.location.href = "/login";
      }
    } catch (error) {
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, status) => {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, status }),
    });

    const data = await res.json();

    if (data.success) {
      fetchBookings();
    } else {
      alert(data.message);
    }
  };

  const deleteBooking = async (bookingId) => {
    const confirmDelete = confirm("Delete this booking permanently?");
    if (!confirmDelete) return;

    const res = await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId }),
    });

    const data = await res.json();

    if (data.success) {
      fetchBookings();
    } else {
      alert(data.message);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      booking.user?.name?.toLowerCase().includes(keyword) ||
      booking.user?.email?.toLowerCase().includes(keyword) ||
      booking.packageName?.toLowerCase().includes(keyword);

    const matchesFilter =
      filter === "ALL" ? true : booking.status === filter;

    return matchesSearch && matchesFilter;
  });

  if (loading) return <div style={styles.loading}>Loading bookings...</div>;

  return (
    <div style={styles.page}>
      <AdminSidebar />

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>Bookings Management</h1>
            <p style={styles.subtitle}>
              View, approve, cancel, and delete customer bookings.
            </p>
          </div>

          <Link href="/admin" style={styles.dashboardBtn}>
            Dashboard
          </Link>
        </header>

        <section style={styles.filterBox}>
          <input
            type="text"
            placeholder="Search by customer, email, or booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="ALL">All Bookings</option>
            <option value="Pending">Pending</option>
<option value="Confirmed">Confirmed</option>
<option value="Cancellation Requested">
  Cancellation Requested
</option>
<option value="Cancellation Rejected">
  Cancellation Rejected
</option>
<option value="Cancelled">Cancelled</option>
          </select>

          <div style={styles.countBox}>
            {filteredBookings.length} Results
          </div>
        </section>

        <section style={styles.panel}>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Booking</th>
                  <th style={styles.th}>Travellers</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Travel Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td style={styles.td}>{booking.user?.name}</td>
                    <td style={styles.td}>{booking.user?.email}</td>
                    <td style={styles.td}>{booking.packageName}</td>
                    <td style={styles.td}>{booking.travellers}</td>
                    <td style={styles.td}>Rs. {booking.amount}</td>
                    <td style={styles.td}>
                      {new Date(booking.travelDate).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                     <span
  style={
    booking.status === "Confirmed"
      ? styles.confirmed
      : booking.status === "Cancelled"
      ? styles.cancelled
      : booking.status === "Cancellation Requested"
      ? styles.requested
      : booking.status === "Cancellation Rejected"
      ? styles.rejected
      : styles.pending
  }
>
  {booking.status}
</span>
                    </td>
                    <td style={styles.td}>
                     <div style={styles.actions}>
  {booking.status === "Cancellation Requested" ? (
    <>
      <button
        onClick={() =>
          updateStatus(booking.id, "Cancelled")
        }
        style={styles.approveBtn}
      >
        Approve Cancellation
      </button>

      <button
        onClick={() =>
          updateStatus(
            booking.id,
            "Cancellation Rejected"
          )
        }
        style={styles.cancelBtn}
      >
        Reject Request
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() =>
          updateStatus(booking.id, "Confirmed")
        }
        style={styles.approveBtn}
      >
        Approve
      </button>

      <button
        onClick={() =>
          updateStatus(booking.id, "Cancelled")
        }
        style={styles.cancelBtn}
      >
        Cancel
      </button>
    </>
  )}

  <button
    onClick={() => deleteBooking(booking.id)}
    style={styles.deleteBtn}
  >
    Delete
  </button>
</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <p style={styles.empty}>No bookings found.</p>
            )}
          </div>
        </section>
      </main>
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
    fontSize: "28px",
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
    padding: "32px",
  },
  topbar: {
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
    fontSize: "40px",
    fontWeight: "900",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#475569",
  },
  dashboardBtn: {
    background: "#0b1f3a",
    color: "#d4af37",
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "999px",
    fontWeight: "900",
  },
  filterBox: {
    marginTop: "28px",
    background: "#fff",
    padding: "24px",
    borderRadius: "22px",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
  input: {
    flex: 1,
    padding: "16px",
    fontSize: "17px",
    border: "1px solid #dbe3ef",
    borderRadius: "12px",
  },
  select: {
    padding: "16px",
    fontSize: "17px",
    border: "1px solid #dbe3ef",
    borderRadius: "12px",
  },
  countBox: {
    background: "#d4af37",
    color: "#0b1f3a",
    padding: "16px 20px",
    borderRadius: "12px",
    fontWeight: "900",
  },
  panel: {
    marginTop: "28px",
    background: "#fff",
    padding: "28px",
    borderRadius: "24px",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    minWidth: "1000px",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "18px",
    fontSize: "17px",
    color: "#0b1f3a",
    background: "#f8fafc",
    borderBottom: "2px solid #e5e7eb",
  },
  td: {
    padding: "18px",
    fontSize: "16px",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle",
  },
  actions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  approveBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "9px 13px",
    borderRadius: "9px",
    fontWeight: "800",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#f59e0b",
    color: "#111827",
    border: "none",
    padding: "9px 13px",
    borderRadius: "9px",
    fontWeight: "800",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "9px 13px",
    borderRadius: "9px",
    fontWeight: "800",
    cursor: "pointer",
  },
  pending: {
    background: "#fff7d6",
    color: "#7a5c00",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "800",
    display: "inline-block",
  },
  confirmed: {
    background: "#dcfce7",
    color: "#166534",
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
  empty: {
    textAlign: "center",
    marginTop: "25px",
    fontSize: "18px",
    color: "#64748b",
  },
  confirmed: {
  background: "#dcfce7",
  color: "#166534",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "800",
  display: "inline-block",
},

requested: {
  background: "#fed7aa",
  color: "#9a3412",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "800",
  display: "inline-block",
},

rejected: {
  background: "#fecaca",
  color: "#991b1b",
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
};
