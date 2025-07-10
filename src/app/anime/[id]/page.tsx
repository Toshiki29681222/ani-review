// app/anime/[id]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

async function getAnimeDetail(id: string) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          native
        }
        description(asHtml: false)
        coverImage {
          large
        }
        startDate {
          year
        }
        episodes
      }
    }
  `;

  const variables = { id: Number(id) };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await response.json();
  return json.data?.Media;
}

export default async function AnimeDetailPage({ params }: Props) {
  const anime = await getAnimeDetail(params.id);

  if (!anime) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={anime.coverImage?.large}
          alt={anime.title?.romaji || "Anime"}
          width={300}
          height={400}
          className="rounded object-cover"
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{anime.title?.romaji}</h1>
          <p className="text-gray-600">{anime.title?.native}</p>
          <p className="text-sm text-gray-700">{anime.description}</p>
          <p className="text-sm">公開年: {anime.startDate?.year}</p>
          <p className="text-sm">話数: {anime.episodes ?? "不明"}</p>
        </div>
      </div>
    </div>
  );
}
