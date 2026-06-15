import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { type } = req.query;

  try {
    if (type === "destinations") {
      const items = await prisma.$queryRaw`
        SELECT * FROM destination
        WHERE status = 'Active'
        ORDER BY createdAt DESC
      `;
      return res.status(200).json({ success: true, items });
    }

    if (type === "hotels") {
      const items = await prisma.$queryRaw`
        SELECT * FROM hotel
        WHERE status = 'Active'
        ORDER BY createdAt DESC
      `;
      return res.status(200).json({ success: true, items });
    }

    if (type === "packages") {
      const items = await prisma.$queryRaw`
        SELECT * FROM travelpackage
        WHERE status = 'Active'
        ORDER BY createdAt DESC
      `;
      return res.status(200).json({ success: true, items });
    }

    return res.status(400).json({ success: false, message: "Invalid catalog type" });
  } catch (error) {
    console.error("Public Catalog Error:", error);
    return res.status(500).json({ success: false, message: "Failed to load catalog" });
  }
}
