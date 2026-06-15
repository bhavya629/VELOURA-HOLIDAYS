import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const BRAND_NAVY = "#0B1F3A";
const BRAND_GOLD = "#D4AF37";
const BRAND_IVORY = "#F8F6F0";
const DARK_TEXT = "#111827";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function drawRow(doc, label, value, y) {
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(BRAND_NAVY)
    .text(label, 58, y, { width: 170 });

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(DARK_TEXT)
    .text(value || "N/A", 230, y, { width: 300 });
}

export function generateInvoice({ booking, user }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 48,
      info: {
        Title: `${booking.invoiceNumber} - Veloura Holidays Invoice`,
        Author: "Veloura Holidays",
      },
    });

    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.rect(0, 0, doc.page.width, 118).fill(BRAND_NAVY);

    const logoPath = path.join(
      process.cwd(),
      "public",
      "images",
      "logo",
      "veloura-logo.png"
    );

    if (fs.existsSync(logoPath)) {
      try {
        doc.image(logoPath, 48, 28, {
          width: 58,
          height: 58,
          fit: [58, 58],
        });
      } catch {
        doc
          .circle(77, 57, 28)
          .fillAndStroke(BRAND_GOLD, BRAND_GOLD);
      }
    }

    doc
      .fillColor(BRAND_IVORY)
      .font("Helvetica-Bold")
      .fontSize(24)
      .text("Veloura Holidays", 120, 34);

    doc
      .fillColor(BRAND_GOLD)
      .font("Helvetica")
      .fontSize(11)
      .text("Experience India in Luxury", 120, 64);

    doc
      .fillColor(BRAND_IVORY)
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("Booking Invoice", 390, 38, { align: "right" });

    doc
      .fillColor(BRAND_GOLD)
      .font("Helvetica")
      .fontSize(10)
      .text(booking.invoiceNumber, 390, 65, { align: "right" });

    doc
      .roundedRect(48, 146, doc.page.width - 96, 64, 10)
      .fill("#fbfaf5")
      .stroke("#ece3c8");

    doc
      .fillColor(BRAND_NAVY)
      .font("Helvetica-Bold")
      .fontSize(13)
      .text("Payment Confirmed", 68, 164);

    doc
      .fillColor(DARK_TEXT)
      .font("Helvetica")
      .fontSize(10)
      .text(
        "Thank you for booking with Veloura Holidays. Your luxury travel reservation has been confirmed.",
        68,
        184,
        { width: 460 }
      );

    let y = 244;

    doc
      .fillColor(BRAND_GOLD)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Invoice Details", 48, y);

    y += 30;
    drawRow(doc, "Invoice Number", booking.invoiceNumber, y);
    drawRow(doc, "Booking Reference", booking.bookingReference, y + 22);
    drawRow(doc, "Booking ID", String(booking.id), y + 44);
    drawRow(doc, "Generated Date", formatDate(new Date()), y + 66);

    y += 112;
    doc
      .fillColor(BRAND_GOLD)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Customer Details", 48, y);

    y += 30;
    drawRow(doc, "Customer Name", user.name, y);
    drawRow(doc, "Customer Email", user.email, y + 22);
    drawRow(doc, "Customer Phone", user.phone, y + 44);

    y += 90;
    doc
      .fillColor(BRAND_GOLD)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Booking Summary", 48, y);

    y += 30;
    drawRow(doc, "Package Name", booking.packageName, y);
    drawRow(doc, "Travel Date", formatDate(booking.travelDate), y + 22);
    drawRow(doc, "Number of Travellers", String(booking.travellers), y + 44);
    drawRow(doc, "Payment Status", booking.paymentStatus || "Paid", y + 66);

    doc
      .roundedRect(48, y + 104, doc.page.width - 96, 58, 10)
      .fill(BRAND_NAVY);

    doc
      .fillColor(BRAND_IVORY)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Total Amount Paid", 68, y + 124);

    doc
      .fillColor(BRAND_GOLD)
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(formatCurrency(booking.amount), 360, y + 117, {
        width: 150,
        align: "right",
      });

    doc
      .fillColor("#6b7280")
      .font("Helvetica")
      .fontSize(9)
      .text(
        "This is a computer-generated invoice from Veloura Holidays.",
        48,
        760,
        { align: "center", width: doc.page.width - 96 }
      );

    doc.end();
  });
}
