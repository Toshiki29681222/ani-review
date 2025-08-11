import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma_client";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const { comment, animeId, userId } = await request.json();

    // バリデーション
    if (!comment || !animeId || !userId) {
      return NextResponse.json(
        { error: "コメント、アニメID、ユーザーIDは必須です" },
        { status: 400 }
      );
    }

    // 新しいレビューの作成
    const review = await prisma.animeReview.create({
      data: {
        comment,
        animeId,
        userId,
      },
      include: {
        anime: true,
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// レビュー一覧取得
export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const { searchParams } = new URL(request.url);
    const animeId = searchParams.get('animeId');
    const userId = searchParams.get('userId');

    const whereClause: { animeId?: string; userId?: string } = {};
    if (animeId) whereClause.animeId = animeId;
    if (userId) whereClause.userId = userId;

    const reviews = await prisma.animeReview.findMany({
      where: whereClause,
      include: {
        anime: true,
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
