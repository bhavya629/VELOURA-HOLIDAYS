import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/requireAdmin";

export default async function handler(req, res) {
  const admin = await requireAdmin(req);

  if (!admin.ok) {
    return res.status(admin.status).json({
      success: false,
      message: admin.message,
    });
  }

  try {
    if (req.method === "GET") {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });

      return res.status(200).json({
        success: true,
        users,
      });
    }

    if (req.method === "PATCH") {
      const { id, name, phone, role } = req.body;

      const user = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          phone,
          role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
        },
      });

      return res.status(200).json({
        success: true,
        user,
      });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;

      if (Number(id) === admin.user.id) {
        return res.status(400).json({
          success: false,
          message: "You cannot delete your own admin account",
        });
      }

      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        success: true,
        message: "User deleted",
      });
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("Admin Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to manage users",
    });
  }
}
