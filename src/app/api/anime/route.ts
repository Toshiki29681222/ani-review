import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma_client";

// アニメの取得APIエンドポイント
export async function GET() {
  const prisma = new PrismaClient();
  try {
    const animes = await prisma.anime.findMany();
    return NextResponse.json(animes, { status: 200 });
  } catch (error) {
    console.error("Error fetching animes:", error);
  }
  return NextResponse.json({}, { status: 200 });
}

// アニメの作成APIエンドポイント
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

    console.log("Creating anime with title:", title);
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
