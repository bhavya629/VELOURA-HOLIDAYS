import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";

export default function AdminCatalogPage({
  title,
  subtitle,
  type,
  fields,
  emptyItem,
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyItem);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const res = await fetch(`/api/admin/catalog?type=${type}`);
      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        window.location.href = "/login";
        return;
      }

      setItems(data.items);
    } catch {
      alert("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleImageUpload = async (file) => {
    if (!file) {
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();

    if (data.success) {
      handleChange("image", data.imagePath);
    } else {
      alert(data.message || "Image upload failed");
    }
  };

  const resetForm = () => {
    setForm(emptyItem);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/catalog?type=${type}`, {
      method: editingId ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
    });

    const data = await res.json();

    if (data.success) {
      resetForm();
      loadItems();
    } else {
      alert(data.message);
    }
  };

  const editItem = (item) => {
    setEditingId(item.id);
    setForm(
      fields.reduce((next, field) => {
        next[field.name] = item[field.name] ?? "";
        return next;
      }, {})
    );
  };

  const deleteItem = async (item) => {
    if (!confirm(`Delete ${item.name}?`)) {
      return;
    }

    const res = await fetch(`/api/admin/catalog?type=${type}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.id }),
    });

    const data = await res.json();

    if (data.success) {
      loadItems();
    } else {
      alert(data.message);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading {title}...</div>;
  }

  return (
    <div style={styles.page}>
      <AdminSidebar />

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <h1 style={styles.heading}>{title}</h1>
            <p style={styles.subtitle}>{subtitle}</p>
          </div>

          <Link href="/admin" style={styles.dashboardBtn}>
            Dashboard
          </Link>
        </header>

        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>
            {editingId ? `Edit ${title}` : `Add ${title}`}
          </h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            {fields.map((field) => (
              <label key={field.name} style={styles.label}>
                {field.label}
                {field.name === "image" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                      style={styles.input}
                      required={field.required && !form[field.name]}
                    />
                    <input
                      type="text"
                      value={form[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      style={styles.input}
                      placeholder="/uploads/image-name.jpg"
                      required={field.required}
                    />
                  </>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={form[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    style={styles.textarea}
                    required={field.required}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={form[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    style={styles.input}
                    required={field.required}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    value={form[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    style={styles.input}
                    required={field.required}
                  />
                )}
              </label>
            ))}

            <div style={styles.formActions}>
              <button type="submit" style={styles.saveBtn}>
                {editingId ? "Update" : "Insert"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} style={styles.clearBtn}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>{title} Table</h2>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {fields.slice(0, 6).map((field) => (
                    <th key={field.name} style={styles.th}>
                      {field.label}
                    </th>
                  ))}
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    {fields.slice(0, 6).map((field) => (
                      <td key={field.name} style={styles.td}>
                        {field.name === "image" ? (
                          <span style={styles.imageText}>{item[field.name]}</span>
                        ) : (
                          String(item[field.name] ?? "")
                        )}
                      </td>
                    ))}
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button onClick={() => editItem(item)} style={styles.editBtn}>
                          Edit
                        </button>
                        <button
                          onClick={() => deleteItem(item)}
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

            {items.length === 0 && <p style={styles.empty}>No records yet.</p>}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "16px",
  },
  label: {
    display: "grid",
    gap: "8px",
    color: "#0b1f3a",
    fontWeight: "800",
  },
  input: {
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #dbe3ef",
    borderRadius: "12px",
  },
  textarea: {
    minHeight: "120px",
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #dbe3ef",
    borderRadius: "12px",
    resize: "vertical",
  },
  formActions: {
    display: "flex",
    alignItems: "end",
    gap: "10px",
  },
  saveBtn: {
    background: "#d4af37",
    color: "#0b1f3a",
    border: "none",
    padding: "14px 22px",
    borderRadius: "12px",
    fontWeight: "900",
    cursor: "pointer",
  },
  clearBtn: {
    background: "#0b1f3a",
    color: "#f8f6f0",
    border: "none",
    padding: "14px 22px",
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
    minWidth: "980px",
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
  imageText: {
    display: "inline-block",
    maxWidth: "220px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
  empty: {
    textAlign: "center",
    marginTop: "25px",
    fontSize: "18px",
    color: "#64748b",
  },
};
