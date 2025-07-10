"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // アイコンを使う場合

const navLinks = [
  { label: "ホーム", href: "/" },
  { label: "アニメ一覧", href: "/anime" },
  { label: "お気に入り", href: "/favorites" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* ロゴ */}
        <div className="text-lg font-bold">アニメ感想ログ</div>

        {/* ハンバーガーアイコン（モバイル） */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* ナビゲーション（PC表示） */}
        <nav className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* モバイル用メニュー */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
