import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const hotels = await prisma.hotel.findMany({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, hotels });
  } catch (error) {
    console.error("Hotels API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load hotels",
    });
  }
}