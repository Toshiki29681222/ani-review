"use client";
import { useEffect, useState } from "react";

interface Anime {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export default function AnimeAdminPage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [anime, setAnime] = useState<string>();

  // アニメ一覧取得
  useEffect(() => {
    fetchAnimeList();
  }, []);

  const fetchAnimeList = async () => {
    try {
      const response = await fetch("/api/anime");
      if (!response.ok) {
        throw new Error("アニメの取得に失敗しました");
      }
      const data = await response.json();
      setAnimeList(data);
    } catch (error) {
      console.error(`アニメの取得に失敗しました: ${error}`);
      alert("アニメの取得に失敗しました。");
    }
  };

  // TODO: アニメ登録
  const handleCreateAnime = async () => {
    try {
      const response = await fetch("/api/anime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: anime,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error("アニメの登録に失敗しました");
      }
    } catch (error) {
      console.error(`アニメの登録に失敗しました: ${error}`);
      alert("アニメの登録に失敗しました。");
    }
  };

  console.log("anime:", anime);
  // TODO: アニメ編集
  // TODO: アニメ削除

  return (
    <div>
      <h1>アニメ管理</h1>

      {/* TODO: アニメ登録 */}
      <form onSubmit={handleCreateAnime}>
        <input
          type="text"
          placeholder="アニメタイトル"
          required
          onChange={(e) => {
            setAnime(e.target.value);
          }}
        />
        <button type="submit">アニメを登録</button>
      </form>

      {/* TODO: 一覧画面作成 */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>タイトル</th>
            <th>作成日</th>
            <th>更新日</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(animeList) && animeList.length > 0 ? (
            animeList.map((anime: Anime) => (
              <tr key={anime.id}>
                <td>{anime.id}</td>
                <td>{anime.title}</td>
                <td>{anime.createdAt}</td>
                <td>{anime.updatedAt}</td>
                <td>
                  <button>編集</button>
                </td>
                <td>
                  <button>削除</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>アニメが見つかりませんでした。</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
