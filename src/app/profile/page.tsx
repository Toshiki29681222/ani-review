'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface ReviewStats {
  totalReviews: number
  averageRating: number
  favoriteGenre?: string
  thisMonthReviews: number
  completionRate: number
  totalWatchedAnimes: number
  currentlyWatching: number
  plannedToWatch: number
}

interface GenreStats {
  name: string
  count: number
  percentage: number
}

interface MonthlyStats {
  month: string
  reviews: number
  watchTime: number
}

interface StudioStats {
  name: string
  averageRating: number
  reviewCount: number
  favoriteGenres: string[]
  ratingDistribution: { rating: number; count: number }[]
  popularAnimes: string[]
}

interface RecentReview {
  id: string
  animeId: string
  animeTitle: string
  animeCoverImage: string
  rating: number
  comment: string
  createdAt: string
  tags: string[]
}

interface FavoriteAnime {
  id: string
  title: string
  coverImage: string
  genre: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<ReviewStats>({ 
    totalReviews: 0, 
    averageRating: 0, 
    thisMonthReviews: 0, 
    completionRate: 0,
    totalWatchedAnimes: 0,
    currentlyWatching: 0,
    plannedToWatch: 0
  })
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([])
  const [favoriteAnimes, setFavoriteAnimes] = useState<FavoriteAnime[]>([])
  const [genreStats, setGenreStats] = useState<GenreStats[]>([])
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])
  const [studioStats, setStudioStats] = useState<StudioStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      try {
        // ローカルストレージから認証情報を確認
        const token = localStorage.getItem('authToken')
        const storedUser = localStorage.getItem('user')

        if (!token || !storedUser) {
          // 認証情報がない場合はログイン画面にリダイレクト
          router.push('/auth/signin')
          return
        }

        // ローカルストレージからユーザー情報を復元
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)

        // プロフィール情報を取得（ダミーデータ）
        setTimeout(() => {
        
        setStats({
          totalReviews: 24,
          averageRating: 4.3,
          favoriteGenre: 'アクション',
          thisMonthReviews: 8,
          completionRate: 85,
          totalWatchedAnimes: 45,
          currentlyWatching: 6,
          plannedToWatch: 12
        })

        setGenreStats([
          { name: 'アクション', count: 12, percentage: 50 },
          { name: 'コメディ', count: 6, percentage: 25 },
          { name: 'ドラマ', count: 4, percentage: 17 },
          { name: 'SF', count: 2, percentage: 8 }
        ])

        setMonthlyStats([
          { month: '10月', reviews: 3, watchTime: 15 },
          { month: '11月', reviews: 5, watchTime: 25 },
          { month: '12月', reviews: 8, watchTime: 40 },
          { month: '1月', reviews: 8, watchTime: 35 }
        ])

        setStudioStats([
          {
            name: 'WIT STUDIO',
            averageRating: 4.6,
            reviewCount: 8,
            favoriteGenres: ['アクション', 'ドラマ'],
            ratingDistribution: [
              { rating: 5, count: 5 },
              { rating: 4, count: 2 },
              { rating: 3, count: 1 },
              { rating: 2, count: 0 },
              { rating: 1, count: 0 }
            ],
            popularAnimes: ['進撃の巨人', 'ヴィンランド・サガ']
          },
          {
            name: 'ufotable',
            averageRating: 4.8,
            reviewCount: 6,
            favoriteGenres: ['アクション', 'ファンタジー'],
            ratingDistribution: [
              { rating: 5, count: 5 },
              { rating: 4, count: 1 },
              { rating: 3, count: 0 },
              { rating: 2, count: 0 },
              { rating: 1, count: 0 }
            ],
            popularAnimes: ['鬼滅の刃', 'Fate/stay night']
          },
          {
            name: 'CloverWorks',
            averageRating: 4.2,
            reviewCount: 5,
            favoriteGenres: ['コメディ', '日常'],
            ratingDistribution: [
              { rating: 5, count: 2 },
              { rating: 4, count: 2 },
              { rating: 3, count: 1 },
              { rating: 2, count: 0 },
              { rating: 1, count: 0 }
            ],
            popularAnimes: ['SPY×FAMILY', 'ぼっち・ざ・ろっく！']
          },
          {
            name: 'BONES',
            averageRating: 4.4,
            reviewCount: 5,
            favoriteGenres: ['アクション', 'SF'],
            ratingDistribution: [
              { rating: 5, count: 2 },
              { rating: 4, count: 3 },
              { rating: 3, count: 0 },
              { rating: 2, count: 0 },
              { rating: 1, count: 0 }
            ],
            popularAnimes: ['僕のヒーローアカデミア', '鋼の錬金術師']
          }
        ])

        setRecentReviews([
          {
            id: 'review-1',
            animeId: 'anime-1',
            animeTitle: '進撃の巨人 The Final Season',
            animeCoverImage: '/api/placeholder/150/200',
            rating: 5,
            comment: '最終シーズンは本当に感動的でした。エレンの心境の変化が丁寧に描かれていて、最後まで目が離せませんでした。',
            createdAt: '2025-01-15T10:30:00Z',
            tags: ['感動', 'アクション', '完結']
          },
          {
            id: 'review-2',
            animeId: 'anime-2',
            animeTitle: '鬼滅の刃 刀鍛冶の里編',
            animeCoverImage: '/api/placeholder/150/200',
            rating: 4,
            comment: '戦闘シーンの作画が素晴らしく、キャラクターの成長も感じられる良いエピソードでした。',
            createdAt: '2025-01-10T14:20:00Z',
            tags: ['作画良好', 'バトル']
          },
          {
            id: 'review-3',
            animeId: 'anime-3',
            animeTitle: 'SPY×FAMILY Season 2',
            animeCoverImage: '/api/placeholder/150/200',
            rating: 5,
            comment: 'アーニャの可愛さが癒される！家族の絆が深まる回が特に好きです。',
            createdAt: '2025-01-05T09:15:00Z',
            tags: ['日常系', 'コメディ', '家族']
          }
        ])

        setFavoriteAnimes([
          { id: 'anime-1', title: '進撃の巨人', coverImage: '/api/placeholder/120/160', genre: 'アクション' },
          { id: 'anime-4', title: 'ワンピース', coverImage: '/api/placeholder/120/160', genre: '冒険' },
          { id: 'anime-5', title: 'ナルト', coverImage: '/api/placeholder/120/160', genre: 'バトル' },
          { id: 'anime-6', title: '僕のヒーローアカデミア', coverImage: '/api/placeholder/120/160', genre: 'ヒーロー' },
          { id: 'anime-7', title: 'ジョジョの奇妙な冒険', coverImage: '/api/placeholder/120/160', genre: 'アドベンチャー' },
          { id: 'anime-8', title: 'ドラゴンボール', coverImage: '/api/placeholder/120/160', genre: 'バトル' }
        ])

        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      // 認証エラーの場合もログイン画面にリダイレクト
      router.push('/auth/signin')
    }
  }

  checkAuthAndFetchProfile()
}, [router])

  const handleLogout = () => {
    // ローカルストレージからトークンとユーザー情報を削除
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    // 状態をリセット
    setUser(null)
    setIsAuthenticated(false)
    
    // ログイン画面にリダイレクト
    router.push('/auth/signin')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    )
  }

  if (!user || !isAuthenticated) {
    // 認証チェック中、または未認証の場合
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ログインが必要です
          </h1>
          <Link 
            href="/auth/signin" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            ログインする
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                登録日: {new Date(user.createdAt).toLocaleDateString('ja-JP')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user.name.charAt(0)}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>

        {/* 統計情報（ダッシュボード機能） */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link href="/my-reviews" className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.totalReviews}
            </div>
            <div className="text-sm text-gray-600">総レビュー数</div>
            <div className="text-xs text-blue-600 mt-1">詳細を見る →</div>
          </Link>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">平均評価</div>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-sm ${i < Math.floor(stats.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {stats.thisMonthReviews}
            </div>
            <div className="text-sm text-gray-600">今月のレビュー</div>
            <div className="text-xs text-gray-500 mt-1">先月より +2件</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {stats.completionRate}%
            </div>
            <div className="text-sm text-gray-600">視聴完了率</div>
            <div className="text-xs text-gray-500 mt-1">最後まで視聴した割合</div>
          </div>
        </div>

        {/* 視聴作品統計 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/watched" className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
            <div className="text-3xl font-bold text-indigo-600 mb-1">
              {stats.totalWatchedAnimes}
            </div>
            <div className="text-sm text-gray-600">視聴完了作品</div>
            <div className="text-xs text-indigo-600 mt-1">リストを見る →</div>
          </Link>

          <Link href="/watching" className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
            <div className="text-3xl font-bold text-cyan-600 mb-1">
              {stats.currentlyWatching}
            </div>
            <div className="text-sm text-gray-600">視聴中</div>
            <div className="text-xs text-cyan-600 mt-1">続きを見る →</div>
          </Link>

          <Link href="/plan-to-watch" className="bg-white rounded-lg shadow p-4 text-center hover:bg-gray-50 transition-colors">
            <div className="text-3xl font-bold text-teal-600 mb-1">
              {stats.plannedToWatch}
            </div>
            <div className="text-sm text-gray-600">視聴予定</div>
            <div className="text-xs text-teal-600 mt-1">リストを見る →</div>
          </Link>
        </div>

        {/* 視聴作品詳細統計 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">視聴作品統計</h2>
            <Link href="/library" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ライブラリを見る
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 視聴状況の円グラフ風表示 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">視聴状況の内訳</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-indigo-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">視聴完了</div>
                      <div className="text-sm text-gray-600">最後まで視聴した作品</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{stats.totalWatchedAnimes}</div>
                    <div className="text-xs text-gray-500">
                      {((stats.totalWatchedAnimes / (stats.totalWatchedAnimes + stats.currentlyWatching + stats.plannedToWatch)) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-cyan-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">視聴中</div>
                      <div className="text-sm text-gray-600">現在視聴している作品</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-600">{stats.currentlyWatching}</div>
                    <div className="text-xs text-gray-500">
                      {((stats.currentlyWatching / (stats.totalWatchedAnimes + stats.currentlyWatching + stats.plannedToWatch)) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-teal-600 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-gray-900">視聴予定</div>
                      <div className="text-sm text-gray-600">これから見る予定の作品</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-teal-600">{stats.plannedToWatch}</div>
                    <div className="text-xs text-gray-500">
                      {((stats.plannedToWatch / (stats.totalWatchedAnimes + stats.currentlyWatching + stats.plannedToWatch)) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 視聴進捗と統計 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">視聴進捗</h3>
              <div className="space-y-4">
                {/* 総視聴作品数の進捗バー */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">全体の視聴進捗</span>
                    <span className="text-sm text-gray-600">
                      {stats.totalWatchedAnimes + stats.currentlyWatching + stats.plannedToWatch} 作品
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.totalWatchedAnimes / (stats.totalWatchedAnimes + stats.currentlyWatching + stats.plannedToWatch)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">
                    完了率: {((stats.totalWatchedAnimes / (stats.totalWatchedAnimes + stats.currentlyWatching + stats.plannedToWatch)) * 100).toFixed(1)}%
                  </div>
                </div>

                {/* レビュー執筆率 */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">レビュー執筆率</span>
                    <span className="text-sm text-gray-600">
                      {stats.totalReviews} / {stats.totalWatchedAnimes} 作品
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.totalReviews / stats.totalWatchedAnimes) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {((stats.totalReviews / stats.totalWatchedAnimes) * 100).toFixed(1)}% の作品にレビューを記載
                  </div>
                </div>

                {/* 今月の視聴活動 */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">今月の活動</span>
                    <span className="text-sm text-blue-600 font-medium">アクティブ</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">{stats.thisMonthReviews}</div>
                      <div className="text-xs text-gray-600">レビュー投稿</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {Math.floor(stats.thisMonthReviews * 1.5)}
                      </div>
                      <div className="text-xs text-gray-600">視聴エピソード</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 視聴傾向分析 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">視聴傾向</h2>
            <Link href="/analytics" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              詳細分析を見る
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ジャンル分析 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">好きなジャンル</h3>
              <div className="space-y-3">
                {genreStats.map((genre, index) => (
                  <div key={genre.name} className="flex items-center">
                    <div className="w-16 text-sm font-medium text-gray-700">{genre.name}</div>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            index === 0 ? 'bg-blue-500' : 
                            index === 1 ? 'bg-green-500' : 
                            index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${genre.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-sm text-gray-600 text-right">{genre.count}件</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 月別視聴数 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">月別視聴数</h3>
              <div className="space-y-3">
                {monthlyStats.map((month) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <div className="w-12 text-sm font-medium text-gray-700">{month.month}</div>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-700"
                          style={{ width: `${(month.reviews / Math.max(...monthlyStats.map(m => m.reviews))) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-sm text-gray-600 text-right">
                      {month.reviews}件<span className="text-xs text-gray-500 ml-1">({month.watchTime}h)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 評価分布 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">評価分布</h3>
            <div className="flex items-end justify-center space-x-2 h-32">
              {[1, 2, 3, 4, 5].map((rating) => {
                const count = rating === 5 ? 12 : rating === 4 ? 8 : rating === 3 ? 3 : rating === 2 ? 1 : 0
                const maxCount = 12
                const height = (count / maxCount) * 100
                
                return (
                  <div key={rating} className="flex flex-col items-center">
                    <div 
                      className={`w-8 rounded-t transition-all duration-700 ${
                        rating === 5 ? 'bg-green-500' :
                        rating === 4 ? 'bg-blue-500' :
                        rating === 3 ? 'bg-yellow-500' :
                        rating === 2 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-gray-600 mt-2">★{rating}</div>
                    <div className="text-xs text-gray-500">{count}件</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 制作会社別分析 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">制作会社別レビュー傾向</h2>
            <Link href="/studios" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              詳細分析を見る
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 制作会社別評価ランキング */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">評価ランキング</h3>
              <div className="space-y-4">
                {studioStats.sort((a, b) => b.averageRating - a.averageRating).map((studio, index) => (
                  <div key={studio.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-3 ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{studio.name}</div>
                        <div className="text-xs text-gray-600">{studio.reviewCount}作品をレビュー</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">
                        {studio.averageRating.toFixed(1)}
                      </div>
                      <div className="flex justify-end">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${i < Math.floor(studio.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 制作会社別ジャンル傾向 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">制作会社の得意ジャンル</h3>
              <div className="space-y-4">
                {studioStats.map((studio) => (
                  <div key={studio.name} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-900">{studio.name}</div>
                      <div className="text-sm text-gray-600">
                        平均 {studio.averageRating.toFixed(1)}★
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {studio.favoriteGenres.map((genre, index) => (
                        <span 
                          key={genre}
                          className={`px-2 py-1 text-xs rounded-full ${
                            index === 0 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      代表作: {studio.popularAnimes.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 制作会社別評価分布 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">制作会社別評価分布</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studioStats.map((studio) => (
                <div key={studio.name} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3 text-center">{studio.name}</h4>
                  <div className="flex items-end justify-center space-x-1 h-20 mb-2">
                    {studio.ratingDistribution.map((dist) => {
                      const maxCount = Math.max(...studio.ratingDistribution.map(d => d.count))
                      const height = maxCount > 0 ? (dist.count / maxCount) * 100 : 0
                      
                      return (
                        <div key={dist.rating} className="flex flex-col items-center">
                          <div 
                            className={`w-4 rounded-t transition-all duration-500 ${
                              dist.rating === 5 ? 'bg-green-500' :
                              dist.rating === 4 ? 'bg-blue-500' :
                              dist.rating === 3 ? 'bg-yellow-500' :
                              dist.rating === 2 ? 'bg-orange-500' : 'bg-red-500'
                            } ${height > 0 ? '' : 'opacity-20'}`}
                            style={{ 
                              height: height > 0 ? `${height}%` : '4px'
                            }}
                          />
                          <div className="text-xs text-gray-600 mt-1">★{dist.rating}</div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-center text-xs text-gray-500">
                    平均 {studio.averageRating.toFixed(1)}★ ({studio.reviewCount}件)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* お気に入りアニメ */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">お気に入りアニメ</h2>
            <Link href="/favorites" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              すべて見る ({favoriteAnimes.length}件)
            </Link>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {favoriteAnimes.slice(0, 6).map((anime) => (
              <Link key={anime.id} href={`/anime/${anime.id}`}>
                <div className="group cursor-pointer">
                  <div className="w-full h-24 md:h-32 bg-gray-200 rounded-lg mb-2 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-gray-500">画像</span>
                  </div>
                  <p className="text-xs font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                    {anime.title}
                  </p>
                  <p className="text-xs text-gray-500">{anime.genre}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* レビュー履歴 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">最近のレビュー</h2>
            <Link href="/my-reviews" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              すべて見る
            </Link>
          </div>
          
          <div className="space-y-6">
            {recentReviews.map((review) => (
              <div key={review.id} className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 rounded-r-lg transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <Link href={`/anime/${review.animeId}`} className="flex-1">
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors text-lg">
                      {review.animeTitle}
                    </h3>
                  </Link>
                  <div className="flex items-center ml-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-semibold text-gray-700">{review.rating}.0</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {review.comment}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                    <Link 
                      href={`/anime/${review.animeId}#review-${review.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      詳細を見る
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">アクション</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/anime/search" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center font-medium transition-colors"
            >
              アニメを探す
            </Link>
            <Link 
              href="/reviews/new" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-center font-medium transition-colors"
            >
              レビューを投稿
            </Link>
            <Link 
              href="/profile/edit" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 text-center font-medium transition-colors"
            >
              プロフィール編集
            </Link>
            <button 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium transition-colors"
              onClick={() => alert('設定機能は開発中です')}
            >
              設定
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
