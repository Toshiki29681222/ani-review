"use client";

import Link from "next/link";

import { Bot, User, Search } from "lucide-react"; // アイコン追加

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow gap-4">
      <h1 className="text-2xl font-bold text-gray-800">AniReview</h1>

      <div className="flex items-center gap-4 ml-auto">
        <form onSubmit={() => {}} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={""}
            onChange={() => {}}
            placeholder="タイトルで検索"
            className="w-64 h-10 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </form>

        {/* AI検索 */}
        <button
          onClick={() => {}}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          title="AIでアニメ検索"
        >
          <Bot className="w-6 h-6 text-purple-600" />
        </button>

        {/* マイページ */}
        <Link
          href="/profile"
          className="p-2 rounded-full hover:bg-gray-100 transition"
          title="マイページ"
        >
          <User className="w-6 h-6 text-gray-700" />
        </Link>
      </div>
    </header>
  );
}
