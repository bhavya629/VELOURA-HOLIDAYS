import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis;

function createPrismaClient() {
  const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "veloura_holidays",
  });

  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prismaClient || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaClient = prisma;
}