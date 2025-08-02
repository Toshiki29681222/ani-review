// Notice from where NextResponse is imported:
import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma_client";

export async function GET() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return NextResponse.json({ message: "ユーザーを取得しました", users });
}

export async function POST() {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      email: "toshiki@prisma.io",
      name: "Toshiki Prisma",
    },
  });
  console.log("User created:", user);
  return NextResponse.json({ user });
}
