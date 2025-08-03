"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const tagData = [
  { name: "泣ける", count: 12 },
  { name: "作画神", count: 9 },
  { name: "鬱展開", count: 7 },
  { name: "日常", count: 5 },
  { name: "家族テーマ", count: 3 },
];

const studioData = [
  { name: "MAPPA", value: 40 },
  { name: "京アニ", value: 20 },
  { name: "A-1 Pictures", value: 15 },
  { name: "その他", value: 25 },
];

const ratingData = [
  { name: "★1", count: 1 },
  { name: "★2", count: 2 },
  { name: "★3", count: 3 },
  { name: "★4", count: 9 },
  { name: "★5", count: 11 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

export default function DashboardPage() {
  const [aiSummary] = useState(
    "あなたは作画重視で感情的に響く作品を高く評価する傾向があります。特に泣けるストーリーや鬱展開のあるドラマ系に強い関心が見られます。"
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">あなたのアニメ視聴傾向</h1>

      {/* ヘッダー情報 */}
      <div className="bg-gray-100 p-4 rounded-md shadow">
        <p>期間: 2024年1月〜2025年8月</p>
        <p>視聴作品数: 45本</p>
        <p>平均評価: ★★★★☆ (4.2)</p>
      </div>

      {/* タグ別レビュー集計 */}
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">よく使ったタグ</h2>
        <BarChart width={500} height={300} data={tagData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      {/* 制作会社別視聴割合 */}
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">制作会社別視聴割合</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={studioData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {studioData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* 評価分布 */}
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">評価分布</h2>
        <BarChart width={500} height={300} data={ratingData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* AIサマリー */}
      <div className="bg-gray-100 p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-4">AIからの分析コメント</h2>
        <p>{aiSummary}</p>
      </div>
    </div>
  );
}
