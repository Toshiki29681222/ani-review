export default function Filter() {
  return (
    <div className="min-w-[200px] space-y-6 sticky top-6 h-fit">
      {/* フィルター */}
      {[
        ["年代で絞り込む", ["1980年代", "1990年代", "2000年代"]],
        ["ジャンルで絞り込む", ["バトル", "ラブコメ", "SF"]],
        ["放送形態で絞り込む", ["TVアニメ", "劇場版", "OVA"]],
        ["制作会社で絞り込む", ["京都アニメーション", "ボンズ", "動画工房"]],
        ["アニメーターで絞り込む", ["井上俊之", "中村豊", "吉成曜"]],
        ["声優で絞り込む", ["杉田智和", "釘宮理恵", "小林ゆう"]],
      ].map(([title, items]) => (
        <div key={title.toString()}>
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            {title}
          </h2>
          <hr className="border-gray-300 mb-2" />
          <div className="space-y-2">
            {(items as string[]).map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
