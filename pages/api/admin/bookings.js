import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.veloura_token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Admin access only" });
    }

    if (req.method === "GET") {
      const bookings = await prisma.booking.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({ success: true, bookings });
    }

    if (req.method === "PATCH") {
      const { bookingId, status } = req.body;

      const updatedBooking = await prisma.booking.update({
        where: {
          id: Number(bookingId),
        },
        data: {
          status,
        },
      });

      return res.status(200).json({ success: true, booking: updatedBooking });
    }

    if (req.method === "DELETE") {
      const { bookingId } = req.body;

      await prisma.booking.delete({
        where: {
          id: Number(bookingId),
        },
      });

      return res.status(200).json({ success: true, message: "Booking deleted" });
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("Admin Bookings Error:", error);
    return res.status(500).json({ success: false, message: "Failed to manage bookings" });
  }
}