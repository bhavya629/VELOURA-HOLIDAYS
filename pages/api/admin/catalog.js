import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/requireAdmin";

const catalogConfig = {
  packages: {
    table: "travelpackage",
    fields: ["slug", "name", "duration", "price", "image", "description", "status"],
  },
  hotels: {
    table: "hotel",
    fields: [
      "slug",
      "name",
      "location",
      "type",
      "rating",
      "price",
      "image",
      "description",
      "status",
    ],
  },
  destinations: {
    table: "destination",
    fields: ["slug", "name", "region", "price", "image", "description", "status"],
  },
};

function cleanValue(field, value) {
  if (["price", "rating"].includes(field)) {
    return Number(value);
  }

  return String(value || "").trim();
}

function buildData(type, body) {
  const config = catalogConfig[type];
  const data = {};

  config.fields.forEach((field) => {
    if (body[field] !== undefined) {
      data[field] = cleanValue(field, body[field]);
    }
  });

  return data;
}

async function listItems(table) {
  if (table === "travelpackage") {
    return prisma.$queryRaw`
      SELECT * FROM travelpackage
      ORDER BY createdAt DESC
    `;
  }

  if (table === "hotel") {
    return prisma.$queryRaw`
      SELECT * FROM hotel
      ORDER BY createdAt DESC
    `;
  }

  return prisma.$queryRaw`
    SELECT * FROM destination
    ORDER BY createdAt DESC
  `;
}

async function createItem(type, data) {
  if (type === "packages") {
    await prisma.$executeRaw`
      INSERT INTO travelpackage
        (slug, name, duration, price, image, description, status, createdAt, updatedAt)
      VALUES
        (${data.slug}, ${data.name}, ${data.duration}, ${data.price}, ${data.image},
         ${data.description}, ${data.status}, NOW(3), NOW(3))
    `;
  }

  if (type === "hotels") {
    await prisma.$executeRaw`
      INSERT INTO hotel
        (slug, name, location, type, rating, price, image, description, status, createdAt, updatedAt)
      VALUES
        (${data.slug}, ${data.name}, ${data.location}, ${data.type}, ${data.rating},
         ${data.price}, ${data.image}, ${data.description}, ${data.status}, NOW(3), NOW(3))
    `;
  }

  if (type === "destinations") {
    await prisma.$executeRaw`
      INSERT INTO destination
        (slug, name, region, price, image, description, status, createdAt, updatedAt)
      VALUES
        (${data.slug}, ${data.name}, ${data.region}, ${data.price}, ${data.image},
         ${data.description}, ${data.status}, NOW(3), NOW(3))
    `;
  }
}

async function updateItem(type, id, data) {
  if (type === "packages") {
    await prisma.$executeRaw`
      UPDATE travelpackage
      SET slug = ${data.slug},
          name = ${data.name},
          duration = ${data.duration},
          price = ${data.price},
          image = ${data.image},
          description = ${data.description},
          status = ${data.status},
          updatedAt = NOW(3)
      WHERE id = ${Number(id)}
    `;
  }

  if (type === "hotels") {
    await prisma.$executeRaw`
      UPDATE hotel
      SET slug = ${data.slug},
          name = ${data.name},
          location = ${data.location},
          type = ${data.type},
          rating = ${data.rating},
          price = ${data.price},
          image = ${data.image},
          description = ${data.description},
          status = ${data.status},
          updatedAt = NOW(3)
      WHERE id = ${Number(id)}
    `;
  }

  if (type === "destinations") {
    await prisma.$executeRaw`
      UPDATE destination
      SET slug = ${data.slug},
          name = ${data.name},
          region = ${data.region},
          price = ${data.price},
          image = ${data.image},
          description = ${data.description},
          status = ${data.status},
          updatedAt = NOW(3)
      WHERE id = ${Number(id)}
    `;
  }
}

async function deleteItem(type, id) {
  if (type === "packages") {
    await prisma.$executeRaw`DELETE FROM travelpackage WHERE id = ${Number(id)}`;
  }

  if (type === "hotels") {
    await prisma.$executeRaw`DELETE FROM hotel WHERE id = ${Number(id)}`;
  }

  if (type === "destinations") {
    await prisma.$executeRaw`DELETE FROM destination WHERE id = ${Number(id)}`;
  }
}

export default async function handler(req, res) {
  const admin = await requireAdmin(req);

  if (!admin.ok) {
    return res.status(admin.status).json({
      success: false,
      message: admin.message,
    });
  }

  const { type } = req.query;
  const config = catalogConfig[type];

  if (!config) {
    return res.status(400).json({
      success: false,
      message: "Invalid catalog type",
    });
  }

  try {
    if (req.method === "GET") {
      const items = await listItems(config.table);
      return res.status(200).json({ success: true, items });
    }

    if (req.method === "POST") {
      const data = buildData(type, req.body);
      await createItem(type, data);
      const items = await listItems(config.table);
      return res.status(201).json({ success: true, item: items[0] });
    }

    if (req.method === "PATCH") {
      const data = buildData(type, req.body);
      await updateItem(type, req.body.id, data);
      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      await deleteItem(type, req.body.id);
      return res.status(200).json({
        success: true,
        message: "Item deleted",
      });
    }

    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  } catch (error) {
    console.error("Admin Catalog Error:", error);
    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Failed to manage catalog: ${error.message}`
          : "Failed to manage catalog",
    });
  }
}
