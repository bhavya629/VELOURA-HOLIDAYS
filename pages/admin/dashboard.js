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
        message: "Login required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

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

    const totalUsers = users.length;
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(
      (booking) => booking.status === "Pending"
    ).length;
    const cancelledBookings = bookings.filter(
      (booking) => booking.status === "Cancelled"
    ).length;

    const totalRevenue = bookings
      .filter((booking) => booking.status !== "Cancelled")
      .reduce((sum, booking) => sum + Number(booking.amount), 0);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue,
      },
      users,
      bookings,
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
}