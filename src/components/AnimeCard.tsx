import Image from "next/image";
import Link from "next/link";

type Anime = {
  id: number;
  title: { romaji: string; native: string };
  coverImage: { large: string };
};

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <Link
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
  );
}
