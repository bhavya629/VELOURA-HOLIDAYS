import Link from "next/link";

export default function About() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={kickerStyle}>About Veloura</p>
        <h1 style={titleStyle}>Luxury India journeys, planned with care</h1>
        <p style={textStyle}>
          Veloura Holidays designs premium travel experiences across India for
          couples, families, and private groups. Our focus is simple: beautiful
          destinations, handpicked stays, comfortable transfers, and itineraries
          that feel refined without feeling rushed.
        </p>
        <p style={textStyle}>
          We specialise in beach escapes, palace trails, hill retreats,
          honeymoon journeys, backwater stays, and wellness-led holidays. Every
          trip is planned around comfort, timing, hotel quality, and local
          experiences that make the journey feel personal.
        </p>
        <Link href="/" style={buttonStyle}>Back to Home</Link>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  padding: "80px 20px",
  background: "linear-gradient(180deg, #07182d 0%, #0B1F3A 50%, #111827 100%)",
  color: "#F8F6F0",
  fontFamily: "Poppins, sans-serif",
};

const cardStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "34px",
  background: "rgba(248, 246, 240, 0.08)",
  border: "1px solid rgba(248, 246, 240, 0.14)",
  borderRadius: "16px",
};

const kickerStyle = { color: "#D4AF37", fontWeight: "800", textTransform: "uppercase" };
const titleStyle = { fontFamily: "Playfair Display, Georgia, serif", fontSize: "3rem", margin: "10px 0" };
const textStyle = { color: "rgba(248, 246, 240, 0.78)", lineHeight: 1.8 };
const buttonStyle = { display: "inline-flex", marginTop: "20px", padding: "12px 20px", background: "#D4AF37", color: "#111827", borderRadius: "8px", fontWeight: "800", textDecoration: "none" };
