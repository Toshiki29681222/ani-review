"use client";

import Image from "next/image";
import Link from "next/link";

type Anime = {
  id: number;
  title: { romaji: string; native: string };
  coverImage: { large: string };
};

export default function AnimeGrid({ animeList }: { animeList: Anime[] }) {
  return (
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

      {/* アニメグリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animeList.map((anime) => (
          <Link
            key={anime.id}
            href={`/anime/${anime.id}`}
            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <Image
              src={anime.coverImage?.large || ""}
              alt={anime.title?.romaji || "no-title"}
              width={300}
              height={400}
              className="w-full object-cover aspect-[3/4]"
            />
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-base text-gray-800 line-clamp-1">
                {anime.title?.romaji}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-1">
                {anime.title?.native}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
