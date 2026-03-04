import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(renderLP())
})

function renderLP(): string {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MedPath｜医学部受験メンタリング</title>
  <meta name="description" content="志望校から逆算して、毎週「やること・順番・量」を設計。現役医学生が伴走するオンラインメンタリング。">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Noto Sans JP', 'sans-serif']
          },
          colors: {
            brand: {
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              300: '#93c5fd',
              400: '#60a5fa',
              500: '#2563eb',
              600: '#1d4ed8',
              700: '#1e40af',
              800: '#1e3a8a',
              900: '#172554'
            },
            accent: {
              400: '#34d399',
              500: '#10b981',
              600: '#059669'
            }
          }
        }
      }
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
    body { font-family: 'Noto Sans JP', sans-serif; }
    
    /* Animations */
    .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    .fade-in { opacity: 0; transition: opacity 0.6s ease; }
    .fade-in.visible { opacity: 1; }

    /* Hero gradient */
    .hero-gradient {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #3b82f6 70%, #60a5fa 100%);
    }

    /* Badge pulse */
    .badge-pulse { animation: pulse-soft 2.5s ease-in-out infinite; }
    @keyframes pulse-soft {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }

    /* Card hover */
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }

    /* Plan recommended */
    .plan-recommended { border: 3px solid #2563eb; position: relative; }
    .plan-recommended::before {
      content: 'おすすめ';
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: #2563eb; color: #fff; font-size: 0.75rem; font-weight: 700;
      padding: 2px 16px; border-radius: 9999px;
    }

    /* FAQ accordion */
    .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
    .faq-answer.open { max-height: 400px; padding-top: 12px; padding-bottom: 4px; }
    .faq-icon { transition: transform 0.3s ease; }
    .faq-icon.rotated { transform: rotate(45deg); }

    /* Carousel */
    .carousel-track { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
    .carousel-track::-webkit-scrollbar { display: none; }
    .carousel-card { scroll-snap-align: start; flex: 0 0 300px; }

    /* Tag scroller */
    .tag-scroller { display: flex; gap: 0.75rem; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 4px; }
    .tag-scroller::-webkit-scrollbar { display: none; }

    /* Timeline */
    .timeline-line { position: absolute; left: 24px; top: 0; bottom: 0; width: 2px; background: #dbeafe; }
    @media (min-width: 768px) {
      .timeline-line { left: 50%; transform: translateX(-50%); }
    }

    /* Mobile sticky CTA */
    .mobile-sticky-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; padding: 10px 16px; background: #fff; border-top: 1px solid #e5e7eb; box-shadow: 0 -4px 20px rgba(0,0,0,0.08); }
    @media (min-width: 768px) { .mobile-sticky-cta { display: none; } }

    /* Before/After arrow */
    .arrow-bounce { animation: bounce-right 1.5s ease-in-out infinite; }
    @keyframes bounce-right {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(8px); }
    }

    /* Map illustration */
    .map-dot { animation: dot-pulse 2s ease-in-out infinite; }
    @keyframes dot-pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.4); }
    }

    /* Section divider */
    .section-divider {
      height: 4px;
      background: linear-gradient(90deg, transparent 0%, #2563eb 50%, transparent 100%);
      opacity: 0.15;
    }

    /* Smooth header */
    .header-scrolled { background: rgba(255,255,255,0.97); box-shadow: 0 2px 20px rgba(0,0,0,0.08); }

    /* Number counter */
    .counter { display: inline-block; }
  </style>
</head>
<body class="bg-white text-gray-800 antialiased">

<!-- ==================== HEADER ==================== -->
<header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-20">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
        <svg class="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" fill="white" fill-opacity="0.2"/>
          <path d="M16 6L20 14H12L16 6Z" fill="white"/>
          <path d="M10 16L16 26L22 16H10Z" fill="white" fill-opacity="0.8"/>
        </svg>
        MedPath
      </a>

      <!-- Nav (Desktop) -->
      <nav class="hidden lg:flex items-center gap-6 text-sm font-medium">
        <a href="#worries" class="text-white/80 hover:text-white transition">悩み</a>
        <a href="#how" class="text-white/80 hover:text-white transition">仕組み</a>
        <a href="#matching" class="text-white/80 hover:text-white transition">志望校マッチ</a>
        <a href="#method" class="text-white/80 hover:text-white transition">メソッド</a>
        <a href="#plans" class="text-white/80 hover:text-white transition">プラン</a>
        <a href="#voices" class="text-white/80 hover:text-white transition">体験</a>
        <a href="#faq" class="text-white/80 hover:text-white transition">FAQ</a>
      </nav>

      <!-- CTA (Desktop) -->
      <div class="hidden md:flex items-center gap-3">
        <a href="#final-cta" class="text-sm text-white/80 hover:text-white border border-white/30 hover:border-white/60 rounded-full px-4 py-2 transition">
          資料を見る<span class="text-xs ml-1 opacity-70">30秒</span>
        </a>
        <a href="#final-cta" class="text-sm bg-white text-brand-700 font-bold rounded-full px-5 py-2.5 hover:bg-blue-50 transition shadow-lg shadow-blue-900/20">
          無料相談<span class="text-xs ml-1 font-normal">15分</span>
        </a>
      </div>

      <!-- Mobile menu button -->
      <button id="mobile-menu-btn" class="md:hidden text-white p-2" aria-label="メニュー">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
  </div>

  <!-- Mobile nav dropdown -->
  <div id="mobile-nav" class="hidden md:hidden bg-white shadow-xl rounded-b-2xl mx-4 mb-2">
    <div class="py-4 px-6 flex flex-col gap-3 text-sm font-medium text-gray-700">
      <a href="#worries" class="py-2 hover:text-brand-600 transition mobile-nav-link">悩み</a>
      <a href="#how" class="py-2 hover:text-brand-600 transition mobile-nav-link">仕組み</a>
      <a href="#matching" class="py-2 hover:text-brand-600 transition mobile-nav-link">志望校マッチ</a>
      <a href="#method" class="py-2 hover:text-brand-600 transition mobile-nav-link">メソッド</a>
      <a href="#plans" class="py-2 hover:text-brand-600 transition mobile-nav-link">プラン</a>
      <a href="#voices" class="py-2 hover:text-brand-600 transition mobile-nav-link">体験</a>
      <a href="#faq" class="py-2 hover:text-brand-600 transition mobile-nav-link">FAQ</a>
    </div>
  </div>
</header>


<!-- ==================== 01. HERO (FV) ==================== -->
<section class="hero-gradient relative overflow-hidden min-h-[90vh] md:min-h-[85vh] flex items-center pt-20">
  <!-- Background decoration -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 left-1/3 w-2 h-2 bg-white/30 rounded-full map-dot"></div>
    <div class="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full map-dot" style="animation-delay:0.5s"></div>
    <div class="absolute bottom-1/3 left-1/4 w-2 h-2 bg-white/25 rounded-full map-dot" style="animation-delay:1s"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mb-6 fade-up">
      <span class="bg-white/15 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
        医学部受験生向け
      </span>
      <span class="bg-white/15 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
        保護者の方もOK
      </span>
      <span class="bg-white/15 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
        <i class="fas fa-wifi mr-1"></i>オンライン
      </span>
    </div>

    <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <!-- Left: Text -->
      <div class="fade-up">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
          医学部受験は<br>「授業」より、<br class="sm:hidden"><span class="text-yellow-300">勝てる勉強法</span>で決まる。
        </h1>
        <p class="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
          志望校から逆算して、毎週「やること・順番・量」を設計。<br class="hidden sm:block">現役医学生が伴走するオンラインメンタリング。
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <a href="#final-cta" class="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-yellow-400/30 transition-all hover:shadow-xl hover:shadow-yellow-400/40 hover:-translate-y-0.5">
            <i class="fas fa-calendar-check mr-2"></i>
            無料相談（15分）
          </a>
          <a href="#final-cta" class="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-medium text-base px-8 py-4 rounded-xl border border-white/30 transition-all">
            <i class="fas fa-file-alt mr-2"></i>
            資料を見る<span class="text-sm ml-1 opacity-70">30秒</span>
          </a>
        </div>

        <!-- Sub links -->
        <div class="flex gap-4 text-sm text-white/60">
          <a href="#final-cta" class="hover:text-white/90 transition underline underline-offset-4">受験生の方</a>
          <a href="#final-cta" class="hover:text-white/90 transition underline underline-offset-4">保護者の方</a>
          <a href="#final-cta" class="hover:text-white/90 transition underline underline-offset-4">推薦対策の方</a>
        </div>
      </div>

      <!-- Right: Visual -->
      <div class="fade-up hidden md:block" style="transition-delay:0.2s">
        <div class="relative">
          <!-- Main illustration card -->
          <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div class="bg-white rounded-2xl p-6 shadow-lg">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-user-md text-brand-600 text-xl"></i>
                </div>
                <div>
                  <p class="font-bold text-gray-800 text-sm">医学生メンター</p>
                  <p class="text-xs text-gray-500">○○大学医学部 4年</p>
                </div>
                <div class="ml-auto flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  面談中
                </div>
              </div>
              <div class="space-y-2">
                <div class="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                  <p class="font-medium text-brand-700 mb-1">📋 今週の計画</p>
                  <p>数学：青チャート 数III微積 §4-6</p>
                  <p>英語：長文読解 1日1題 + 復習</p>
                  <p>化学：有機反応 まとめノート作成</p>
                </div>
                <div class="bg-blue-50 rounded-lg p-3 text-sm text-brand-700">
                  <i class="fas fa-lightbulb mr-1 text-yellow-500"></i>
                  先週の計算ミス → 検算チェックリストを導入
                </div>
              </div>
            </div>
          </div>
          <!-- Floating badges -->
          <div class="absolute -top-4 -right-4 bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg badge-pulse">
            <i class="fas fa-check mr-1"></i>毎週更新
          </div>
          <div class="absolute -bottom-3 -left-3 bg-white text-brand-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border badge-pulse" style="animation-delay:1s">
            <i class="fas fa-video mr-1"></i>Zoom面談
          </div>
        </div>
      </div>
    </div>

    <!-- Badge row -->
    <div class="grid grid-cols-3 gap-4 mt-12 md:mt-16 fade-up" style="transition-delay:0.4s">
      <div class="text-center bg-white/10 backdrop-blur rounded-xl py-4 px-3 border border-white/15">
        <div class="text-2xl sm:text-3xl font-black text-white mb-1">
          <i class="fas fa-university text-lg sm:text-xl text-yellow-300 mr-1"></i>
          <span class="counter" data-target="30">30</span><span class="text-lg text-white/80">校+</span>
        </div>
        <p class="text-xs sm:text-sm text-white/70">所属メンター大学数</p>
      </div>
      <div class="text-center bg-white/10 backdrop-blur rounded-xl py-4 px-3 border border-white/15">
        <div class="text-2xl sm:text-3xl font-black text-white mb-1">
          <i class="fas fa-users text-lg sm:text-xl text-yellow-300 mr-1"></i>
          <span class="counter" data-target="120">120</span><span class="text-lg text-white/80">名+</span>
        </div>
        <p class="text-xs sm:text-sm text-white/70">登録医学生メンター</p>
      </div>
      <div class="text-center bg-white/10 backdrop-blur rounded-xl py-4 px-3 border border-white/15">
        <div class="text-2xl sm:text-3xl font-black text-white mb-1">
          <i class="fas fa-comments text-lg sm:text-xl text-yellow-300 mr-1"></i>
          <span class="counter" data-target="500">500</span><span class="text-lg text-white/80">件+</span>
        </div>
        <p class="text-xs sm:text-sm text-white/70">累計相談数</p>
      </div>
    </div>
  </div>
</section>


<!-- ==================== 02. SOCIAL PROOF ==================== -->
<section class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-4 fade-up">
      数字でわかる<span class="text-brand-600">MedPath</span>
    </h2>
    <p class="text-center text-gray-500 mb-12 fade-up">安心して始められる理由</p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition fade-up card-hover">
        <div class="w-14 h-14 mx-auto mb-4 bg-brand-50 rounded-2xl flex items-center justify-center">
          <i class="fas fa-shield-alt text-2xl text-brand-600"></i>
        </div>
        <p class="font-bold text-gray-900 text-sm mb-1">志望校メンター</p>
        <p class="text-xs text-gray-500">優先アサイン制度</p>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition fade-up card-hover" style="transition-delay:0.1s">
        <div class="w-14 h-14 mx-auto mb-4 bg-accent-500/10 rounded-2xl flex items-center justify-center">
          <i class="fas fa-user-graduate text-2xl text-accent-600"></i>
        </div>
        <p class="font-bold text-gray-900 text-sm mb-1">メンターは全員</p>
        <p class="text-xs text-gray-500">現役医学生</p>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition fade-up card-hover" style="transition-delay:0.2s">
        <div class="w-14 h-14 mx-auto mb-4 bg-purple-50 rounded-2xl flex items-center justify-center">
          <i class="fas fa-mobile-alt text-2xl text-purple-600"></i>
        </div>
        <p class="font-bold text-gray-900 text-sm mb-1">面談はZoom</p>
        <p class="text-xs text-gray-500">スマホOK</p>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition fade-up card-hover" style="transition-delay:0.3s">
        <div class="w-14 h-14 mx-auto mb-4 bg-orange-50 rounded-2xl flex items-center justify-center">
          <i class="fas fa-clipboard-check text-2xl text-orange-500"></i>
        </div>
        <p class="font-bold text-gray-900 text-sm mb-1">学習設計テンプレ</p>
        <p class="text-xs text-gray-500">完備（毎週更新）</p>
      </div>
    </div>

    <p class="text-center text-xs text-gray-400 mt-8 fade-up">※在籍状況は時期により変動します。志望校メンターは"優先アサイン"です。</p>
  </div>
</section>


<!-- ==================== 03. WORRIES ==================== -->
<section id="worries" class="py-16 md:py-24 bg-white">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
      <!-- Left -->
      <div class="md:col-span-2 fade-up">
        <div class="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
          <i class="fas fa-exclamation-circle mr-1"></i>こんなお悩みありませんか？
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
          医学部受験、<br>こうなっていませんか？
        </h2>
        <p class="text-gray-500 text-sm leading-relaxed">
          多くの受験生が抱える悩みには共通点があります。あなただけではありません。
        </p>
      </div>

      <!-- Right: Worry cards -->
      <div class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 fade-up card-hover">
          <div class="text-red-400 mb-3"><i class="fas fa-compass text-xl"></i></div>
          <p class="font-bold text-gray-800 text-sm mb-1">何を信じて何を捨てるか決められない</p>
          <p class="text-xs text-gray-500">情報過多で方針が定まらない</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 fade-up card-hover" style="transition-delay:0.05s">
          <div class="text-orange-400 mb-3"><i class="fas fa-calendar-times text-xl"></i></div>
          <p class="font-bold text-gray-800 text-sm mb-1">計画を立てても続かない</p>
          <p class="text-xs text-gray-500">崩れたら終わる感覚</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 fade-up card-hover" style="transition-delay:0.1s">
          <div class="text-yellow-500 mb-3"><i class="fas fa-books text-xl"></i></div>
          <p class="font-bold text-gray-800 text-sm mb-1">教材が増えるほど不安が増える</p>
          <p class="text-xs text-gray-500">何をやれば正解かわからない</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 fade-up card-hover" style="transition-delay:0.15s">
          <div class="text-blue-400 mb-3"><i class="fas fa-chart-line text-xl"></i></div>
          <p class="font-bold text-gray-800 text-sm mb-1">模試の復習が形だけで伸びない</p>
          <p class="text-xs text-gray-500">やった気になるだけ</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 fade-up card-hover" style="transition-delay:0.2s">
          <div class="text-purple-400 mb-3"><i class="fas fa-redo text-xl"></i></div>
          <p class="font-bold text-gray-800 text-sm mb-1">"ケアレス"で片付けて同じミスを繰り返す</p>
          <p class="text-xs text-gray-500">原因の分類ができていない</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-5 border border-gray-100 fade-up card-hover" style="transition-delay:0.25s">
          <div class="text-green-500 mb-3"><i class="fas fa-map-signs text-xl"></i></div>
          <p class="font-bold text-gray-800 text-sm mb-1">志望校の情報がなく、戦い方が曖昧</p>
          <p class="text-xs text-gray-500">大学ごとの傾向が掴めない</p>
        </div>
      </div>
    </div>

    <div class="mt-10 text-center fade-up">
      <p class="text-sm text-gray-600 bg-brand-50 inline-block px-6 py-3 rounded-full">
        <i class="fas fa-arrow-down mr-2 text-brand-500"></i>
        このLPは「勉強を教える」ではなく<span class="font-bold text-brand-700">「勝てるやり方を固定する」</span>サービスの話です。
      </p>
    </div>
  </div>
</section>

<!-- CTA band -->
<div class="bg-brand-600 py-6">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-bold text-sm sm:text-base">まずは15分の無料相談で、あなたの状況を整理しませんか？</p>
    <a href="#final-cta" class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-6 py-3 rounded-full transition shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>


<!-- ==================== 04. BEFORE/AFTER ==================== -->
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-4 fade-up">
      授業より先に、<span class="text-brand-600">勝ち筋</span>を固定します
    </h2>
    <p class="text-center text-gray-500 text-sm mb-12 fade-up">問題は「やり方」を知らないこと</p>

    <div class="grid md:grid-cols-11 gap-6 items-center">
      <!-- Before -->
      <div class="md:col-span-5 bg-red-50 rounded-2xl p-8 fade-up">
        <div class="text-red-500 font-black text-sm mb-4 flex items-center">
          <i class="fas fa-times-circle mr-2"></i>BEFORE
        </div>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <i class="fas fa-times text-red-400 mt-1 flex-shrink-0"></i>
            <p class="text-gray-700 text-sm">今日は何をやるか<span class="font-bold">毎朝迷う</span></p>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-times text-red-400 mt-1 flex-shrink-0"></i>
            <p class="text-gray-700 text-sm">復習しても<span class="font-bold">伸びている実感がない</span></p>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-times text-red-400 mt-1 flex-shrink-0"></i>
            <p class="text-gray-700 text-sm">ミスを繰り返し、<span class="font-bold">対策が曖昧</span></p>
          </li>
        </ul>
      </div>

      <!-- Arrow -->
      <div class="md:col-span-1 flex justify-center items-center">
        <div class="arrow-bounce text-brand-500">
          <i class="fas fa-arrow-right text-3xl hidden md:block"></i>
          <i class="fas fa-arrow-down text-3xl md:hidden"></i>
        </div>
      </div>

      <!-- After -->
      <div class="md:col-span-5 bg-brand-50 rounded-2xl p-8 border-2 border-brand-200 fade-up" style="transition-delay:0.15s">
        <div class="text-brand-600 font-black text-sm mb-4 flex items-center">
          <i class="fas fa-check-circle mr-2"></i>AFTER
        </div>
        <ul class="space-y-4">
          <li class="flex items-start gap-3">
            <i class="fas fa-check text-brand-500 mt-1 flex-shrink-0"></i>
            <p class="text-gray-700 text-sm">毎週、<span class="font-bold text-brand-700">やることが決まっている</span></p>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-check text-brand-500 mt-1 flex-shrink-0"></i>
            <p class="text-gray-700 text-sm">ミスの原因が分類され、<span class="font-bold text-brand-700">対策が固定される</span></p>
          </li>
          <li class="flex items-start gap-3">
            <i class="fas fa-check text-brand-500 mt-1 flex-shrink-0"></i>
            <p class="text-gray-700 text-sm">志望校に向けた<span class="font-bold text-brand-700">最短ルートが見える</span></p>
          </li>
        </ul>
      </div>
    </div>

    <div class="text-center mt-10 fade-up">
      <a href="#final-cta" class="inline-flex items-center bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-8 py-4 rounded-xl transition shadow-lg shadow-brand-600/30">
        <i class="fas fa-calendar-check mr-2"></i>
        無料相談で「今週の勝ち筋」を持ち帰る
      </a>
    </div>
  </div>
</section>


<!-- ==================== 05. HOW IT WORKS (3 PILLARS) ==================== -->
<section id="how" class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-14 fade-up">
      <div class="inline-block bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
        WHY IT WORKS
      </div>
      <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
        伸びる理由は「やり方」が<br class="sm:hidden"><span class="text-brand-600">仕組み化</span>されているから
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-6 md:gap-8">
      <!-- Pillar 01 -->
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition fade-up card-hover">
        <div class="text-brand-600 font-black text-4xl mb-4 opacity-20">01</div>
        <div class="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
          <i class="fas fa-route text-brand-600 text-xl"></i>
        </div>
        <h3 class="font-bold text-lg text-gray-900 mb-2">逆算設計</h3>
        <p class="text-sm text-gray-600 mb-4">志望校から最短ルートを作る</p>
        <ul class="space-y-2">
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>科目配分
          </li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>教材選定
          </li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>週次計画
          </li>
        </ul>
      </div>

      <!-- Pillar 02 -->
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition fade-up card-hover" style="transition-delay:0.1s">
        <div class="text-brand-600 font-black text-4xl mb-4 opacity-20">02</div>
        <div class="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center mb-4">
          <i class="fas fa-gem text-accent-600 text-xl"></i>
        </div>
        <h3 class="font-bold text-lg text-gray-900 mb-2">質の担保</h3>
        <p class="text-sm text-gray-600 mb-4">ムダを切り、伸びる勉強だけ残す</p>
        <ul class="space-y-2">
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>理解→演習→復習の設計
          </li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>復習の型
          </li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>ミスの分類と対策
          </li>
        </ul>
      </div>

      <!-- Pillar 03 -->
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition fade-up card-hover" style="transition-delay:0.2s">
        <div class="text-brand-600 font-black text-4xl mb-4 opacity-20">03</div>
        <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
          <i class="fas fa-sync-alt text-purple-600 text-xl"></i>
        </div>
        <h3 class="font-bold text-lg text-gray-900 mb-2">継続の設計</h3>
        <p class="text-sm text-gray-600 mb-4">崩れた週を"即修正"する</p>
        <ul class="space-y-2">
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>週次面談
          </li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>日次チェック（プランによる）
          </li>
          <li class="flex items-center gap-2 text-sm text-gray-600">
            <i class="fas fa-check-circle text-accent-500 text-xs"></i>即時修正サイクル
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- CTA band -->
<div class="bg-brand-700 py-6">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-bold text-sm sm:text-base">仕組みを体験してみませんか？</p>
    <a href="#final-cta" class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-6 py-3 rounded-full transition shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>


<!-- ==================== 06. MENTOR MATCHING ==================== -->
<section id="matching" class="py-16 md:py-24 bg-white">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <!-- Left: Text -->
      <div class="fade-up">
        <div class="inline-block bg-accent-500/10 text-accent-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
          <i class="fas fa-star mr-1"></i>MedPathの核
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
          目標の大学の<br>"現役学生"から、<br><span class="text-brand-600">受験と大学生活のリアル</span>が聞ける
        </h2>
        <p class="text-gray-600 text-sm leading-relaxed mb-8">
          志望校の戦い方／併願の考え方／生活・学びの実態まで、経験ベースで伴走。教科書には書いていない"実体験"を聞くことで、戦略の解像度が上がります。
        </p>

        <!-- 3 Steps -->
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
            <div>
              <p class="font-bold text-gray-900 text-sm">志望校・現状・制約をヒアリング</p>
              <p class="text-xs text-gray-500 mt-0.5">あなたの状況を丁寧に確認します</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
            <div>
              <p class="font-bold text-gray-900 text-sm">志望校メンターを優先アサイン</p>
              <p class="text-xs text-gray-500 mt-0.5">可能な範囲で最適なメンターをマッチ</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
            <div>
              <p class="font-bold text-gray-900 text-sm">毎週、勝ち筋を更新</p>
              <p class="text-xs text-gray-500 mt-0.5">面談で計画を修正し続けます</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Map visual -->
      <div class="fade-up" style="transition-delay:0.2s">
        <div class="relative bg-gradient-to-br from-brand-50 to-blue-50 rounded-3xl p-8 md:p-10 border border-brand-100">
          <!-- Japan map stylized -->
          <svg viewBox="0 0 400 400" class="w-full max-w-sm mx-auto" fill="none">
            <!-- Simplified Japan outline -->
            <path d="M280 60 L300 80 L310 120 L290 160 L300 200 L280 260 L260 300 L240 320 L220 340 L200 350 L180 340 L160 310 L150 280 L140 240 L150 200 L140 160 L150 120 L170 90 L200 70 L240 60 Z" 
                  fill="#dbeafe" stroke="#93c5fd" stroke-width="2"/>
            <!-- Kanto highlight -->
            <ellipse cx="260" cy="210" rx="40" ry="35" fill="#2563eb" fill-opacity="0.15" stroke="#2563eb" stroke-width="2" stroke-dasharray="4"/>
            <text x="260" y="215" text-anchor="middle" fill="#1e40af" font-size="11" font-weight="bold">関東</text>
            
            <!-- Dots for universities -->
            <circle cx="270" cy="195" r="4" fill="#2563eb" class="map-dot"/>
            <circle cx="250" cy="205" r="3.5" fill="#2563eb" class="map-dot" style="animation-delay:0.3s"/>
            <circle cx="275" cy="220" r="3" fill="#2563eb" class="map-dot" style="animation-delay:0.6s"/>
            <circle cx="255" cy="225" r="3.5" fill="#2563eb" class="map-dot" style="animation-delay:0.9s"/>
            
            <!-- Other regions -->
            <circle cx="180" cy="250" r="3" fill="#60a5fa" class="map-dot" style="animation-delay:0.4s"/>
            <circle cx="200" cy="180" r="3" fill="#60a5fa" class="map-dot" style="animation-delay:0.7s"/>
            <circle cx="170" cy="300" r="3" fill="#60a5fa" class="map-dot" style="animation-delay:1s"/>
            <circle cx="220" cy="150" r="3" fill="#60a5fa" class="map-dot" style="animation-delay:0.2s"/>
            <circle cx="160" cy="200" r="3" fill="#60a5fa" class="map-dot" style="animation-delay:0.8s"/>
          </svg>

          <!-- Legend -->
          <div class="flex justify-center gap-6 mt-4">
            <div class="flex items-center gap-2 text-xs text-gray-600">
              <span class="w-3 h-3 bg-brand-600 rounded-full"></span>
              関東エリア中心
            </div>
            <div class="flex items-center gap-2 text-xs text-gray-600">
              <span class="w-3 h-3 bg-blue-400 rounded-full"></span>
              全国対応
            </div>
          </div>

          <!-- Floating cards -->
          <div class="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 shadow-md text-xs font-medium text-gray-700">
            <i class="fas fa-university text-brand-600 mr-1"></i>30校+
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ==================== 07. METHOD (S1-S6) ==================== -->
<section id="method" class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-14 fade-up">
      <div class="inline-block bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
        6-STEP METHOD
      </div>
      <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
        勉強法は、<span class="text-brand-600">フェーズ</span>で変わる。<br>だから迷走しない。
      </h2>
    </div>

    <div class="relative">
      <!-- Timeline items -->
      <div class="space-y-6">
        <div class="flex items-start gap-4 md:gap-6 fade-up">
          <div class="flex-shrink-0 w-14 h-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-brand-600/30">S1</div>
          <div class="bg-white rounded-xl p-5 flex-1 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-gray-900 mb-1">大舵 — 志望校仕様を定義</h3>
            <p class="text-sm text-gray-600">目標から逆算し、必要な到達ラインを科目別に設計します。</p>
          </div>
        </div>
        <div class="flex items-start gap-4 md:gap-6 fade-up" style="transition-delay:0.05s">
          <div class="flex-shrink-0 w-14 h-14 bg-brand-500 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-brand-500/30">S2</div>
          <div class="bg-white rounded-xl p-5 flex-1 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-gray-900 mb-1">現状把握 — 点数より原因</h3>
            <p class="text-sm text-gray-600">模試の点数ではなく「なぜ落としたか」を分類し、伸ばすべき要素を特定します。</p>
          </div>
        </div>
        <div class="flex items-start gap-4 md:gap-6 fade-up" style="transition-delay:0.1s">
          <div class="flex-shrink-0 w-14 h-14 bg-brand-500 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-brand-500/20">S3</div>
          <div class="bg-white rounded-xl p-5 flex-1 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-gray-900 mb-1">基礎完璧 — 伸びる土台</h3>
            <p class="text-sm text-gray-600">応用の前に、基礎の「穴」を特定して完璧にします。土台なしの応用はムダです。</p>
          </div>
        </div>
        <div class="flex items-start gap-4 md:gap-6 fade-up" style="transition-delay:0.15s">
          <div class="flex-shrink-0 w-14 h-14 bg-blue-400 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-blue-400/20">S4</div>
          <div class="bg-white rounded-xl p-5 flex-1 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-gray-900 mb-1">応用 — 解ける形にする</h3>
            <p class="text-sm text-gray-600">「わかる」を「解ける」に変える演習設計。パターンを型として定着させます。</p>
          </div>
        </div>
        <div class="flex items-start gap-4 md:gap-6 fade-up" style="transition-delay:0.2s">
          <div class="flex-shrink-0 w-14 h-14 bg-blue-400 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-blue-400/20">S5</div>
          <div class="bg-white rounded-xl p-5 flex-1 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-gray-900 mb-1">実戦 — 傾向→対策→検証</h3>
            <p class="text-sm text-gray-600">志望校の過去問分析から、頻出パターンと時間配分を最適化します。</p>
          </div>
        </div>
        <div class="flex items-start gap-4 md:gap-6 fade-up" style="transition-delay:0.25s">
          <div class="flex-shrink-0 w-14 h-14 bg-accent-500 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-accent-500/30">S6</div>
          <div class="bg-white rounded-xl p-5 flex-1 shadow-sm hover:shadow-md transition">
            <h3 class="font-bold text-gray-900 mb-1">改善 — 良いものだけ残す</h3>
            <p class="text-sm text-gray-600">効果の出た勉強法を残し、効果の薄いものは切る。常にPDCAを回します。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ==================== 08. ERROR TAXONOMY ==================== -->
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10 fade-up">
      <div class="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
        ERROR TAXONOMY
      </div>
      <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
        "ケアレス"で終わらせない。<br><span class="text-brand-600">ミスは分類</span>できる。
      </h2>
    </div>

    <!-- Tags -->
    <div class="tag-scroller justify-center flex-wrap mb-10 fade-up">
      <span class="flex-shrink-0 bg-red-50 text-red-700 text-sm font-bold px-4 py-2 rounded-full border border-red-200">知識不足</span>
      <span class="flex-shrink-0 bg-orange-50 text-orange-700 text-sm font-bold px-4 py-2 rounded-full border border-orange-200">理解不足</span>
      <span class="flex-shrink-0 bg-yellow-50 text-yellow-700 text-sm font-bold px-4 py-2 rounded-full border border-yellow-200">手順不足</span>
      <span class="flex-shrink-0 bg-green-50 text-green-700 text-sm font-bold px-4 py-2 rounded-full border border-green-200">転移不足</span>
      <span class="flex-shrink-0 bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-full border border-blue-200">戦略不足</span>
      <span class="flex-shrink-0 bg-purple-50 text-purple-700 text-sm font-bold px-4 py-2 rounded-full border border-purple-200">設計ミス</span>
      <span class="flex-shrink-0 bg-pink-50 text-pink-700 text-sm font-bold px-4 py-2 rounded-full border border-pink-200">検算不足</span>
    </div>

    <!-- Examples -->
    <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      <div class="bg-gray-50 rounded-2xl p-6 fade-up card-hover">
        <div class="flex items-center gap-2 mb-3">
          <span class="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-0.5 rounded">検算不足</span>
        </div>
        <div class="relative bg-white rounded-xl p-4 shadow-sm">
          <div class="absolute -top-2 left-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
          <p class="text-sm text-gray-700">
            <span class="font-bold">例）計算ミス</span><br>
            → "検算不足"なら<span class="text-brand-600 font-bold">チェック方法を固定</span>する
          </p>
        </div>
      </div>
      <div class="bg-gray-50 rounded-2xl p-6 fade-up card-hover" style="transition-delay:0.1s">
        <div class="flex items-center gap-2 mb-3">
          <span class="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded">手順不足</span>
        </div>
        <div class="relative bg-white rounded-xl p-4 shadow-sm">
          <div class="absolute -top-2 left-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
          <p class="text-sm text-gray-700">
            <span class="font-bold">例）解法が浮かばない</span><br>
            → "手順不足"なら<span class="text-brand-600 font-bold">型を作る</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ==================== 09. TESTIMONIALS ==================== -->
<section id="voices" class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10 fade-up">
      <div class="inline-block bg-accent-500/10 text-accent-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
        VOICES
      </div>
      <h2 class="text-2xl sm:text-3xl font-black text-gray-900">
        受講生の<span class="text-brand-600">声</span>
      </h2>
    </div>

    <div class="carousel-track pb-4 fade-up">
      <!-- Card 1 -->
      <div class="carousel-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <span class="bg-brand-50 text-brand-600 text-xs font-bold px-2 py-0.5 rounded">高3</span>
          <span class="text-xs text-gray-500">偏差値55→67</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed mb-4">
          「計画の立て直しで復習が回るようになった。毎週やることが決まっているので、迷いがなくなった。」
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i class="fas fa-user-circle text-lg"></i>
          <span>T.K. さん</span>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="carousel-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <span class="bg-accent-500/10 text-accent-600 text-xs font-bold px-2 py-0.5 rounded">高2</span>
          <span class="text-xs text-gray-500">数学 40点UP</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed mb-4">
          「ミス分類で同じ失点が消えた。"ケアレスミス"の正体がわかって、対策が具体的になった。」
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i class="fas fa-user-circle text-lg"></i>
          <span>M.S. さん</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="carousel-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <span class="bg-purple-50 text-purple-600 text-xs font-bold px-2 py-0.5 rounded">保護者</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed mb-4">
          「不安が減った。やることが可視化されて、子どもの頑張りが見えるようになった。親も安心。」
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i class="fas fa-user-circle text-lg"></i>
          <span>保護者 Y.N. さん</span>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="carousel-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <span class="bg-brand-50 text-brand-600 text-xs font-bold px-2 py-0.5 rounded">高3</span>
          <span class="text-xs text-gray-500">E判定→合格</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed mb-4">
          「志望校メンターから聞いた"実際の併願戦略"が一番参考になった。偏差値では測れない情報だった。」
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i class="fas fa-user-circle text-lg"></i>
          <span>R.A. さん</span>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="carousel-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <span class="bg-orange-50 text-orange-600 text-xs font-bold px-2 py-0.5 rounded">高1</span>
          <span class="text-xs text-gray-500">行動変化</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed mb-4">
          「高1から始められて良かった。早めに勉強の"型"を知れたので、周りより効率よく進められている。」
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i class="fas fa-user-circle text-lg"></i>
          <span>K.H. さん</span>
        </div>
      </div>

      <!-- Card 6 -->
      <div class="carousel-card bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 mb-4">
          <span class="bg-purple-50 text-purple-600 text-xs font-bold px-2 py-0.5 rounded">保護者</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed mb-4">
          「塾を3つ掛け持ちして疲弊していた息子が、MedPathに絞ってから成績も表情も変わった。」
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <i class="fas fa-user-circle text-lg"></i>
          <span>保護者 A.M. さん</span>
        </div>
      </div>
    </div>

    <p class="text-center text-xs text-gray-400 mt-4">※個人の体験であり、成果を保証するものではありません。</p>
  </div>
</section>

<!-- CTA band -->
<div class="bg-brand-600 py-6">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-bold text-sm sm:text-base">あなたの「勝ち筋」を一緒に設計しませんか？</p>
    <a href="#final-cta" class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-6 py-3 rounded-full transition shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>


<!-- ==================== 10. DELIVERABLES ==================== -->
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <!-- Left -->
      <div class="fade-up">
        <div class="inline-block bg-brand-50 text-brand-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
          WHAT YOU GET
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
          毎週、これを<br>一緒に作ります
        </h2>
        <p class="text-gray-600 text-sm leading-relaxed">
          MedPathの面談は「話して終わり」ではありません。毎週、具体的なアウトプットが手元に残ります。
        </p>
      </div>

      <!-- Right: Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-brand-50 rounded-2xl p-5 border border-brand-100 fade-up card-hover">
          <div class="text-brand-600 mb-3"><i class="fas fa-clipboard-list text-2xl"></i></div>
          <p class="text-xs text-brand-500 font-bold mb-1">週次</p>
          <p class="font-bold text-gray-900 text-sm">学習計画</p>
          <p class="text-xs text-gray-500 mt-1">やること・順番・量</p>
        </div>
        <div class="bg-accent-500/5 rounded-2xl p-5 border border-accent-500/15 fade-up card-hover" style="transition-delay:0.05s">
          <div class="text-accent-600 mb-3"><i class="fas fa-search text-2xl"></i></div>
          <p class="text-xs text-accent-500 font-bold mb-1">週次</p>
          <p class="font-bold text-gray-900 text-sm">振り返り</p>
          <p class="text-xs text-gray-500 mt-1">なぜできなかったか</p>
        </div>
        <div class="bg-purple-50 rounded-2xl p-5 border border-purple-100 fade-up card-hover" style="transition-delay:0.1s">
          <div class="text-purple-600 mb-3"><i class="fas fa-wrench text-2xl"></i></div>
          <p class="text-xs text-purple-500 font-bold mb-1">週次</p>
          <p class="font-bold text-gray-900 text-sm">修正</p>
          <p class="text-xs text-gray-500 mt-1">次週の勝ち筋</p>
        </div>
        <div class="bg-orange-50 rounded-2xl p-5 border border-orange-100 fade-up card-hover" style="transition-delay:0.15s">
          <div class="text-orange-500 mb-3"><i class="fas fa-handshake text-2xl"></i></div>
          <p class="text-xs text-orange-500 font-bold mb-1">随時</p>
          <p class="font-bold text-gray-900 text-sm">意思決定相談</p>
          <p class="text-xs text-gray-500 mt-1">併願・戦略</p>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ==================== 11. PLANS ==================== -->
<section id="plans" class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 fade-up">
      <h2 class="text-2xl sm:text-3xl font-black text-gray-900">プラン</h2>
      <p class="text-gray-500 text-sm mt-2">あなたに合った伴走の仕方を選べます</p>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- Light -->
      <div class="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 fade-up card-hover">
        <div class="text-sm font-bold text-gray-400 mb-1">LIGHT</div>
        <h3 class="text-xl font-black text-gray-900 mb-2">ライト</h3>
        <p class="text-3xl font-black text-gray-900 mb-1">¥29,800<span class="text-sm font-normal text-gray-500">/月（税込）</span></p>
        <p class="text-xs text-gray-400 mb-6">まず試してみたい方に</p>
        <ul class="space-y-3 mb-8">
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>月2回のZoom面談</li>
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>チャットサポート</li>
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>学習計画テンプレート</li>
          <li class="flex items-start gap-2 text-sm text-gray-300"><i class="fas fa-times mt-0.5"></i>週次伴走</li>
          <li class="flex items-start gap-2 text-sm text-gray-300"><i class="fas fa-times mt-0.5"></i>添削・面接対策</li>
        </ul>
        <a href="#final-cta" class="block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3 rounded-xl transition">
          まずは無料相談
        </a>
      </div>

      <!-- Standard (Recommended) -->
      <div class="bg-white rounded-2xl p-7 shadow-xl plan-recommended fade-up card-hover" style="transition-delay:0.1s">
        <div class="text-sm font-bold text-brand-600 mb-1">STANDARD</div>
        <h3 class="text-xl font-black text-gray-900 mb-2">スタンダード</h3>
        <p class="text-3xl font-black text-brand-600 mb-1">¥49,800<span class="text-sm font-normal text-gray-500">/月（税込）</span></p>
        <p class="text-xs text-brand-500 mb-6">最もバランスの良いプラン</p>
        <ul class="space-y-3 mb-8">
          <li class="flex items-start gap-2 text-sm text-gray-700 font-medium"><i class="fas fa-check text-brand-600 mt-0.5"></i>月4回のZoom面談</li>
          <li class="flex items-start gap-2 text-sm text-gray-700 font-medium"><i class="fas fa-check text-brand-600 mt-0.5"></i>週次伴走サイクル</li>
          <li class="flex items-start gap-2 text-sm text-gray-700 font-medium"><i class="fas fa-check text-brand-600 mt-0.5"></i>チャットサポート</li>
          <li class="flex items-start gap-2 text-sm text-gray-700 font-medium"><i class="fas fa-check text-brand-600 mt-0.5"></i>学習計画＋振り返り＋修正</li>
          <li class="flex items-start gap-2 text-sm text-gray-300"><i class="fas fa-times mt-0.5"></i>添削・面接対策</li>
        </ul>
        <a href="#final-cta" class="block text-center bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg shadow-brand-600/30">
          無料相談を予約する
        </a>
      </div>

      <!-- Premium -->
      <div class="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 fade-up card-hover" style="transition-delay:0.2s">
        <div class="text-sm font-bold text-gray-400 mb-1">PREMIUM</div>
        <h3 class="text-xl font-black text-gray-900 mb-2">プレミアム</h3>
        <p class="text-3xl font-black text-gray-900 mb-1">¥79,800<span class="text-sm font-normal text-gray-500">/月（税込）</span></p>
        <p class="text-xs text-gray-400 mb-6">最大限の伴走を求める方に</p>
        <ul class="space-y-3 mb-8">
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>月4回のZoom面談</li>
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>週次伴走サイクル</li>
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>優先チャットサポート</li>
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>小論文添削・面接対策</li>
          <li class="flex items-start gap-2 text-sm text-gray-600"><i class="fas fa-check text-accent-500 mt-0.5"></i>日次チェック対応</li>
        </ul>
        <a href="#final-cta" class="block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3 rounded-xl transition">
          まずは無料相談
        </a>
      </div>
    </div>

    <div class="text-center mt-8 fade-up">
      <p class="text-xs text-gray-500 bg-white inline-block px-5 py-2 rounded-full shadow-sm">
        <i class="fas fa-info-circle text-brand-500 mr-1"></i>
        初月はオンボーディング（90分ヒアリング＋戦略サマリ）を実施。返金条件はFAQをご覧ください。
      </p>
    </div>
  </div>
</section>


<!-- ==================== 12. MATCHING OPTION ==================== -->
<section class="py-16 md:py-24 bg-white">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-10 items-center">
      <div class="fade-up">
        <div class="inline-block bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
          OPTION
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">
          志望校メンター<br>優先アサイン
        </h2>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">
          希少メンターの優先配置のための運営コストです。裏情報提供ではありません。
          志望校の現役学生から、受験戦略と大学生活のリアルを直接聞ける環境を整えます。
        </p>
        <p class="text-xs text-gray-400">※志望校メンターの在籍状況により、優先アサインが難しい場合があります。</p>
      </div>
      <div class="fade-up" style="transition-delay:0.15s">
        <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
          <div class="text-center mb-6">
            <p class="text-sm font-bold text-gray-500 mb-1">志望校マッチオプション</p>
            <p class="text-3xl font-black text-gray-900">¥9,800<span class="text-sm font-normal text-gray-500">/月（税込）</span></p>
          </div>
          <ul class="space-y-3 mb-6">
            <li class="flex items-start gap-2 text-sm text-gray-700"><i class="fas fa-check text-yellow-500 mt-0.5"></i>志望校メンター優先配置</li>
            <li class="flex items-start gap-2 text-sm text-gray-700"><i class="fas fa-check text-yellow-500 mt-0.5"></i>受験体験談の共有</li>
            <li class="flex items-start gap-2 text-sm text-gray-700"><i class="fas fa-check text-yellow-500 mt-0.5"></i>大学生活リアル情報</li>
            <li class="flex items-start gap-2 text-sm text-gray-700"><i class="fas fa-check text-yellow-500 mt-0.5"></i>併願戦略アドバイス</li>
          </ul>
          <a href="#final-cta" class="block text-center bg-yellow-500 hover:bg-yellow-400 text-white font-bold text-sm py-3 rounded-xl transition shadow-lg">
            空き状況を確認する（無料相談）
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- ==================== 13. FLOW ==================== -->
<section id="flow" class="py-16 md:py-24 bg-gray-50">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 fade-up">
      <h2 class="text-2xl sm:text-3xl font-black text-gray-900">受講の流れ</h2>
      <p class="text-gray-500 text-sm mt-2">最短5日で伴走スタート</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm fade-up card-hover">
        <div class="w-12 h-12 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">1</div>
        <p class="font-bold text-gray-900 text-sm mb-1">無料相談</p>
        <p class="text-xs text-gray-500">15分・オンライン</p>
      </div>
      <div class="hidden md:flex items-center justify-center text-gray-300"><i class="fas fa-chevron-right"></i></div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm fade-up card-hover" style="transition-delay:0.05s">
        <div class="w-12 h-12 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">2</div>
        <p class="font-bold text-gray-900 text-sm mb-1">現状診断</p>
        <p class="text-xs text-gray-500">志望校ヒアリング</p>
      </div>
      <div class="hidden md:flex items-center justify-center text-gray-300"><i class="fas fa-chevron-right"></i></div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-sm fade-up card-hover" style="transition-delay:0.1s">
        <div class="w-12 h-12 mx-auto bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">3</div>
        <p class="font-bold text-gray-900 text-sm mb-1">メンター決定</p>
        <p class="text-xs text-gray-500">最適なマッチング</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 mt-4 md:mt-2">
      <div class="md:col-start-2 bg-white rounded-2xl p-6 text-center shadow-sm fade-up card-hover" style="transition-delay:0.15s">
        <div class="w-12 h-12 mx-auto bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">4</div>
        <p class="font-bold text-gray-900 text-sm mb-1">初回オンボーディング</p>
        <p class="text-xs text-gray-500">90分・戦略設計</p>
      </div>
      <div class="hidden md:flex items-center justify-center text-gray-300"><i class="fas fa-chevron-right"></i></div>
      <div class="bg-accent-50 rounded-2xl p-6 text-center shadow-sm border-2 border-accent-200 fade-up card-hover" style="transition-delay:0.2s">
        <div class="w-12 h-12 mx-auto bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">5</div>
        <p class="font-bold text-gray-900 text-sm mb-1">週次伴走スタート</p>
        <p class="text-xs text-accent-600 font-medium">ここから毎週サイクル</p>
      </div>
    </div>

    <div class="text-center mt-10 fade-up">
      <a href="#final-cta" class="inline-flex items-center bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-8 py-4 rounded-xl transition shadow-lg shadow-brand-600/30">
        <i class="fas fa-calendar-check mr-2"></i>
        まずは無料相談から
      </a>
    </div>
  </div>
</section>


<!-- ==================== 14. FAQ ==================== -->
<section id="faq" class="py-16 md:py-24 bg-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 fade-up">
      <h2 class="text-2xl sm:text-3xl font-black text-gray-900">よくある質問</h2>
    </div>

    <div class="space-y-3 fade-up" id="faq-list">
      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 授業はしないんですか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          MedPathは「授業」ではなく「勉強法の設計と伴走」に特化しています。教科の指導が必要な場合は、既存の塾や予備校と併用いただけます。「何を、どの順番で、どれだけやるか」を決めることが成績向上の最大のレバーだと考えています。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 志望校メンターは必ず付きますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          志望校メンターは「優先アサイン」制度です。在籍メンターの状況により、完全に一致するメンターを保証するものではありません。ただし、近い大学群や同系統のメンターをアサインするなど、可能な限り最適なマッチングを行います。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 返金はありますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          初回オンボーディング完了後7日以内にご満足いただけなかった場合、全額返金いたします。詳細な条件は利用規約に記載しています。まずは無料相談で合うかどうかを確認していただくことを推奨しています。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 親だけの相談もできますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          はい、保護者の方だけのご相談も歓迎です。お子さまの学習状況の共有や、受験戦略についてのご相談を承ります。無料相談の際にお気軽にお申し付けください。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 推薦・面接にも対応しますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          プレミアムプランでは、小論文添削および面接対策に対応しています。推薦入試の対策も可能です。メンター自身の推薦入試経験を活かしたアドバイスが好評です。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. どのレベルから対象ですか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          偏差値40台から国公立志望まで、幅広く対応しています。重要なのは偏差値ではなく「勝てるやり方を固定すること」です。現状の学力に合わせた逆算設計を行います。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 塾や予備校と併用できますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          もちろんです。MedPathは「学習戦略の設計」に特化しているため、既存の塾での授業と組み合わせることで最大の効果を発揮します。むしろ併用を推奨しているケースが多いです。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 面談の曜日・時間は選べますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          はい。メンターとの調整により、平日夕方〜夜、土日にも対応可能です。Zoomを使用するため、自宅からどこでも受講できます。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 途中でプラン変更はできますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          月単位でのプラン変更が可能です。最初はライトで試し、手応えを感じたらスタンダードに切り替える方も多いです。
        </div>
      </div>

      <div class="faq-item bg-gray-50 rounded-xl overflow-hidden">
        <button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)">
          <span class="font-bold text-sm text-gray-800 pr-4">Q. 高1・高2からでも意味がありますか？</span>
          <i class="fas fa-plus text-brand-600 faq-icon flex-shrink-0"></i>
        </button>
        <div class="faq-answer px-5 text-sm text-gray-600 leading-relaxed">
          大いにあります。早期に「勉強の型」を身につけることで、高3時の伸びが大きく変わります。高1・高2は基礎の土台作りと勉強習慣の確立に集中します。
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA after FAQ -->
<div class="bg-brand-600 py-6">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-bold text-sm sm:text-base">まだ迷っていますか？15分で疑問が解消します。</p>
    <a href="#final-cta" class="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-6 py-3 rounded-full transition shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>


<!-- ==================== 15. FINAL CTA ==================== -->
<section id="final-cta" class="py-20 md:py-28 bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 relative overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 left-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
  </div>

  <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-black text-white leading-tight mb-4 fade-up">
      まずは15分。<br>"今週の勝ち筋"だけ<br class="sm:hidden">持ち帰ってください。
    </h2>
    <p class="text-white/80 text-base sm:text-lg mb-10 fade-up" style="transition-delay:0.1s">
      あなたの現状と志望校を聞いて、やることを具体化します。
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8 fade-up" style="transition-delay:0.2s">
      <a href="#" class="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg px-10 py-5 rounded-xl shadow-xl shadow-yellow-400/30 transition-all hover:shadow-2xl hover:-translate-y-1">
        <i class="fas fa-calendar-check mr-2"></i>
        無料相談（15分）
      </a>
      <a href="#" class="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 backdrop-blur text-white font-bold text-lg px-10 py-5 rounded-xl border border-white/30 transition-all">
        <i class="fas fa-file-alt mr-2"></i>
        資料を見る<span class="text-sm ml-2 opacity-70">30秒</span>
      </a>
    </div>

    <p class="text-white/40 text-xs fade-up" style="transition-delay:0.3s">
      無料相談は完全無料・無理な勧誘はありません
    </p>
  </div>
</section>


<!-- ==================== FOOTER ==================== -->
<footer class="bg-gray-900 py-12">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-2 text-white font-bold text-lg">
        <svg class="w-7 h-7" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" fill="white" fill-opacity="0.1"/>
          <path d="M16 6L20 14H12L16 6Z" fill="white" fill-opacity="0.7"/>
          <path d="M10 16L16 26L22 16H10Z" fill="white" fill-opacity="0.5"/>
        </svg>
        MedPath
      </div>
      <div class="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
        <a href="#" class="hover:text-white transition">運営者情報</a>
        <a href="#" class="hover:text-white transition">特定商取引法に基づく表記</a>
        <a href="#" class="hover:text-white transition">プライバシーポリシー</a>
        <a href="#" class="hover:text-white transition">利用規約</a>
      </div>
    </div>
    <div class="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
      &copy; 2026 MedPath All rights reserved.
    </div>
  </div>
</footer>


<!-- ==================== MOBILE STICKY CTA ==================== -->
<div class="mobile-sticky-cta md:hidden">
  <div class="flex gap-2">
    <a href="#final-cta" class="flex-1 flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-3.5 rounded-xl transition">
      <i class="fas fa-calendar-check mr-1.5"></i>無料相談
    </a>
    <a href="#final-cta" class="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm py-3.5 rounded-xl transition">
      <i class="fas fa-file-alt mr-1.5"></i>資料
    </a>
  </div>
</div>


<!-- ==================== SCRIPTS ==================== -->
<script>
// Intersection Observer for fade-up animations
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

  // Header scroll effect
  const header = document.getElementById('header');
  const heroSection = document.querySelector('.hero-gradient');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      header.classList.add('header-scrolled');
      header.querySelectorAll('nav a, #mobile-menu-btn').forEach(el => {
        el.classList.remove('text-white/80', 'text-white');
        el.classList.add('text-gray-700');
      });
      header.querySelector('a[href="#"]').classList.remove('text-white');
      header.querySelector('a[href="#"]').classList.add('text-brand-700');
      // Fix CTA buttons for scrolled state
      const secondaryCta = header.querySelector('a[href="#final-cta"].border');
      if (secondaryCta) {
        secondaryCta.classList.remove('text-white/80', 'border-white/30');
        secondaryCta.classList.add('text-gray-600', 'border-gray-300');
      }
      const primaryCta = header.querySelector('a[href="#final-cta"].bg-white');
      if (primaryCta) {
        primaryCta.classList.remove('shadow-blue-900/20');
      }
    } else {
      header.classList.remove('header-scrolled');
      header.querySelectorAll('nav a, #mobile-menu-btn').forEach(el => {
        el.classList.add('text-white/80');
        el.classList.remove('text-gray-700');
      });
      header.querySelector('a[href="#"]').classList.add('text-white');
      header.querySelector('a[href="#"]').classList.remove('text-brand-700');
      const secondaryCta = header.querySelector('a[href="#final-cta"].border');
      if (secondaryCta) {
        secondaryCta.classList.add('text-white/80', 'border-white/30');
        secondaryCta.classList.remove('text-gray-600', 'border-gray-300');
      }
    }
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
});

// FAQ toggle
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotated'));

  // Open clicked if was closed
  if (!isOpen) {
    answer.classList.add('open');
    icon.classList.add('rotated');
  }
}
</script>

</body>
</html>`
}

export default app
