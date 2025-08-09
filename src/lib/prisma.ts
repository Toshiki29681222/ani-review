import { PrismaClient } from "@prisma/client";

console.log("Initializing Prisma client...");
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient;

try {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
  console.log("Prisma client created successfully");
} catch (error) {
  console.error("Failed to create Prisma client:", error);
  throw error;
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
