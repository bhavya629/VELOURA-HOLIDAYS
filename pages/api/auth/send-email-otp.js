import nodemailer from "nodemailer";

const otpStore = global.otpStore || new Map();
global.otpStore = otpStore;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email must contain @ and end with .com",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Veloura Holidays" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Veloura Holidays OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Veloura Holidays</h2>
          <p>Your signup OTP is:</p>
          <h1 style="letter-spacing: 4px;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error("Email OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP email",
    });
  }
}