"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ReviewForm {
  comment: string;
}

export default function AnimeDetailPage({
  searchParams,
}: {
  params: { id: string };
  searchParams: { img?: string };
}) {
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    comment: "",
  });

  const router = useRouter();
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

  const handleSubmitReview = async () => {
    if (!reviewForm.comment.trim()) {
      alert("コメントを入力してください");
      return;
    }

    console.log("Review submitted:", reviewForm);

    const userId = "123"; // 仮のユーザーID
    const animeId = anime.id; // 現在のアニメID

    setIsReviewDialogOpen(false);
    setReviewForm({
      comment: "",
    });

    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/signin");
      return;
    }
    const response = await fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewForm.comment.trim()),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "アニメの登録に失敗しました");
    }
  };

  const logs = {
    episode: 1,
    rating: 4,
    comment:
      "1話の感想です。1話の感想です。1話の感想です。1話の感想です。1話の感想です。",
    tags: ["ストーリー"],
    date: "2025-07-20",
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{anime.title.native}</h1>
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
          <p className="text-sm space-x-2"></p>
          <p className="mt-2 text-gray-800">{anime.description}</p>
        </div>
      </div>

      {/* 自分の感想ログ */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">自分の感想ログ</h2>
          <button
            className="mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setIsReviewDialogOpen(true)}
          >
            レビューを書く
          </button>
        </div>
        <div className="mt-2 space-y-3">
          <div className="border p-3 rounded-lg bg-gray-50 text-sm space-y-1">
            <div className="flex justify-between">
              <span>{logs.date}</span>
            </div>
            <p>{logs.comment || "（まだコメントがありません）"}</p>
          </div>
        </div>
      </div>

      {/* レビューダイアログ */}
      {isReviewDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">レビューを書く</h3>
                <button
                  onClick={() => setIsReviewDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* コメント */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    コメント
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                    placeholder="感想を書いてください..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                  />
                </div>
              </div>

              {/* ボタン */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsReviewDialogOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  投稿する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
