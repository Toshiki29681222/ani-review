"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";

type Anime = {
  id: number;
  title: { romaji: string; native?: string; english?: string };
  coverImage: { large: string };
};

export default function Anime() {
  const [seasonalAnime, setSeasonalAnime] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      const query = `
        query {
          seasonal: Page(perPage: 10) {
            media(season: SUMMER, seasonYear: 2025, type: ANIME, sort: POPULARITY_DESC) {
              id
              title {
                romaji
                native
              }
              coverImage {
                large
              }
            }
          }
          popular: Page(perPage: 10) {
            media(sort: POPULARITY_DESC, type: ANIME) {
              id
              title {
                romaji
                native
              }
              coverImage {
                large
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

      setSeasonalAnime(json.data.seasonal.media);
      setPopularAnime(json.data.popular.media);
    };

    fetchAnimeData();
  }, []);

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
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 検索セクション */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">アニメ検索</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              type="text"
              placeholder="アニメタイトル・スタッフ名で検索"
              className="flex-1 h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="h-10 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
              検索
            </button>
          </div>
        </section>

        {/* アニメセクション */}
        <AnimeSection title="今季放送中のアニメ" animeList={seasonalAnime} />
        <AnimeSection title="今もなお人気なアニメ" animeList={popularAnime} />
      </div>
    </div>
  );
}
