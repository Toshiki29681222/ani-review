"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AnimeFormData {
  title: string;
  titleEnglish: string;
  titleJapanese: string;
  description: string;
  releaseYear: string;
  episodeCount: string;
  duration: string;
  status: "ONGOING" | "COMPLETED" | "UPCOMING" | "CANCELLED";
  genre: string;
  studio: string;
  director: string;
  source: string;
  coverImageUrl: string;
  trailerUrl: string;
  officialSiteUrl: string;
}

export default function AnimeRegisterPage() {
  const [formData, setFormData] = useState<AnimeFormData>({
    title: "",
    titleEnglish: "",
    titleJapanese: "",
    description: "",
    releaseYear: "",
    episodeCount: "",
    duration: "",
    status: "COMPLETED",
    genre: "",
    studio: "",
    director: "",
    source: "",
    coverImageUrl: "",
    trailerUrl: "",
    officialSiteUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // ローカルストレージからトークンを取得
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("ログインが必要です");
        router.push("/auth/signin");
        return;
      }

      // フォームデータの準備（空の値は除外）
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const submitData: any = {
        title: formData.title,
        status: formData.status,
      };

      // オプショナルフィールドの追加
      if (formData.titleEnglish)
        submitData.titleEnglish = formData.titleEnglish;
      if (formData.titleJapanese)
        submitData.titleJapanese = formData.titleJapanese;
      if (formData.description) submitData.description = formData.description;
      if (formData.releaseYear)
        submitData.releaseYear = parseInt(formData.releaseYear);
      if (formData.episodeCount)
        submitData.episodeCount = parseInt(formData.episodeCount);
      if (formData.duration) submitData.duration = parseInt(formData.duration);
      if (formData.genre) submitData.genre = formData.genre;
      if (formData.studio) submitData.studio = formData.studio;
      if (formData.director) submitData.director = formData.director;
      if (formData.source) submitData.source = formData.source;
      if (formData.coverImageUrl)
        submitData.coverImageUrl = formData.coverImageUrl;
      if (formData.trailerUrl) submitData.trailerUrl = formData.trailerUrl;
      if (formData.officialSiteUrl)
        submitData.officialSiteUrl = formData.officialSiteUrl;

      const response = await fetch("/api/anime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "アニメの登録に失敗しました");
      }

      setSuccessMessage("アニメが正常に登録されました！");

      // 3秒後にアニメ一覧ページにリダイレクト
      setTimeout(() => {
        router.push("/anime");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "アニメの登録に失敗しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">アニメ登録</h1>
              <p className="text-gray-600 mt-2">新しいアニメ作品を登録します</p>
            </div>
            <Link
              href="/anime"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              一覧に戻る
            </Link>
          </div>
        </div>

        {/* メッセージ表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        {/* 登録フォーム */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 必須項目 */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                基本情報 <span className="text-red-500">*必須項目</span>
              </h3>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                タイトル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="進撃の巨人"
              />
            </div>

            <div>
              <label
                htmlFor="titleEnglish"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                英語タイトル
              </label>
              <input
                type="text"
                id="titleEnglish"
                name="titleEnglish"
                value={formData.titleEnglish}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Attack on Titan"
              />
            </div>

            <div>
              <label
                htmlFor="titleJapanese"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                日本語タイトル（読み方）
              </label>
              <input
                type="text"
                id="titleJapanese"
                name="titleJapanese"
                value={formData.titleJapanese}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="しんげきのきょじん"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                あらすじ・説明
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="このアニメのあらすじや概要を入力してください..."
              />
            </div>

            {/* 詳細情報 */}
            <div className="md:col-span-2 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                詳細情報
              </h3>
            </div>

            <div>
              <label
                htmlFor="releaseYear"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                公開年
              </label>
              <input
                type="number"
                id="releaseYear"
                name="releaseYear"
                min="1900"
                max={new Date().getFullYear() + 5}
                value={formData.releaseYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="2013"
              />
            </div>

            <div>
              <label
                htmlFor="episodeCount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                エピソード数
              </label>
              <input
                type="number"
                id="episodeCount"
                name="episodeCount"
                min="1"
                value={formData.episodeCount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="25"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                1話の長さ（分）
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                min="1"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="24"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                放送状況
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="COMPLETED">完結</option>
                <option value="ONGOING">放送中</option>
                <option value="UPCOMING">未放送</option>
                <option value="CANCELLED">中止</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ジャンル
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="アクション, ドラマ, ファンタジー"
              />
            </div>

            <div>
              <label
                htmlFor="studio"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                制作会社
              </label>
              <input
                type="text"
                id="studio"
                name="studio"
                value={formData.studio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="WIT STUDIO"
              />
            </div>

            <div>
              <label
                htmlFor="director"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                監督
              </label>
              <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="荒木哲郎"
              />
            </div>

            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                原作
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="漫画, 小説, オリジナル"
              />
            </div>

            {/* リンク情報 */}
            <div className="md:col-span-2 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                リンク・画像
              </h3>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="coverImageUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                カバー画像URL
              </label>
              <input
                type="url"
                id="coverImageUrl"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div>
              <label
                htmlFor="trailerUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                トレーラーURL
              </label>
              <input
                type="url"
                id="trailerUrl"
                name="trailerUrl"
                value={formData.trailerUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label
                htmlFor="officialSiteUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                公式サイトURL
              </label>
              <input
                type="url"
                id="officialSiteUrl"
                name="officialSiteUrl"
                value={formData.officialSiteUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://official-site.com"
              />
            </div>
          </div>

          {/* 送信ボタン */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/anime"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              disabled={isLoading || !formData.title}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "登録中..." : "アニメを登録"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
