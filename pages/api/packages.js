import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    const packages = await prisma.travelPackage.findMany({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, packages });
  } catch (error) {
    console.error("Packages API Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load packages",
    });
  }
}