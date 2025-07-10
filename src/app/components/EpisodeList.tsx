"use client";

import { useState } from "react";
import Link from "next/link";

type Episode = {
  id: number;
  number_text: string;
  title: string;
  aired_at: string | null;
};

export default function EpisodeList({
  episodes,
  animeId,
}: {
  episodes: Episode[];
  animeId: number;
}) {
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const [comment, setComment] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">エピソード一覧</h2>
      <ul className="space-y-4">
        {episodes.map((ep) => (
          <li key={ep.id} className="border-b pb-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {ep.number_text}：{ep.title || "タイトル未設定"}
                </p>
                {ep.aired_at && (
                  <p className="text-sm text-gray-500">放送日: {ep.aired_at}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingEpisode(ep);
                    setComment(""); // ←既存データがある場合はここで読み込み
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ✏
                </button>
                <Link
                  href={`/anime/${animeId}/episodes/${ep.id}`}
                  className="text-sm text-gray-600 hover:underline"
                >
                  🔎
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {editingEpisode && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* オーバーレイ背景（後ろ） */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10" />

          {/* モーダル本体（前） */}
          <div className="relative z-20 bg-white rounded p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold">
              {editingEpisode.number_text}：{editingEpisode.title}
            </h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-32 p-2 border rounded resize-none"
              placeholder="感想を入力してください"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 bg-gray-300 rounded"
                onClick={() => setEditingEpisode(null)}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                onClick={() => {
                  console.log("保存する感想：", comment);
                  setEditingEpisode(null);
                }}
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
