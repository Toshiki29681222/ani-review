import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../../../../generated/prisma_client";

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    console.log("Received login request");
    const { email, password } = await request.json();
    console.log(`Login attempt for email: ${email}`);

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードは必須です" },
        { status: 400 }
      );
    }

    // ユーザーの存在確認
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "メールアドレスまたはパスワードが間違っています" },
        { status: 401 }
      );
    }

    // パスワードの検証
    if (!user.password) {
      return NextResponse.json(
        { error: "パスワードが設定されていません" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "メールアドレスまたはパスワードが間違っています" },
        { status: 401 }
      );
    }

    // JWTトークンの生成
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // パスワードを除外してレスポンス
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    console.log(`Login successful for user: ${user.id}`);

    return NextResponse.json(
      {
        message: "ログインが完了しました",
        user: userWithoutPassword,
        token,
      },
      { status: 200 }
    );
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
