import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.veloura_token;

    if (!token) {
      return res.status(401).json({
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const bookings = await prisma.booking.findMany({
      where: {
        userId: decoded.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
}