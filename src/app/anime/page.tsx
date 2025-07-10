"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Anime() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animeList, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    const fetchKyotoAnimationAnime = async () => {
      const query = `
        query {
          Studio(id: 2) {
            name
            media(perPage: 20, sort: POPULARITY_DESC) {
              edges {
                node {
                  id
                  title {
                    romaji
                    native
                  }
                  coverImage {
                    large
                  }
                  startDate {
                    year
                  }
                }
              }
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anime = json.data.Studio.media.edges.map((edge: any) => edge.node);
      const uniqueAnimeList = anime.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (anime: any, index: any, self: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          self.findIndex((a: any) => a.id === anime.id) === index
      );
      setAnimeList(uniqueAnimeList);
    };

    fetchKyotoAnimationAnime();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-8">
      <div className=" mx-auto space-y-10">
        {/* 検索 */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">アニメ検索</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              type="text"
              placeholder="アニメタイトル・スタッフ名で検索"
              className="flex-1 h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              // onChange={(e) => onSearch?.(e.target.value)}
            />
            <button className="h-10 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
              検索
            </button>
          </div>
        </section>

        <section className="space-y-6">
          {/* ソート選択 */}
          <div className="flex justify-end">
            <select
              name="sort"
              aria-label="並び替え"
              className="border border-gray-300 px-3 py-2 rounded-md"
            >
              <option value="popularity">人気順</option>
              <option value="new">新しい順</option>
              <option value="old">古い順</option>
            </select>
          </div>

          {/* アニメグリッド・カード */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {animeList.map((anime) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition w-[200px] mx-auto"
              >
                <div className="w-[200px] h-[267px] relative">
                  <Image
                    src={anime.coverImage?.large || ""}
                    alt={anime.title?.romaji || "no-title"}
                    fill
                    className="object-cover rounded-t"
                    sizes="200px"
                  />
                </div>

                <div className="p-3 space-y-1">
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">
                    {anime.title?.romaji}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {anime.title?.native}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
