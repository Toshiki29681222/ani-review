"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bot, User, Search, X } from "lucide-react";

type Status = "unwatched" | "watching" | "completed";
type Review = {
  id: number;
  animeTitle: string;
  comment: string;
  date: string;
};

type AnimeItem = {
  id: number;
  title: string;
  coverImage: string;
  status: Status;
};

export default function MyPage() {
  const [user] = useState({
    name: "Toshiki",
    avatar: "/placeholder.jpg",
    bio: "アニメが好きなフロントエンドエンジニアです。",
  });

  // 1つの配列にまとめて管理
  const [animeList, setAnimeList] = useState<AnimeItem[]>([
    { id: 1, title: "鬼滅の刃", coverImage: "", status: "unwatched" },
    {
      id: 2,
      title: "進撃の巨人",
      coverImage: "/placeholder.jpg",
      status: "watching",
    },
    { id: 3, title: "呪術廻戦", coverImage: "", status: "watching" },
    {
      id: 4,
      title: "ブルーロック",
      coverImage: "/placeholder.jpg",
      status: "unwatched",
    },
    {
      id: 5,
      title: "Re:ゼロから始める異世界生活",
      coverImage: "",
      status: "completed",
    },
    {
      id: 6,
      title: "魔法少女まどか☆マギカ",
      coverImage: "/placeholder.jpg",
      status: "completed",
    },
  ]);

  const [reviews] = useState<Review[]>([
    {
      id: 1,
      animeTitle: "鬼滅の刃",
      comment: "アニメーションが最高でした！",
      date: "2025-07-20",
    },
    {
      id: 2,
      animeTitle: "進撃の巨人",
      comment: "ストーリーが深くて引き込まれました。",
      date: "2025-07-18",
    },
  ]);

  const [activeTab, setActiveTab] = useState<
    "all" | "unwatched" | "watching" | "completed"
  >("all");

  // 検索・AIモーダル用
  const [searchQuery, setSearchQuery] = useState("");
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);

  const handleNormalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`検索: ${searchQuery}`);
  };

  const handleAiSearch = () => {
    setAiResult(`「${aiQuery}」についてAIが検索した結果（モック表示）です。`);
  };

  /** 削除処理（確認ダイアログ付き、すべてタブでのみ削除可能） */
  const handleRemove = (id: number) => {
    const target = animeList.find((a) => a.id === id);
    if (target && confirm(`「${target.title}」をリストから削除しますか？`)) {
      setAnimeList((prev) => prev.filter((a) => a.id !== id));
    }
  };

  /** 表示するアニメリスト */
  const filteredList =
    activeTab === "all"
      ? animeList
      : animeList.filter((anime) => anime.status === activeTab);
  const renderAnimeList = (list: AnimeItem[]) => (
    <ul className="flex gap-4 overflow-x-auto">
      {list.map((anime) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(false); // 画像読み込み失敗フラグ

        return (
          <li
            key={anime.id}
            className="w-[150px] relative group bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <Link href={`/anime/${anime.id}`}>
              <div className="w-full h-[200px] relative bg-black rounded-t flex items-center justify-center">
                {!error && anime.coverImage ? (
                  <Image
                    src={anime.coverImage}
                    alt={anime.title}
                    fill
                    className="object-cover rounded-t"
                    onError={() => setError(true)} // 読み込み失敗時に黒背景表示へ
                  />
                ) : (
                  <span className="text-white text-xs text-center px-1">
                    {anime.title}
                  </span>
                )}
              </div>
              <div className="p-2 text-sm text-gray-800 line-clamp-1">
                {anime.title}
              </div>
            </Link>

            {/* 削除ボタン（すべてタブのみ） */}
            {activeTab === "all" && (
              <button
                onClick={() => handleRemove(anime.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                title="削除"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow gap-4">
        <h1 className="text-2xl font-bold text-gray-800">AniReview</h1>
        <div className="flex items-center gap-4 ml-auto">
          <form onSubmit={handleNormalSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type / to search"
              className="w-64 h-10 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </form>
          <button
            onClick={() => setAiOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="AIでアニメ検索"
          >
            <Bot className="w-6 h-6 text-purple-600" />
          </button>
          <Link
            href="/mypage"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="マイページ"
          >
            <User className="w-6 h-6 text-gray-700" />
          </Link>
        </div>
      </header>

      {/* 本文 */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* プロフィール */}
        <section className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
          <div className="w-24 h-24 relative rounded-full overflow-hidden bg-black flex items-center justify-center">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none"; // エラー時に非表示
                }}
              />
            ) : (
              <span className="text-white text-sm text-center">
                {user.name}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600 mt-2">{user.bio}</p>
          </div>
        </section>

        {/* タブ切り替え */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">お気に入り</h2>
          <div className="flex gap-4 border-b">
            {["all", "unwatched", "watching", "completed"].map((tab) => (
              <button
                key={tab}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 px-4 ${
                  activeTab === tab
                    ? "border-b-2 border-teal-500 text-teal-600"
                    : "text-gray-600"
                }`}
              >
                {tab === "all"
                  ? "すべて"
                  : tab === "unwatched"
                  ? "未視聴"
                  : tab === "watching"
                  ? "視聴中"
                  : "視聴完了"}
              </button>
            ))}
          </div>
          <div className="mt-6">{renderAnimeList(filteredList)}</div>
        </section>

        {/* レビュー履歴 */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">レビュー履歴</h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {reviews.map((review) => (
              <div key={review.id} className="p-4">
                <h3 className="font-semibold text-gray-800">
                  {review.animeTitle}
                </h3>
                <p className="text-gray-700 mt-1">{review.comment}</p>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* AI検索モーダル */}
      {aiOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                AIでアニメ検索
              </h2>
              <button
                onClick={() => setAiOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="例：泣けるバトルアニメを教えて"
              className="w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAiSearch}
              className="w-full h-10 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            >
              検索
            </button>
            {aiResult && (
              <div className="p-4 bg-gray-50 rounded-md text-gray-700">
                {aiResult}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
