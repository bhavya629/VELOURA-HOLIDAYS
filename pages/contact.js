import Link from "next/link";

export default function Contact() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={kickerStyle}>Contact</p>
        <h1 style={titleStyle}>Speak with Veloura Holidays</h1>
        <div style={gridStyle}>
          <div>
            <h3 style={goldTitle}>Office Address</h3>
            <p style={textStyle}>Veloura Holidays Travel Desk, Mumbai, Maharashtra, India</p>
            <h3 style={goldTitle}>Phone</h3>
            <p style={textStyle}>+91 98765 43210</p>
            <h3 style={goldTitle}>Email</h3>
            <p style={textStyle}>support@velouraholidays.com</p>
            <h3 style={goldTitle}>WhatsApp</h3>
            <p style={textStyle}>Available daily from 10:00 AM to 7:00 PM</p>
          </div>
          <form style={formStyle}>
            <input style={inputStyle} placeholder="Your name" />
            <input style={inputStyle} placeholder="Email or phone" />
            <textarea style={{ ...inputStyle, minHeight: "120px", paddingTop: "14px" }} placeholder="Tell us about your trip" />
            <button type="button" style={buttonStyle}>Send Enquiry</button>
          </form>
        </div>
        <Link href="/" style={backStyle}>Back to Home</Link>
      </section>
    </main>
  );
}

const pageStyle = { minHeight: "100vh", padding: "80px 20px", background: "linear-gradient(180deg, #07182d 0%, #0B1F3A 50%, #111827 100%)", color: "#F8F6F0", fontFamily: "Poppins, sans-serif" };
const cardStyle = { maxWidth: "1050px", margin: "0 auto", padding: "34px", background: "rgba(248, 246, 240, 0.08)", border: "1px solid rgba(248, 246, 240, 0.14)", borderRadius: "16px" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" };
const formStyle = { display: "grid", gap: "12px" };
const inputStyle = { width: "100%", minHeight: "48px", padding: "0 14px", color: "#F8F6F0", background: "rgba(17, 24, 39, 0.72)", border: "1px solid rgba(212, 175, 55, 0.3)", borderRadius: "8px" };
const kickerStyle = { color: "#D4AF37", fontWeight: "800", textTransform: "uppercase" };
const titleStyle = { fontFamily: "Playfair Display, Georgia, serif", fontSize: "3rem", margin: "10px 0 28px" };
const goldTitle = { color: "#D4AF37", marginBottom: "6px" };
const textStyle = { color: "rgba(248, 246, 240, 0.78)", lineHeight: 1.7 };
const buttonStyle = { minHeight: "48px", background: "#D4AF37", color: "#111827", border: 0, borderRadius: "8px", fontWeight: "800" };
const backStyle = { display: "inline-flex", marginTop: "24px", color: "#D4AF37", fontWeight: "800", textDecoration: "none" };
