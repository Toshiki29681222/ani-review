// app/anime/[id]/page.tsx
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import EpisodeList from "@/components/EpisodeList";

type Episode = {
  id: number;
  number_text: string;
  title: string;
  aired_at: string | null;
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

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { id: Number(id) },
    }),
    cache: "no-store",
  });

  const json = await response.json();
  return json.data?.Media;
}

async function getEpisodesFromAnnict(title: string): Promise<Episode[]> {
  const accessToken = process.env.ANNICT_ACCESS_TOKEN;
  if (!accessToken) return [];

  const workRes = await fetch(
    `https://api.annict.com/v1/works?filter_title=${encodeURIComponent(
      title
    )}&access_token=${accessToken}`
  );
  const workData = await workRes.json();
  const work = workData.works?.[0];
  if (!work) return [];

  const epRes = await fetch(
    `https://api.annict.com/v1/episodes?filter_work_id=${work.id}&sort_id=asc&access_token=${accessToken}`
  );
  const epData = await epRes.json();

  return epData.episodes || [];
}

export default async function AnimeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const anime = await getAnimeDetail(params.id);
  if (!anime) return notFound();

  const episodes = await getEpisodesFromAnnict(anime.title.native);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* アニメ情報 */}
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
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {anime.description}
          </p>
          <p className="text-sm">公開年: {anime.startDate?.year}</p>
          <p className="text-sm">話数: {anime.episodes ?? "不明"}</p>
        </div>
      </div>

      {/* エピソード一覧 + 感想モーダル */}
      <EpisodeList episodes={episodes} animeId={anime.id} />
    </div>
  );
}
