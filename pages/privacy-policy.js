import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={kickerStyle}>Privacy Policy</p>
        <h1 style={titleStyle}>How Veloura protects traveller information</h1>
        <p style={textStyle}>
          Veloura Holidays collects basic details such as name, email, phone,
          booking preferences, payment status, and travel dates to manage
          enquiries, bookings, customer support, and trip communication.
        </p>
        <p style={textStyle}>
          We do not sell customer data. Information is used only for service
          delivery, booking coordination, payment processing, account access,
          and safety communication related to your trip.
        </p>
        <p style={textStyle}>
          Payment processing is handled through secure payment partners. We do
          not store card details on this website.
        </p>
        <Link href="/" style={buttonStyle}>Back to Home</Link>
      </section>
    </main>
  );
}

const pageStyle = { minHeight: "100vh", padding: "80px 20px", background: "linear-gradient(180deg, #07182d 0%, #0B1F3A 50%, #111827 100%)", color: "#F8F6F0", fontFamily: "Poppins, sans-serif" };
const cardStyle = { maxWidth: "900px", margin: "0 auto", padding: "34px", background: "rgba(248, 246, 240, 0.08)", border: "1px solid rgba(248, 246, 240, 0.14)", borderRadius: "16px" };
const kickerStyle = { color: "#D4AF37", fontWeight: "800", textTransform: "uppercase" };
const titleStyle = { fontFamily: "Playfair Display, Georgia, serif", fontSize: "3rem", margin: "10px 0" };
const textStyle = { color: "rgba(248, 246, 240, 0.78)", lineHeight: 1.8 };
const buttonStyle = { display: "inline-flex", marginTop: "20px", padding: "12px 20px", background: "#D4AF37", color: "#111827", borderRadius: "8px", fontWeight: "800", textDecoration: "none" };
