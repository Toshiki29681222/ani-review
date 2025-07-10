import AnimeCard from "./AnimeCard";

type Anime = {
  id: number;
  title: { romaji: string; native: string };
  coverImage: { large: string };
};

export default function AnimeGrid({ animeList }: { animeList: Anime[] }) {
  return (
    <section className="space-y-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  );
}
