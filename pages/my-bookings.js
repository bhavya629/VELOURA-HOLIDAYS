import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Auth.module.css";

export default function MyBookings() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [checking, setChecking] = useState(true);

  const handleCancelRequest = async (bookingId) => {
    const confirmRequest = confirm(
      "Are you sure you want to request cancellation for this booking?"
    );

    if (!confirmRequest) return;

    const res = await fetch("/api/bookings/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Cancellation request sent to admin!");

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "Cancellation Requested" }
            : booking
        )
      );
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (!userData.success) {
          window.location.href = "/login";
          return;
        }

        setUser(userData.user);

        const bookingRes = await fetch("/api/bookings/my");
        const bookingData = await bookingRes.json();

        if (bookingData.success) {
          setBookings(bookingData.bookings);
        }
      } catch (error) {
        window.location.href = "/login";
      } finally {
        setChecking(false);
      }
    };

    loadBookings();
  }, []);

  if (checking) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <h1>Loading Bookings...</h1>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>My Bookings</h1>

        <p>Welcome, {user?.name}</p>

        {bookings.length === 0 ? (
          <div className={styles.authLink}>No bookings yet.</div>
        ) : (
          <div style={{ marginTop: "25px", textAlign: "left" }}>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                  borderRadius: "14px",
                  padding: "16px",
                  marginBottom: "15px",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <h3 style={{ color: "#d4af37", marginBottom: "8px" }}>
                  {booking.packageName}
                </h3>

                <p>Travellers: {booking.travellers}</p>

                <p>
                  Travel Date:{" "}
                  {new Date(booking.travelDate).toLocaleDateString()}
                </p>

                <p>Amount: Rs. {booking.amount}</p>

                <p>Status: {booking.status}</p>

                {booking.status === "Confirmed" && (
                  <button
                    onClick={() => handleCancelRequest(booking.id)}
                    style={buttonStyles.request}
                  >
                    Request Cancellation
                  </button>
                )}

                {booking.status === "Pending" && (
                  <button
                    onClick={() => handleCancelRequest(booking.id)}
                    style={buttonStyles.request}
                  >
                    Request Cancellation
                  </button>
                )}

                {booking.status === "Cancellation Requested" && (
                  <button disabled style={buttonStyles.waiting}>
                    Cancellation Requested
                  </button>
                )}

                {booking.status === "Cancellation Rejected" && (
                  <button disabled style={buttonStyles.rejected}>
                    Request Rejected
                  </button>
                )}

                {booking.status === "Cancelled" && (
                  <button disabled style={buttonStyles.cancelled}>
                    Booking Cancelled
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <Link href="/" className={styles.backHome}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

const buttonBase = {
  marginTop: "10px",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: "700",
};

const buttonStyles = {
  request: {
    ...buttonBase,
    background: "#f59e0b",
    color: "#fff",
    cursor: "pointer",
  },
  waiting: {
    ...buttonBase,
    background: "#fbbf24",
    color: "#000",
    cursor: "not-allowed",
  },
  rejected: {
    ...buttonBase,
    background: "#ef4444",
    color: "#fff",
    cursor: "not-allowed",
  },
  cancelled: {
    ...buttonBase,
    background: "#6b7280",
    color: "#fff",
    cursor: "not-allowed",
  },
};