import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma_client";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const { title } = await request.json();

    // バリデーション
    if (!title) {
      return NextResponse.json(
        { error: "すべてのフィールドは必須です" },
        { status: 400 }
      );
    }

    // 新しいアニメの作成
    const anime = await prisma.anime.create({
      data: {
        title,
      },
    });

    return NextResponse.json(anime, { status: 201 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
