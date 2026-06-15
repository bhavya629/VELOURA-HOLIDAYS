import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.veloura_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { bookingId } = req.body;

    const booking = await prisma.booking.findFirst({
      where: {
        id: Number(bookingId),
        userId: decoded.id,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    if (booking.status === "Cancellation Requested") {
      return res.status(400).json({
        success: false,
        message: "Cancellation request already sent",
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: Number(bookingId),
      },
      data: {
        status: "Cancellation Requested",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Cancellation request sent to admin",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Cancellation Request Error:", error);

    return res.status(500).json({
      success: false,
      message: "Cancellation request failed",
    });
  }
}