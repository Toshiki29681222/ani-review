"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-100 shadow-inner px-4 py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} アニメ感想ログ. All rights reserved.
        </p>

        <div className="flex space-x-4">
          <Link href="/terms" className="text-sm text-gray-600 hover:underline">
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:underline"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-600 hover:underline"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
}
