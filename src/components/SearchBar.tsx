"use client";

type Props = {
  onSearch?: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">アニメ検索</h1>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <input
          type="text"
          placeholder="アニメタイトル・スタッフ名で検索"
          className="flex-1 h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <button className="h-10 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition">
          AIにおすすめを聞く
        </button>
      </div>
    </section>
  );
}
