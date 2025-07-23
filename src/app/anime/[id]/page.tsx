"use client";

import { useState } from "react";
import Image from "next/image";

type EpisodeLog = {
  episode: number;
  rating: number;
  comment: string;
  tags: string[];
  date: string;
};

export default function AnimeDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { img?: string };
}) {
  // 仮データ
  const anime = {
    id: 1,
    title: {
      romaji: "Takopi no Genzai",
      english: "Takopi's Original Sin",
      native: "タコピーの原罪",
    },
    coverImage: "/placeholder.jpg",
    description:
      "作品の説明です。作品の説明です。作品の説明です。作品の説明です。作品の説明です。",
    seasonYear: 2022,
    episodes: 12,
    genres: ["Drama", "Psychological"],
  };

  const [logs, setLogs] = useState<EpisodeLog[]>([
    {
      episode: 1,
      rating: 4,
      comment:
        "1話の感想です。1話の感想です。1話の感想です。1話の感想です。1話の感想です。",
      tags: ["ストーリー"],
      date: "2025-07-20",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<number | null>(null);
  const [tempRating, setTempRating] = useState(0);
  const [tempComment, setTempComment] = useState("");
  const [tempTags, setTempTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  const [tagOptions, setTagOptions] = useState([
    "作画",
    "音楽",
    "ストーリー",
    "キャラクター",
    "演出",
  ]);

  // モーダルを開く
  const openModal = (episode: number) => {
    setCurrentEpisode(episode);
    setTempRating(0);
    setTempComment("");
    setTempTags([]);
    setIsModalOpen(true);
  };

  // タグのトグル
  const toggleTag = (tag: string) => {
    setTempTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // カスタムタグ追加
  const addCustomTag = () => {
    const tag = customTag.trim();
    if (tag && !tagOptions.includes(tag)) {
      setTagOptions((prev) => [...prev, tag]);
    }
    if (tag && !tempTags.includes(tag)) {
      setTempTags((prev) => [...prev, tag]);
    }
    setCustomTag("");
  };

  // 保存処理
  const saveLog = () => {
    if (currentEpisode === null) return;
    const newLog: EpisodeLog = {
      episode: currentEpisode,
      rating: tempRating,
      comment: tempComment,
      tags: tempTags,
      date: new Date().toISOString().split("T")[0],
    };
    setLogs((prev) => [...prev, newLog]);
    setIsModalOpen(false);
  };
  console.log(params.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <button className="text-sm text-gray-500">← 戻る</button>
        <h1 className="text-xl font-bold">{anime.title.native}</h1>
        <button className="text-yellow-500">★</button>
      </div>

      {/* 作品情報 */}
      <div className="flex items-start gap-4 mt-4">
        {/* メインビジュアル */}
        <Image
          src={decodeURIComponent(searchParams.img || "")}
          alt={anime.title.english}
          width={200}
          height={280}
          className="rounded-lg w-32 h-auto flex-shrink-0"
        />
        <div>
          <p className="text-gray-600 text-sm">
            {anime.seasonYear}年 / 全{anime.episodes}話
          </p>
          <p className="text-sm space-x-2">
            {anime.genres.map((g) => (
              <span
                key={g}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {g}
              </span>
            ))}
          </p>
          <p className="mt-2 text-gray-800">{anime.description}</p>
        </div>
      </div>

      {/* 視聴ステータス */}
      <div className="mt-4">
        <h2 className="font-bold">視聴ステータス</h2>
        <div className="flex gap-2 mt-2">
          {["未視聴", "視聴中", "視聴完了"].map((status) => (
            <button
              key={status}
              className="border px-3 py-1 rounded-lg hover:bg-gray-100"
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* エピソード一覧 */}
      <div className="mt-6">
        <h2 className="font-bold">エピソード一覧</h2>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {Array.from({ length: anime.episodes }, (_, i) => i + 1).map((ep) => (
            <button
              key={ep}
              onClick={() => openModal(ep)}
              className="border rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
            >
              {ep}話 感想を書く
            </button>
          ))}
        </div>
      </div>

      {/* 自分の感想ログ */}
      <div className="mt-6">
        <h2 className="font-bold">自分の感想ログ</h2>
        <div className="mt-2 space-y-3">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="border p-3 rounded-lg bg-gray-50 text-sm space-y-1"
            >
              <div className="flex justify-between">
                <span>#{log.episode}話</span>
                <span>{log.date}</span>
              </div>
              <p className="text-yellow-500">{"★".repeat(log.rating)}</p>
              <div className="flex gap-1 flex-wrap">
                {log.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p>{log.comment || "（まだコメントがありません）"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">{currentEpisode}話の感想</h3>

            {/* 星評価 */}
            <div className="mb-3">
              <p className="text-sm mb-1">評価：</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setTempRating(star)}
                    className={`text-2xl ${
                      star <= tempRating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* タグ選択 */}
            <div className="mb-3">
              <p className="text-sm mb-1">タグ：</p>
              <div className="flex gap-2 flex-wrap">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-1 rounded-full text-xs border ${
                      tempTags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {/* カスタムタグ入力 */}
              <div className="flex gap-2 mt-2">
                <input
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  placeholder="タグを追加"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={addCustomTag}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  追加
                </button>
              </div>
            </div>

            {/* コメント */}
            <textarea
              value={tempComment}
              onChange={(e) => setTempComment(e.target.value)}
              placeholder="感想を入力してください"
              className="w-full border rounded-lg p-2 text-sm mb-4"
              rows={4}
            />

            {/* ボタン */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                キャンセル
              </button>
              <button
                onClick={saveLog}
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
