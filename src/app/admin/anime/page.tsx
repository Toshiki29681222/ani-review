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

      <div className="p-10">
        <div className="flex justify-end ">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ">
            新規登録
          </button>
        </div>

        {/* TODO: 一覧画面作成 */}
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-5 text-gray-900">ID</th>
                <th className="text-left p-5 text-gray-900">タイトル</th>
                <th className="text-left p-5 text-gray-900">作成日</th>
                <th className="text-left p-5 text-gray-900">更新日</th>
                <th className="text-left p-5"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(animeList) && animeList.length > 0 ? (
                animeList.map((anime: Anime) => (
                  <tr key={anime.id}>
                    <td className="p-5 text-gray-900">{anime.id}</td>
                    <td className="p-5 text-gray-900">{anime.title}</td>
                    <td className="p-5 text-gray-900">{anime.createdAt}</td>
                    <td className="p-5 text-gray-900">{anime.updatedAt}</td>
                    <td>
                      <button title="編集" className="p-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-square-pen-icon lucide-square-pen"
                          color="blue"
                        >
                          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                        </svg>
                      </button>
                      <button title="削除">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-trash2-icon lucide-trash-2"
                          color="red"
                        >
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M3 6h18" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
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
      </div>
    </div>
  );
}

// const EditDialog = () => {
//   return (
//     <div>
//       <h2>アニメ編集</h2>
//       <form>
//         <input type="text" placeholder="アニメタイトル" />
//         <button type="submit">保存</button>
//         <button type="button">キャンセル</button>
//       </form>
//     </div>
//   );
// };
