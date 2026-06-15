import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/requireAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const admin = await requireAdmin(req);

  if (!admin.ok) {
    return res.status(admin.status).json({
      success: false,
      message: admin.message,
    });
  }

  try {
    const [
      totalUsers,
      totalBookings,
      pendingBookings,
      cancelledBookings,
      users,
      bookings,
      revenue,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "Pending" } }),
      prisma.booking.count({ where: { status: "Cancelled" } }),
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.booking.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.booking.aggregate({
        where: {
          status: {
            not: "Cancelled",
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      admin: admin.user,
      stats: {
        totalUsers,
        totalBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue: revenue._sum.amount || 0,
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
