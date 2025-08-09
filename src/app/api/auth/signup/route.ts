import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../../../../generated/prisma_client";

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    console.log("Received signup request");
    const { email, password } = await request.json();
    console.log(`email: ${email}, password: ${password}`);

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: "メールアドレスとパスワードは必須です" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "パスワードは6文字以上で入力してください" },
        { status: 400 }
      );
    }

    // 既存ユーザーの確認
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 409 }
      );
    }

    // パスワードのハッシュ化
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        name: email.split("@")[0], // メールアドレスの@より前を一時的な名前として使用
        email,
        password: hashedPassword,
      },
    });

    // JWTトークンの生成
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(`JWT token generated ${token}`);

    // パスワードを除外してレスポンス
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "ユーザー登録が完了しました",
        user: userWithoutPassword,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
