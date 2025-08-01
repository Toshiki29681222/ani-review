// Notice from where NextResponse is imported:
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "ユーザーを取得しました" });
}
