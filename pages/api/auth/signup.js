import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";

const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email must contain @ and end with .com",
      });
    }

    if (String(phone).trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and include lowercase, uppercase, and special character",
      });
    }

    // Later: verify Email OTP/SMS OTP here before creating the user.
    // Later: connect Nodemailer with Gmail App Password to send OTP from bhavyad1176@gmail.com.

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
