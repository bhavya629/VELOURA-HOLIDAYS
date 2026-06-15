import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const destinations = await prisma.destination.findMany({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, destinations });
  } catch (error) {
    console.error("Destinations API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load destinations",
    });
  }
}