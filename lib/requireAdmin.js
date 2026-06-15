import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { prisma } from "./prisma";

export async function requireAdmin(req) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.veloura_token;

  if (!token) {
    return {
      ok: false,
      status: 401,
      message: "Login required",
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return {
        ok: false,
        status: 403,
        message: "Admin access only",
      };
    }

    return {
      ok: true,
      user,
    };
  } catch {
    return {
      ok: false,
      status: 401,
      message: "Invalid or expired session",
    };
  }
}
