import nodemailer from "nodemailer";

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

export async function sendBookingEmail({ booking, user, invoiceBuffer }) {
  const senderEmail =
    process.env.GMAIL_USER || process.env.EMAIL_USER || "bhavyad1176@gmail.com";
  const appPassword = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

  if (!appPassword) {
    throw new Error("GMAIL_APP_PASSWORD is missing in .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: appPassword,
    },
  });

  const text = `
Dear ${user.name},

Thank you for booking with Veloura Holidays.

Your booking has been confirmed.

Booking Reference: ${booking.bookingReference}
Invoice Number: ${booking.invoiceNumber}
Package: ${booking.packageName}
Travel Date: ${formatDate(booking.travelDate)}
Travellers: ${booking.travellers}
Amount Paid: ${formatCurrency(booking.amount)}
Payment Status: ${booking.paymentStatus || "Paid"}

Your invoice PDF is attached with this email.

Warm regards,
Veloura Holidays
Experience India in Luxury
`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="color: #0B1F3A; margin-bottom: 4px;">Veloura Holidays</h2>
      <p style="color: #D4AF37; font-weight: 700; margin-top: 0;">Experience India in Luxury</p>

      <p>Dear ${user.name},</p>
      <p>Thank you for booking with Veloura Holidays. Your luxury travel reservation has been confirmed.</p>

      <div style="border: 1px solid #D4AF37; border-radius: 12px; padding: 16px; background: #F8F6F0;">
        <h3 style="color: #0B1F3A; margin-top: 0;">Booking Summary</h3>
        <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>
        <p><strong>Invoice Number:</strong> ${booking.invoiceNumber}</p>
        <p><strong>Package:</strong> ${booking.packageName}</p>
        <p><strong>Travel Date:</strong> ${formatDate(booking.travelDate)}</p>
        <p><strong>Travellers:</strong> ${booking.travellers}</p>
        <p><strong>Amount Paid:</strong> ${formatCurrency(booking.amount)}</p>
        <p><strong>Payment Status:</strong> ${booking.paymentStatus || "Paid"}</p>
      </div>

      <p>The invoice PDF is attached with this email for your records.</p>
      <p>Warm regards,<br/>Veloura Holidays</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Veloura Holidays" <${senderEmail}>`,
    to: user.email,
    subject: "Veloura Holidays Booking Confirmation",
    text,
    html,
    attachments: [
      {
        filename: `${booking.invoiceNumber}.pdf`,
        content: invoiceBuffer,
        contentType: "application/pdf",
      },
    ],
  });
}
