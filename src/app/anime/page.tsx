"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import { Bot, User, Search } from "lucide-react"; // アイコン追加

type Anime = {
  id: number;
  title: { romaji: string; native?: string; english?: string };
  coverImage: { large: string };
};

export default function Anime() {
  const [seasonalAnime, setSeasonalAnime] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // 通常検索用

  useEffect(() => {
    const fetchAnimeData = async () => {
      const query = `
        query {
          seasonal: Page(perPage: 10) {
            media(season: SUMMER, seasonYear: 2025, type: ANIME, sort: POPULARITY_DESC) {
              id
              title { romaji native }
              coverImage { large }
            }
          }
          popular: Page(perPage: 10) {
            media(sort: POPULARITY_DESC, type: ANIME) {
              id
              title { romaji native }
              coverImage { large }
            }
          }
        }
      `;

      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      if (json.errors) {
        console.error("GraphQL error:", json.errors);
        return;
      }

      setSeasonalAnime(json.data.seasonal.media);
      setPopularAnime(json.data.popular.media);
    };

    fetchAnimeData();
  }, []);

  const handleAiSearch = () => {
    // TODO: 実際にはOpenAI API呼び出し
    setAiResult(`「${aiQuery}」についてAIが検索した結果（モック表示）です。`);
  };

  const handleNormalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`通常検索: ${searchQuery}`);
  };

  const AnimeSection = ({
    title,
    animeList,
  }: {
    title: string;
    animeList: Anime[];
  }) => (
    <section className="space-y-3">
      <div className="flex">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <Link href={""} className="pl-227">
          すべて表示
        </Link>
      </div>
      <ul className="flex overflow-x-auto gap-3">
        {animeList.map((anime) => (
          <li key={anime.id}>
            <Link
              href={`/anime/${anime.id}?img=${encodeURIComponent(
                anime.coverImage.large
              )}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition w-[200px] block"
            >
              <div className="w-[200px] h-[267px] relative">
                <Image
                  src={anime.coverImage.large}
                  alt={anime.title.romaji}
                  fill
                  className="object-cover rounded-t"
                  sizes="200px"
                />
              </div>
            </Link>
            <div className="flex justify-between p-3 space-y-1 h-20">
              <h3 className="font-semibold text-sm text-gray-800 line-clamp-1 pt-1">
                {anime.title.native}
              </h3>
              <FavoriteButton />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow gap-4">
        <h1 className="text-2xl font-bold text-gray-800">AniReview</h1>

        <div className="flex items-center gap-4 ml-auto">
          {/* 通常検索フォーム（右寄せ & アイコン付き） */}
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

          {/* AI検索 */}
          <button
            onClick={() => setAiOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="AIでアニメ検索"
          >
            <Bot className="w-6 h-6 text-purple-600" />
          </button>

          {/* マイページ */}
          <Link
            href="/mypage"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="マイページ"
          >
            <User className="w-6 h-6 text-gray-700" />
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-10">
        <AnimeSection title="今季放送中のアニメ" animeList={seasonalAnime} />
        <AnimeSection title="今もなお人気なアニメ" animeList={popularAnime} />
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
