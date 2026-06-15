import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "../../components/AdminSidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        window.location.href = "/login";
        return;
      }

      setUsers(data.users);
    } catch {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingUser),
    });

    const data = await res.json();

    if (data.success) {
      setEditingUser(null);
      loadUsers();
    } else {
      alert(data.message);
    }
  };

  const deleteUser = async (user) => {
    if (!confirm(`Delete ${user.name}?`)) {
      return;
    }

    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    });

    const data = await res.json();

    if (data.success) {
      loadUsers();
    } else {
      alert(data.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword) ||
      user.phone.toLowerCase().includes(keyword) ||
      user.role.toLowerCase().includes(keyword)
    );
  });

  if (loading) {
    return <div style={styles.loading}>Loading Users...</div>;
  }

  return (
    <div style={styles.page}>
      <AdminSidebar />

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>Users</h1>
            <p style={styles.subtitle}>
              View customers, update roles, and remove accounts when required.
            </p>
          </div>

          <Link href="/admin" style={styles.dashboardBtn}>
            Dashboard
          </Link>
        </header>

        {editingUser && (
          <section style={styles.panel}>
            <h2 style={styles.panelTitle}>Edit User</h2>
            <form onSubmit={updateUser} style={styles.form}>
              <input
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                style={styles.input}
              />
              <input
                value={editingUser.phone}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, phone: e.target.value })
                }
                style={styles.input}
              />
              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
                style={styles.input}
              >
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button type="submit" style={styles.saveBtn}>
                Update User
              </button>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                style={styles.clearBtn}
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        <section style={styles.panel}>
          <div style={styles.filterBox}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              style={styles.input}
            />
            <div style={styles.countBox}>{filteredUsers.length} Users</div>
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
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
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button
                          onClick={() => setEditingUser(user)}
                          style={styles.editBtn}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user)}
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
    overflowX: "hidden",
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
  panel: {
    marginTop: "28px",
    background: "#fff",
    padding: "28px",
    borderRadius: "24px",
    boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
  },
  panelTitle: {
    marginTop: 0,
    marginBottom: "22px",
    fontSize: "28px",
    color: "#0f172a",
    fontWeight: "900",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "14px",
  },
  filterBox: {
    display: "flex",
    gap: "16px",
    marginBottom: "22px",
  },
  input: {
    flex: 1,
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #dbe3ef",
    borderRadius: "12px",
  },
  countBox: {
    background: "#d4af37",
    color: "#0b1f3a",
    padding: "14px 18px",
    borderRadius: "12px",
    fontWeight: "900",
  },
  saveBtn: {
    background: "#d4af37",
    color: "#0b1f3a",
    border: "none",
    padding: "14px 18px",
    borderRadius: "12px",
    fontWeight: "900",
    cursor: "pointer",
  },
  clearBtn: {
    background: "#0b1f3a",
    color: "#fff",
    border: "none",
    padding: "14px 18px",
    borderRadius: "12px",
    fontWeight: "900",
    cursor: "pointer",
  },
  tableWrap: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    minWidth: "900px",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "16px",
    fontSize: "16px",
    color: "#0b1f3a",
    background: "#f8fafc",
    borderBottom: "2px solid #e5e7eb",
  },
  td: {
    padding: "16px",
    fontSize: "15px",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    background: "#0b1f3a",
    color: "#d4af37",
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
};
