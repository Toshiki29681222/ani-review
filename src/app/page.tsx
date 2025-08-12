import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">AniReview</h1>
            <nav className="flex gap-6">
              <Link
                href="/anime/list"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                アニメ一覧
              </Link>
              <Link
                href="/admin/anime"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                管理画面
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">AniReview</h2>
            <p className="text-2xl text-blue-600 font-medium mb-6">
              アニメレビュー & 管理システム
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              あなたの好きなアニメについてレビューを投稿したり、他の人の感想を読んだり、
              アニメデータを効率的に管理できるプラットフォームです
            </p>
          </div>

          {/* CTA ボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/anime/list"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              📱 アニメ一覧を見る
            </Link>
            <Link
              href="/admin/anime"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
            >
              ⚙️ アニメを管理する
            </Link>
          </div>
        </div>

        {/* アプリの特徴セクション */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
            AniReviewの特徴
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📋</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                アニメ管理
              </h4>
              <p className="text-gray-600 leading-relaxed">
                アニメデータベースを効率的に管理。新しい作品の追加、既存作品の編集、
                不要な作品の削除が簡単に行えます
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                レビュー機能
              </h4>
              <p className="text-gray-600 leading-relaxed">
                アニメを見た感想やレビューを投稿。評価やコメントを通じて
                他のユーザーと作品について語り合えます
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                検索機能
              </h4>
              <p className="text-gray-600 leading-relaxed">
                豊富なアニメデータから、タイトルやキーワードで素早く検索。
                お気に入りの作品を簡単に見つけられます
              </p>
            </div>
          </div>
        </div>

        {/* 使い方セクション */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-10 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-10">
            使い方
          </h3>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  アニメを探す
                </h4>
                <p className="text-gray-700">
                  アニメ一覧ページから、豊富なデータベースの中からお気に入りの作品を探してみましょう。
                  タイトル検索も可能です。
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  詳細を確認
                </h4>
                <p className="text-gray-700">
                  アニメの詳細ページで作品情報を確認し、他のユーザーのレビューを読んで
                  作品の評価を確認できます。
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  レビューを投稿
                </h4>
                <p className="text-gray-700">
                  作品を視聴後、あなたの感想や評価を投稿してコミュニティに貢献しましょう。
                  他のユーザーとの交流も楽しめます。
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                🔧
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  データ管理（管理者）
                </h4>
                <p className="text-gray-700">
                  管理画面から新しいアニメの追加、既存データの編集、不要なデータの削除など、
                  データベースの管理が効率的に行えます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 統計情報セクション */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-10">現在の状況</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">-</div>
              <div className="text-gray-600 font-medium">登録アニメ数</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">-</div>
              <div className="text-gray-600 font-medium">投稿レビュー数</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">-</div>
              <div className="text-gray-600 font-medium">ユーザー数</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-red-600 mb-2">★ -</div>
              <div className="text-gray-600 font-medium">平均評価</div>
            </div>
          </div>
        </div>

        {/* CTA セクション */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">今すぐ始めよう！</h3>
          <p className="text-xl mb-8 opacity-90">
            AniReviewでアニメライフをもっと楽しく、もっと便利に
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/anime/list"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              アニメ一覧を見る
            </Link>
            <Link
              href="/admin/anime"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              管理を始める
            </Link>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-blue-600 mb-4">AniReview</h4>
            <p className="text-gray-600 mb-6">アニメレビュー & 管理システム</p>
            <div className="flex justify-center gap-8 mb-6">
              <Link
                href="/anime/list"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                アニメ一覧
              </Link>
              <Link
                href="/admin/anime"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                管理画面
              </Link>
            </div>
            <div className="border-t pt-6">
              <p className="text-gray-500">
                &copy; 2025 AniReview.
                すべてのアニメファンのために作られました。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
