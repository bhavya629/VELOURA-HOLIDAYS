import Link from "next/link";

export default function Terms() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={kickerStyle}>Terms & Conditions</p>
        <h1 style={titleStyle}>Booking terms for Veloura Holidays</h1>
        <p style={textStyle}>
          Package and hotel prices are subject to availability at the time of
          confirmation. A booking is considered confirmed only after successful
          payment and booking acknowledgement.
        </p>
        <p style={textStyle}>
          Cancellations, refunds, date changes, and no-show rules may vary by
          hotel, season, package type, and supplier terms. Any extra services,
          meals, permits, or activities not listed in inclusions are chargeable.
        </p>
        <p style={textStyle}>
          Travellers are responsible for carrying valid identification,
          following local laws, respecting property rules, and checking weather
          or route conditions for mountain and backwater destinations.
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
