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
  <title>MedPath｜医学部受験 オンラインメンタリング</title>
  <meta name="description" content="志望校から逆算して、毎週やること・順番・量を設計。現役医学生メンターが伴走するオンラインメンタリング。">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800;900&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Noto Sans JP', 'sans-serif'],
            round: ['Zen Maru Gothic', 'sans-serif']
          },
          colors: {
            brand: { 50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81' },
            accent: { 50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#f97316',600:'#ea580c' },
            success: { 50:'#ecfdf5',100:'#d1fae5',400:'#34d399',500:'#10b981',600:'#059669' },
            danger: { 50:'#fef2f2',100:'#fee2e2',400:'#f87171',500:'#ef4444',600:'#dc2626' }
          }
        }
      }
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
    body { font-family: 'Noto Sans JP', sans-serif; color: #1e293b; overflow-x: hidden; }
    .font-round { font-family: 'Zen Maru Gothic', sans-serif; }

    /* ===== Animations ===== */
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal.show { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-30px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal-left.show { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(30px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
    .reveal-right.show { opacity: 1; transform: translateX(0); }
    .stagger > *:nth-child(1) { transition-delay: .05s; }
    .stagger > *:nth-child(2) { transition-delay: .1s; }
    .stagger > *:nth-child(3) { transition-delay: .15s; }
    .stagger > *:nth-child(4) { transition-delay: .2s; }
    .stagger > *:nth-child(5) { transition-delay: .25s; }
    .stagger > *:nth-child(6) { transition-delay: .3s; }

    /* ===== Hero ===== */
    .hero-section {
      background: linear-gradient(135deg, #312e81 0%, #4338ca 25%, #4f46e5 50%, #6366f1 75%, #818cf8 100%);
      position: relative;
      overflow: hidden;
    }
    .hero-section::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,.08), transparent),
                  radial-gradient(ellipse 60% 50% at 20% 80%, rgba(99,102,241,.3), transparent);
    }
    .hero-section::after {
      content: '';
      position: absolute; bottom: -1px; left: 0; right: 0; height: 80px;
      background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,64 C360,80 720,20 1440,64 L1440,80 L0,80 Z' fill='%23ffffff'/%3E%3C/svg%3E") no-repeat bottom center;
      background-size: cover;
    }
    .hero-grid-bg {
      position: absolute; inset: 0;
      background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .hero-float { animation: heroFloat 6s ease-in-out infinite; }
    @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

    /* ===== Num counter style (明光inspired) ===== */
    .num-xl { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; line-height: 1; }

    /* ===== Underline accent ===== */
    .text-highlight {
      background: linear-gradient(transparent 60%, #fde68a 60%);
      padding: 0 4px;
    }
    .marker-line {
      display: inline;
      background: linear-gradient(transparent 65%, rgba(251,191,36,.35) 65%);
    }

    /* ===== Section styles ===== */
    .section-white { background: #fff; }
    .section-warm { background: #fffbf7; }
    .section-brand-light { background: linear-gradient(180deg, #eef2ff 0%, #fff 100%); }
    .section-dark { background: linear-gradient(135deg, #312e81, #4338ca); }

    /* ===== Cards ===== */
    .glass-card {
      background: rgba(255,255,255,.8);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.6);
      border-radius: 20px;
      box-shadow: 0 4px 24px rgba(0,0,0,.04);
      transition: transform .25s, box-shadow .25s;
    }
    .glass-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.08); }

    .worry-card-v2 {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 1px 8px rgba(0,0,0,.04);
      transition: all .25s;
      position: relative;
      overflow: hidden;
    }
    .worry-card-v2::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #f97316, #fb923c);
      opacity: 0;
      transition: opacity .25s;
    }
    .worry-card-v2:hover { border-color: #fed7aa; box-shadow: 0 8px 32px rgba(249,115,22,.1); }
    .worry-card-v2:hover::before { opacity: 1; }

    /* ===== Plan cards ===== */
    .plan-v2 {
      border-radius: 24px;
      padding: 32px 28px;
      background: #fff;
      border: 2px solid #e2e8f0;
      transition: all .3s;
      position: relative;
    }
    .plan-v2:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,.08); }
    .plan-v2.plan-featured {
      border-color: #6366f1;
      box-shadow: 0 8px 40px rgba(99,102,241,.15);
      background: linear-gradient(180deg, #fefffe 0%, #eef2ff 100%);
    }
    .plan-v2.plan-featured:hover { box-shadow: 0 20px 60px rgba(99,102,241,.2); }

    /* ===== CTAs ===== */
    .btn-primary {
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: #fff; font-weight: 800; border-radius: 14px;
      padding: 18px 36px; font-size: 1rem;
      box-shadow: 0 8px 24px rgba(249,115,22,.3);
      transition: all .25s; display: inline-flex; align-items: center; gap: 10px;
      text-decoration: none;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(249,115,22,.4); filter: brightness(1.05); }
    .btn-primary:active { transform: translateY(0); }

    .btn-secondary {
      background: #fff; color: #4f46e5; font-weight: 700; border-radius: 14px;
      padding: 16px 32px; font-size: .95rem; border: 2px solid #c7d2fe;
      transition: all .25s; display: inline-flex; align-items: center; gap: 10px;
      text-decoration: none;
    }
    .btn-secondary:hover { background: #eef2ff; border-color: #a5b4fc; }

    .btn-sm {
      padding: 12px 24px; font-size: .875rem; border-radius: 12px;
    }

    /* ===== CTA band ===== */
    .cta-band {
      background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%);
      position: relative; overflow: hidden;
    }
    .cta-band::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 20% 50%, rgba(255,255,255,.1), transparent 60%);
    }
    .cta-band-warm {
      background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
    }
    .cta-band-warm::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 80% 50%, rgba(255,255,255,.1), transparent 60%);
    }

    /* ===== FAQ ===== */
    .faq-item { border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; transition: all .25s; }
    .faq-item:hover { border-color: #c7d2fe; }
    .faq-answer { max-height: 0; overflow: hidden; transition: max-height .4s cubic-bezier(.16,1,.3,1), padding .4s; padding: 0 24px; }
    .faq-answer.open { max-height: 400px; padding: 0 24px 20px; }
    .faq-chevron { transition: transform .3s; }
    .faq-active .faq-chevron { transform: rotate(180deg); }

    /* ===== Voice carousel ===== */
    .voice-carousel-v2 {
      display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch; scrollbar-width: none; padding: 8px 0 16px;
    }
    .voice-carousel-v2::-webkit-scrollbar { display: none; }
    .voice-carousel-v2 > div { scroll-snap-align: start; flex: 0 0 340px; }
    @media (max-width: 640px) { .voice-carousel-v2 > div { flex: 0 0 88vw; } }

    .voice-v2 {
      background: #fff; border-radius: 20px; padding: 28px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 2px 16px rgba(0,0,0,.04);
      transition: all .25s;
    }
    .voice-v2:hover { box-shadow: 0 8px 32px rgba(0,0,0,.08); }

    /* ===== Score badge ===== */
    .score-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: linear-gradient(135deg, #dc2626, #ef4444);
      color: #fff; font-weight: 800; font-family: 'Zen Maru Gothic', sans-serif;
      padding: 5px 14px; border-radius: 24px; font-size: .8rem;
      box-shadow: 0 2px 8px rgba(220,38,38,.3);
    }

    /* ===== Step flow ===== */
    .flow-line { position: relative; }
    .flow-line::after {
      content: ''; position: absolute; left: 28px; top: 56px; bottom: -8px;
      width: 2px; background: linear-gradient(180deg, #c7d2fe, #e0e7ff);
    }
    .flow-line:last-child::after { display: none; }

    /* ===== Header ===== */
    .header-glass { background: rgba(255,255,255,0); backdrop-filter: blur(0); transition: all .3s; }
    .header-scrolled { background: rgba(255,255,255,.92); backdrop-filter: blur(16px); box-shadow: 0 1px 12px rgba(0,0,0,.06); }
    .header-scrolled .hdr-link { color: #475569 !important; }
    .header-scrolled .hdr-link:hover { color: #4f46e5 !important; }
    .header-scrolled .hdr-logo { color: #312e81 !important; }

    /* ===== Map ===== */
    .map-pulse { animation: pulse2 2.5s ease-in-out infinite; }
    @keyframes pulse2 { 0%,100% { opacity:.4; transform:scale(1); } 50% { opacity:1; transform:scale(1.4); } }

    /* ===== Mobile bar ===== */
    .mobile-sticky {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
      background: rgba(255,255,255,.95); backdrop-filter: blur(12px);
      border-top: 1px solid #e2e8f0;
      box-shadow: 0 -4px 24px rgba(0,0,0,.08);
      padding: 10px 16px; display: none;
    }
    @media (max-width: 767px) { .mobile-sticky { display: flex; gap: 10px; } }

    /* ===== Tags ===== */
    .error-tag {
      padding: 8px 18px; border-radius: 24px; font-size: .8rem; font-weight: 700;
      transition: all .25s; cursor: default;
    }
    .error-tag:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.08); }

    /* ===== Method timeline ===== */
    .method-step {
      position: relative;
      padding-left: 48px;
    }
    .method-step::before {
      content: '';
      position: absolute; left: 19px; top: 44px; bottom: -20px;
      width: 2px;
      background: linear-gradient(180deg, #c7d2fe, #e0e7ff);
    }
    .method-step:last-child::before { display: none; }
    .method-num {
      position: absolute; left: 0; top: 0;
      width: 40px; height: 40px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; font-size: .85rem;
      color: #fff;
    }

    /* ===== Pillar ===== */
    .pillar-card {
      border-radius: 24px; padding: 36px 28px;
      background: #fff; border: 1px solid #f1f5f9;
      box-shadow: 0 2px 16px rgba(0,0,0,.03);
      transition: all .3s;
      position: relative; overflow: hidden;
    }
    .pillar-card::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    }
    .pillar-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,.08); }
    .pillar-1::after { background: linear-gradient(90deg, #4f46e5, #818cf8); }
    .pillar-2::after { background: linear-gradient(90deg, #059669, #34d399); }
    .pillar-3::after { background: linear-gradient(90deg, #ea580c, #fb923c); }

    /* ===== Misc ===== */
    .badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .stat-card { text-align: center; padding: 20px 16px; border-radius: 20px; }
    .divider-dot::after { content: '\\00B7'; margin: 0 6px; color: #94a3b8; }
    @media (max-width:768px) { .mob-pb { padding-bottom: 88px; } }

    /* ===== Counter animation ===== */
    .counter-wrap .counter-num {
      display: inline-block;
      transition: all .6s cubic-bezier(.16,1,.3,1);
    }
  </style>
</head>
<body class="bg-white mob-pb">

<!-- ===== HEADER ===== -->
<header id="header" class="fixed top-0 left-0 right-0 z-50 header-glass">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-[72px]">
      <a href="#" class="hdr-logo font-round font-black text-xl text-white tracking-tight flex items-center gap-2.5 transition">
        <span class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-sm backdrop-blur">
          <i class="fas fa-graduation-cap"></i>
        </span>
        MedPath
      </a>
      <nav class="hidden lg:flex items-center gap-6 text-[13px] font-semibold">
        <a href="#worries" class="hdr-link text-white/75 hover:text-white transition">悩み</a>
        <a href="#how" class="hdr-link text-white/75 hover:text-white transition">仕組み</a>
        <a href="#matching" class="hdr-link text-white/75 hover:text-white transition">志望校マッチ</a>
        <a href="#method" class="hdr-link text-white/75 hover:text-white transition">メソッド</a>
        <a href="#plans" class="hdr-link text-white/75 hover:text-white transition">プラン</a>
        <a href="#voices" class="hdr-link text-white/75 hover:text-white transition">体験談</a>
        <a href="#faq" class="hdr-link text-white/75 hover:text-white transition">FAQ</a>
      </nav>
      <div class="hidden md:flex items-center gap-3">
        <a href="#final-cta" class="text-[13px] text-white/80 hover:text-white border border-white/30 rounded-xl px-4 py-2 transition backdrop-blur-sm">
          <i class="fas fa-file-alt mr-1 text-xs"></i>資料を見る
        </a>
        <a href="#final-cta" class="text-[13px] bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-bold rounded-xl px-5 py-2.5 transition shadow-lg shadow-orange-500/25">
          <i class="fas fa-calendar-check mr-1 text-xs"></i>無料相談 15分
        </a>
      </div>
      <button id="mobMenuBtn" class="lg:hidden text-white p-2"><i class="fas fa-bars text-xl"></i></button>
    </div>
  </div>
  <div id="mobMenu" class="hidden lg:hidden bg-white/95 backdrop-blur-xl shadow-xl rounded-b-2xl mx-3 border border-gray-100">
    <div class="py-3 px-5 flex flex-col gap-1 text-sm font-semibold text-slate-600">
      <a href="#worries" class="mm-link py-2.5 hover:text-brand-600 transition">悩み</a>
      <a href="#how" class="mm-link py-2.5 hover:text-brand-600 transition">仕組み</a>
      <a href="#matching" class="mm-link py-2.5 hover:text-brand-600 transition">志望校マッチ</a>
      <a href="#method" class="mm-link py-2.5 hover:text-brand-600 transition">メソッド</a>
      <a href="#plans" class="mm-link py-2.5 hover:text-brand-600 transition">プラン</a>
      <a href="#voices" class="mm-link py-2.5 hover:text-brand-600 transition">体験談</a>
      <a href="#faq" class="mm-link py-2.5 hover:text-brand-600 transition">FAQ</a>
      <div class="pt-2 mt-1 border-t border-gray-100 flex gap-2">
        <a href="#final-cta" class="flex-1 text-center text-xs bg-brand-600 text-white font-bold py-2.5 rounded-lg">無料相談</a>
        <a href="#final-cta" class="flex-1 text-center text-xs border border-brand-200 text-brand-600 font-bold py-2.5 rounded-lg">資料を見る</a>
      </div>
    </div>
  </div>
</header>

<!-- ============================================================ -->
<!-- 01. HERO  (そら塾: 数字同時提示 + スタサプ: クリアUI)        -->
<!-- ============================================================ -->
<section class="hero-section pt-28 pb-32 md:pt-36 md:pb-44">
  <div class="hero-grid-bg"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mb-6 reveal">
      <span class="bg-white/15 backdrop-blur text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20">
        <i class="fas fa-stethoscope mr-1"></i>医学部受験専門
      </span>
      <span class="bg-white/15 backdrop-blur text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20">
        <i class="fas fa-laptop mr-1"></i>オンライン完結
      </span>
      <span class="bg-white/15 backdrop-blur text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20">
        <i class="fas fa-users mr-1"></i>保護者相談OK
      </span>
    </div>

    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Left: Copy -->
      <div class="reveal-left">
        <h1 class="font-round text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] font-black text-white leading-[1.35] mb-6">
          医学部受験は、<br>
          <span class="relative inline-block">
            <span class="relative z-10 text-amber-300">「勝てる勉強法」</span>
            <svg class="absolute -bottom-1 left-0 w-full" height="12" viewBox="0 0 200 12" preserveAspectRatio="none">
              <path d="M0,8 Q50,0 100,6 T200,4" stroke="#fbbf24" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
            </svg>
          </span>
          で決まる。
        </h1>
        <p class="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
          志望校から逆算して、毎週<strong class="text-amber-200">「やること・順番・量」</strong>を設計。<br>
          現役医学生メンターが、あなた専用の学習戦略で伴走します。
        </p>

        <div class="flex flex-col sm:flex-row gap-3 mb-8">
          <a href="#final-cta" class="btn-primary text-center justify-center">
            <i class="fas fa-calendar-check"></i>
            <span>まずは無料で相談する<span class="text-xs font-normal opacity-75 ml-1">（15分）</span></span>
          </a>
          <a href="#final-cta" class="btn-secondary bg-white/10 border-white/25 text-white hover:bg-white/20 text-center justify-center backdrop-blur-sm">
            <i class="fas fa-file-alt"></i>
            <span>資料を見る<span class="text-xs opacity-60 ml-1">30秒</span></span>
          </a>
        </div>

        <div class="flex gap-5 text-[13px] text-white/50">
          <a href="#final-cta" class="hover:text-white/90 underline underline-offset-4 transition">受験生の方</a>
          <a href="#final-cta" class="hover:text-white/90 underline underline-offset-4 transition">保護者の方</a>
          <a href="#final-cta" class="hover:text-white/90 underline underline-offset-4 transition">推薦対策の方</a>
        </div>
      </div>

      <!-- Right: Mentor card (warm, あすなろ-inspired) -->
      <div class="hidden lg:block reveal-right">
        <div class="bg-white rounded-3xl shadow-2xl p-6 relative hero-float">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
              <i class="fas fa-user-md text-brand-600 text-lg"></i>
            </div>
            <div class="flex-1">
              <p class="font-bold text-slate-800 text-sm font-round">田中先生<span class="text-xs font-normal text-slate-400 ml-2">○○大学 医学部4年</span></p>
              <p class="text-xs text-success-500 font-medium flex items-center gap-1"><span class="w-1.5 h-1.5 bg-success-500 rounded-full animate-pulse"></span>面談中</p>
            </div>
            <span class="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-xl"><i class="fas fa-video mr-1"></i>Zoom</span>
          </div>
          <!-- Plan -->
          <div class="bg-gradient-to-br from-brand-50 to-indigo-50 rounded-2xl p-5 mb-4">
            <p class="font-bold text-brand-800 text-sm mb-3 font-round flex items-center gap-2">
              <span class="w-6 h-6 bg-brand-600 text-white rounded-lg flex items-center justify-center text-[10px]"><i class="fas fa-list-check"></i></span>
              今週の学習プラン
            </p>
            <ul class="text-sm text-slate-700 space-y-2">
              <li class="flex items-start gap-2"><span class="w-5 h-5 bg-success-100 text-success-600 rounded flex items-center justify-center text-[10px] mt-0.5 shrink-0"><i class="fas fa-check"></i></span>数学：青チャート 数III 微積分 §4-6</li>
              <li class="flex items-start gap-2"><span class="w-5 h-5 bg-success-100 text-success-600 rounded flex items-center justify-center text-[10px] mt-0.5 shrink-0"><i class="fas fa-check"></i></span>英語：長文1日1題＋音読復習</li>
              <li class="flex items-start gap-2"><span class="w-5 h-5 bg-amber-100 text-amber-600 rounded flex items-center justify-center text-[10px] mt-0.5 shrink-0"><i class="fas fa-clock"></i></span>化学：有機反応まとめノート作成</li>
            </ul>
          </div>
          <!-- Advice -->
          <div class="bg-accent-50 rounded-2xl p-4 flex items-start gap-3">
            <span class="w-8 h-8 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600 shrink-0"><i class="fas fa-lightbulb"></i></span>
            <p class="text-sm text-slate-700">先週の計算ミス → <strong class="text-brand-700">検算チェックリスト</strong>を導入して対策！</p>
          </div>
          <!-- Badge -->
          <div class="absolute -top-3 -right-3 bg-gradient-to-r from-accent-500 to-accent-400 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg">
            毎週更新 <i class="fas fa-sync-alt ml-1"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 実績バッジ (明光 + そら塾: 数字で圧倒) -->
    <div class="grid grid-cols-3 gap-3 sm:gap-5 mt-16 lg:mt-20 reveal">
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl py-6 px-4 text-center border border-white/15 hover:bg-white/15 transition">
        <p class="num-xl text-white text-3xl sm:text-5xl">30<span class="text-lg sm:text-xl">校+</span></p>
        <p class="text-[11px] sm:text-xs text-white/60 mt-2 font-medium">メンター所属大学数</p>
      </div>
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl py-6 px-4 text-center border border-white/15 hover:bg-white/15 transition">
        <p class="num-xl text-white text-3xl sm:text-5xl">120<span class="text-lg sm:text-xl">名+</span></p>
        <p class="text-[11px] sm:text-xs text-white/60 mt-2 font-medium">登録メンター数</p>
      </div>
      <div class="bg-white/10 backdrop-blur-lg rounded-2xl py-6 px-4 text-center border border-white/15 hover:bg-white/15 transition">
        <p class="num-xl text-white text-3xl sm:text-5xl">500<span class="text-lg sm:text-xl">件+</span></p>
        <p class="text-[11px] sm:text-xs text-white/60 mt-2 font-medium">累計メンタリング数</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 02. SOCIAL PROOF (明光: 4つの安心カード)                      -->
<!-- ============================================================ -->
<section class="section-white py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round tracking-wide">WHY MedPath?</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">
        選ばれ続ける<span class="text-highlight">4つの理由</span>
      </h2>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 stagger">
      <div class="glass-card p-6 text-center reveal">
        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center">
          <i class="fas fa-shield-alt text-2xl text-accent-600"></i>
        </div>
        <p class="font-round font-bold text-slate-800 text-[15px] mb-1">志望校メンター</p>
        <p class="text-accent-600 font-bold text-xs">優先アサイン制度</p>
      </div>
      <div class="glass-card p-6 text-center reveal">
        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl flex items-center justify-center">
          <i class="fas fa-user-graduate text-2xl text-brand-600"></i>
        </div>
        <p class="font-round font-bold text-slate-800 text-[15px] mb-1">メンター全員</p>
        <p class="text-brand-600 font-bold text-xs">現役医学生</p>
      </div>
      <div class="glass-card p-6 text-center reveal">
        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-success-100 to-emerald-200 rounded-2xl flex items-center justify-center">
          <i class="fas fa-video text-2xl text-success-600"></i>
        </div>
        <p class="font-round font-bold text-slate-800 text-[15px] mb-1">面談はすべて</p>
        <p class="text-success-600 font-bold text-xs">Zoom完結</p>
      </div>
      <div class="glass-card p-6 text-center reveal">
        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center">
          <i class="fas fa-clipboard-check text-2xl text-purple-600"></i>
        </div>
        <p class="font-round font-bold text-slate-800 text-[15px] mb-1">学習設計テンプレ</p>
        <p class="text-purple-600 font-bold text-xs">毎週アップデート</p>
      </div>
    </div>
    <p class="text-center text-xs text-slate-400 mt-8">※在籍状況は時期により変動します。志望校メンターは「優先アサイン」制度であり、確約ではありません。</p>
  </div>
</section>

<!-- ============================================================ -->
<!-- 03. WORRIES (あすなろ: 感情導入、親の不安を代弁)             -->
<!-- ============================================================ -->
<section id="worries" class="section-warm py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Emotional intro (あすなろ style) -->
    <div class="text-center mb-5 reveal">
      <div class="inline-flex items-center gap-2 bg-accent-100 text-accent-700 text-sm font-bold px-5 py-2 rounded-full mb-5">
        <i class="fas fa-hand-holding-heart"></i>
        お子さま・保護者の方へ
      </div>
    </div>
    <div class="text-center mb-12 reveal">
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800 leading-tight">
        医学部受験、<br class="sm:hidden">
        こんな<span class="text-highlight">不安</span>を抱えていませんか？
      </h2>
      <p class="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
        「勉強はしているのに伸びない」——その原因は"やり方"にあるかもしれません。
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
      <div class="worry-card-v2 reveal">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center text-xl">😰</span>
          <span class="text-xs text-accent-600 font-bold bg-accent-50 px-3 py-1 rounded-full">情報過多</span>
        </div>
        <p class="font-round font-bold text-slate-800 leading-snug mb-1">何を信じて何を捨てるか<br>決められない</p>
        <p class="text-xs text-slate-500">参考書・塾・YouTubeで情報洪水。方針が定まらない…</p>
      </div>
      <div class="worry-card-v2 reveal">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">📅</span>
          <span class="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">計画崩壊</span>
        </div>
        <p class="font-round font-bold text-slate-800 leading-snug mb-1">計画を立てても続かない<br>崩れたら終わる</p>
        <p class="text-xs text-slate-500">1日サボると全部崩壊する感覚…</p>
      </div>
      <div class="worry-card-v2 reveal">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-xl">📚</span>
          <span class="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full">教材迷子</span>
        </div>
        <p class="font-round font-bold text-slate-800 leading-snug mb-1">教材が増えるほど<br>不安が増える</p>
        <p class="text-xs text-slate-500">何をやれば正解なのか分からない…</p>
      </div>
      <div class="worry-card-v2 reveal">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-xl">📊</span>
          <span class="text-xs text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full">模試空回り</span>
        </div>
        <p class="font-round font-bold text-slate-800 leading-snug mb-1">模試の復習が形だけで<br>伸びない</p>
        <p class="text-xs text-slate-500">やった気になるだけで次に活かせない…</p>
      </div>
      <div class="worry-card-v2 reveal">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl">🔄</span>
          <span class="text-xs text-amber-700 font-bold bg-amber-50 px-3 py-1 rounded-full">ミス再発</span>
        </div>
        <p class="font-round font-bold text-slate-800 leading-snug mb-1">"ケアレスミス"で片付けて<br>同じ失点を繰り返す</p>
        <p class="text-xs text-slate-500">本当の原因が見えていない…</p>
      </div>
      <div class="worry-card-v2 reveal">
        <div class="flex items-center gap-3 mb-3">
          <span class="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-xl">🗺️</span>
          <span class="text-xs text-teal-700 font-bold bg-teal-50 px-3 py-1 rounded-full">情報不足</span>
        </div>
        <p class="font-round font-bold text-slate-800 leading-snug mb-1">志望校の情報がなく<br>戦い方が曖昧</p>
        <p class="text-xs text-slate-500">大学ごとの傾向・対策がつかめない…</p>
      </div>
    </div>

    <div class="mt-10 text-center reveal">
      <div class="inline-block bg-white rounded-2xl px-7 py-5 shadow-sm border border-slate-100">
        <p class="text-sm text-slate-700 font-round leading-relaxed">
          <i class="fas fa-arrow-down text-brand-500 mr-2"></i>
          この先でお伝えするのは「勉強を教える」話ではなく<br class="hidden sm:block">
          <strong class="text-brand-700">「勝てるやり方を、一緒に作る」</strong>サービスの話です。
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA Band 1 ===== -->
<div class="cta-band py-6 relative">
  <div class="relative max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-round font-bold text-sm text-center sm:text-left">まずは15分、お子さまの状況を聞かせてください。</p>
    <a href="#final-cta" class="btn-primary btn-sm shadow-lg">
      <i class="fas fa-calendar-check"></i>無料で相談する
    </a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 04. BEFORE/AFTER                                              -->
<!-- ============================================================ -->
<section class="section-white py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round">BEFORE → AFTER</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">
        授業の前に、<span class="text-highlight">勝ち筋</span>を固定します
      </h2>
      <p class="text-slate-500 text-sm mt-3">MedPathを始めると、学習スタイルがこう変わります</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      <div class="bg-danger-50 rounded-3xl p-8 border border-danger-100 reveal-left">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-10 h-10 bg-danger-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">✕</span>
          <p class="font-round font-black text-danger-600">今のままだと…</p>
        </div>
        <ul class="space-y-5">
          <li class="flex gap-3 items-start">
            <span class="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center text-danger-400 shrink-0 mt-0.5"><i class="fas fa-times text-xs"></i></span>
            <div><p class="text-sm text-slate-700 font-medium">今日は何をやるか<strong>毎朝迷う</strong></p><p class="text-xs text-slate-400 mt-0.5">優先順位が見えない</p></div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center text-danger-400 shrink-0 mt-0.5"><i class="fas fa-times text-xs"></i></span>
            <div><p class="text-sm text-slate-700 font-medium">復習しても<strong>伸びている実感がない</strong></p><p class="text-xs text-slate-400 mt-0.5">やった気になるだけ</p></div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center text-danger-400 shrink-0 mt-0.5"><i class="fas fa-times text-xs"></i></span>
            <div><p class="text-sm text-slate-700 font-medium">ミスを繰り返すが<strong>対策が見えない</strong></p><p class="text-xs text-slate-400 mt-0.5">"ケアレスミス"で終了</p></div>
          </li>
        </ul>
      </div>

      <div class="bg-brand-50 rounded-3xl p-8 border border-brand-200 reveal-right relative">
        <!-- Arrow (desktop) -->
        <div class="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center z-10">
          <i class="fas fa-arrow-right text-brand-600"></i>
        </div>
        <div class="flex items-center gap-3 mb-6">
          <span class="w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">◎</span>
          <p class="font-round font-black text-brand-700">MedPathを始めると…</p>
        </div>
        <ul class="space-y-5">
          <li class="flex gap-3 items-start">
            <span class="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 shrink-0 mt-0.5"><i class="fas fa-check text-xs"></i></span>
            <div><p class="text-sm text-slate-700 font-medium">毎週、<strong class="text-brand-700">やることが決まっている</strong></p><p class="text-xs text-slate-400 mt-0.5">迷いゼロで机に向かえる</p></div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 shrink-0 mt-0.5"><i class="fas fa-check text-xs"></i></span>
            <div><p class="text-sm text-slate-700 font-medium">ミスの原因が分類され、<strong class="text-brand-700">対策が固定される</strong></p><p class="text-xs text-slate-400 mt-0.5">同じ失点が消える</p></div>
          </li>
          <li class="flex gap-3 items-start">
            <span class="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600 shrink-0 mt-0.5"><i class="fas fa-check text-xs"></i></span>
            <div><p class="text-sm text-slate-700 font-medium">志望校までの<strong class="text-brand-700">最短ルートが見える</strong></p><p class="text-xs text-slate-400 mt-0.5">やらないことも決まる</p></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="text-center mt-10 reveal">
      <a href="#final-cta" class="btn-primary inline-flex">
        <i class="fas fa-calendar-check"></i>無料相談で「今週の勝ち筋」を持ち帰る
      </a>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 05. THREE PILLARS (Fit: 秘密1/2/3の直販構造)                 -->
<!-- ============================================================ -->
<section id="how" class="section-brand-light py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-14 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round tracking-wide">3 PILLARS</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">
        成績が伸びる<span class="text-highlight">3つの秘密</span>
      </h2>
      <p class="text-slate-500 text-sm mt-3">やる気でも才能でもない。<strong class="text-slate-700">仕組み</strong>が結果を変えます。</p>
    </div>

    <div class="grid md:grid-cols-3 gap-5 lg:gap-7 stagger">
      <div class="pillar-card pillar-1 reveal">
        <div class="flex items-center gap-3 mb-5">
          <span class="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shadow-md">01</span>
          <div>
            <p class="text-xs text-brand-500 font-bold">SECRET 1</p>
            <h3 class="font-round font-black text-lg text-slate-800">逆算設計</h3>
          </div>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed mb-5">志望校の配点・出題傾向から逆算し、「何を・いつまでに・どの順番で」を科目別に設計。最短ルートを明確にします。</p>
        <div class="flex flex-wrap gap-2">
          <span class="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-lg">科目配分</span>
          <span class="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-lg">教材選定</span>
          <span class="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-lg">週次計画</span>
        </div>
      </div>
      <div class="pillar-card pillar-2 reveal">
        <div class="flex items-center gap-3 mb-5">
          <span class="w-12 h-12 bg-gradient-to-br from-success-600 to-success-400 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shadow-md">02</span>
          <div>
            <p class="text-xs text-success-600 font-bold">SECRET 2</p>
            <h3 class="font-round font-black text-lg text-slate-800">質の担保</h3>
          </div>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed mb-5">ムダな勉強を切り、伸びるものだけ残す。理解→演習→復習の型で、「やったつもり」を防ぎます。</p>
        <div class="flex flex-wrap gap-2">
          <span class="bg-success-50 text-success-600 text-xs font-bold px-3 py-1.5 rounded-lg">理解→演習→復習</span>
          <span class="bg-success-50 text-success-600 text-xs font-bold px-3 py-1.5 rounded-lg">復習の型</span>
        </div>
      </div>
      <div class="pillar-card pillar-3 reveal">
        <div class="flex items-center gap-3 mb-5">
          <span class="w-12 h-12 bg-gradient-to-br from-accent-600 to-accent-400 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shadow-md">03</span>
          <div>
            <p class="text-xs text-accent-600 font-bold">SECRET 3</p>
            <h3 class="font-round font-black text-lg text-slate-800">継続の設計</h3>
          </div>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed mb-5">計画は崩れるのが前提。週次面談で即修正し、サボった週も取り戻す仕組みで伴走し続けます。</p>
        <div class="flex flex-wrap gap-2">
          <span class="bg-accent-50 text-accent-600 text-xs font-bold px-3 py-1.5 rounded-lg">週次面談</span>
          <span class="bg-accent-50 text-accent-600 text-xs font-bold px-3 py-1.5 rounded-lg">日次チェック</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA Band 2 ===== -->
<div class="cta-band-warm py-6 relative">
  <div class="relative max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-round font-bold text-sm text-center sm:text-left">仕組みの詳細、15分でお伝えできます。</p>
    <a href="#final-cta" class="bg-white text-accent-600 font-round font-bold text-sm px-7 py-3 rounded-xl transition hover:bg-accent-50 shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 06. MENTOR MATCHING                                           -->
<!-- ============================================================ -->
<section id="matching" class="section-white py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="reveal-left">
        <div class="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
          <i class="fas fa-star"></i>MedPath最大の特長
        </div>
        <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800 leading-tight mb-5">
          志望校の<span class="marker-line">"先輩"</span>が<br>受験のリアルを教えてくれる
        </h2>
        <p class="text-sm text-slate-600 leading-relaxed mb-8">
          志望校の戦い方、併願の考え方、大学生活の実態まで——<br>
          教科書には書いていない<strong class="text-brand-700">「経験者だけが知っている情報」</strong>をもとに伴走します。
        </p>
        <div class="space-y-5">
          <div class="flex gap-4 items-start">
            <div class="w-11 h-11 bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 font-round shadow-md">1</div>
            <div>
              <p class="font-bold text-slate-800 text-sm">志望校・現状・制約をヒアリング</p>
              <p class="text-xs text-slate-500 mt-1">あなたの「今」を丁寧に聞き取ります</p>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <div class="w-11 h-11 bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 font-round shadow-md">2</div>
            <div>
              <p class="font-bold text-slate-800 text-sm">志望校メンターを優先アサイン</p>
              <p class="text-xs text-slate-500 mt-1">可能な範囲で最適なメンターをマッチング</p>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <div class="w-11 h-11 bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 font-round shadow-md">3</div>
            <div>
              <p class="font-bold text-slate-800 text-sm">毎週、勝ち筋を一緒に更新</p>
              <p class="text-xs text-slate-500 mt-1">面談→計画修正→実行のサイクル</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Map -->
      <div class="reveal-right">
        <div class="bg-gradient-to-br from-slate-50 to-brand-50 rounded-3xl p-8 border border-slate-100">
          <svg viewBox="0 0 360 340" class="w-full max-w-[280px] mx-auto" fill="none">
            <path d="M250 40 L270 60 L280 100 L260 140 L270 175 L250 230 L230 265 L210 285 L190 300 L170 305 L155 295 L140 270 L130 240 L120 205 L130 175 L120 140 L130 100 L150 70 L175 55 L215 42 Z" fill="#e0e7ff" stroke="#a5b4fc" stroke-width="1.5"/>
            <ellipse cx="230" cy="180" rx="38" ry="32" fill="#6366f1" fill-opacity="0.08" stroke="#6366f1" stroke-width="2" stroke-dasharray="6"/>
            <text x="230" y="185" text-anchor="middle" fill="#4338ca" font-size="10" font-weight="bold" font-family="Zen Maru Gothic, sans-serif">関東中心</text>
            <circle cx="240" cy="168" r="3.5" fill="#6366f1" class="map-pulse"/>
            <circle cx="222" cy="177" r="3.5" fill="#6366f1" class="map-pulse" style="animation-delay:.4s"/>
            <circle cx="245" cy="192" r="3" fill="#6366f1" class="map-pulse" style="animation-delay:.8s"/>
            <circle cx="225" cy="197" r="3.5" fill="#6366f1" class="map-pulse" style="animation-delay:1.2s"/>
            <circle cx="160" cy="215" r="2.5" fill="#a5b4fc" class="map-pulse" style="animation-delay:.5s"/>
            <circle cx="175" cy="155" r="2.5" fill="#a5b4fc" class="map-pulse" style="animation-delay:.9s"/>
            <circle cx="150" cy="260" r="2.5" fill="#a5b4fc" class="map-pulse" style="animation-delay:1.3s"/>
            <circle cx="195" cy="125" r="2.5" fill="#a5b4fc" class="map-pulse" style="animation-delay:.3s"/>
            <circle cx="140" cy="170" r="2.5" fill="#a5b4fc" class="map-pulse" style="animation-delay:1s"/>
          </svg>
          <div class="flex justify-center gap-6 mt-5">
            <span class="flex items-center gap-2 text-xs text-slate-600 font-medium"><span class="w-3 h-3 bg-brand-600 rounded-full"></span>関東エリア</span>
            <span class="flex items-center gap-2 text-xs text-slate-600 font-medium"><span class="w-3 h-3 bg-brand-300 rounded-full"></span>全国対応</span>
          </div>
          <div class="text-center mt-5 bg-white rounded-2xl py-4 px-5 shadow-sm border border-brand-100">
            <p class="font-round font-bold text-brand-700 text-sm">
              <i class="fas fa-university mr-1"></i>30校以上の医学部メンターが在籍
            </p>
            <p class="text-[11px] text-slate-400 mt-1">※時期により変動します</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 07. METHOD TIMELINE (S1-S6)                                   -->
<!-- ============================================================ -->
<section id="method" class="section-warm py-16 md:py-24">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-14 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round tracking-wide">6-STEP METHOD</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">
        勉強法は<span class="text-highlight">フェーズ</span>で変わる。<br class="sm:hidden">だから迷走しない。
      </h2>
    </div>
    <div class="space-y-5 reveal">
      <div class="method-step">
        <div class="method-num bg-gradient-to-br from-brand-700 to-brand-600 shadow-md">S1</div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
          <p class="font-round font-bold text-slate-800 mb-1">大舵 ― 志望校仕様を定義</p>
          <p class="text-sm text-slate-500">目標から逆算し、必要な到達ラインを科目別に設計。</p>
        </div>
      </div>
      <div class="method-step">
        <div class="method-num bg-gradient-to-br from-brand-600 to-brand-500 shadow-md">S2</div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
          <p class="font-round font-bold text-slate-800 mb-1">現状把握 ― 点数より原因</p>
          <p class="text-sm text-slate-500">模試の点数ではなく「なぜ落としたか」を分類して、伸ばす要素を特定。</p>
        </div>
      </div>
      <div class="method-step">
        <div class="method-num bg-gradient-to-br from-brand-500 to-brand-400 shadow-md">S3</div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
          <p class="font-round font-bold text-slate-800 mb-1">基礎完璧 ― 伸びる土台</p>
          <p class="text-sm text-slate-500">応用の前に、基礎の「穴」を潰す。土台なしの応用はムダになるから。</p>
        </div>
      </div>
      <div class="method-step">
        <div class="method-num bg-gradient-to-br from-blue-600 to-blue-500 shadow-md">S4</div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
          <p class="font-round font-bold text-slate-800 mb-1">応用 ― 解ける形にする</p>
          <p class="text-sm text-slate-500">「わかる」を「解ける」に変える演習設計。パターンを型として定着。</p>
        </div>
      </div>
      <div class="method-step">
        <div class="method-num bg-gradient-to-br from-blue-500 to-indigo-400 shadow-md">S5</div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
          <p class="font-round font-bold text-slate-800 mb-1">実戦 ― 傾向→対策→検証</p>
          <p class="text-sm text-slate-500">過去問分析から頻出パターンと時間配分を最適化。</p>
        </div>
      </div>
      <div class="method-step">
        <div class="method-num bg-gradient-to-br from-success-600 to-success-400 shadow-md">S6</div>
        <div class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
          <p class="font-round font-bold text-slate-800 mb-1">改善 ― 良いものだけ残す</p>
          <p class="text-sm text-slate-500">効果の出た勉強法を残し、薄いものは切る。常にPDCAを回す。</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 08. ERROR TAXONOMY                                            -->
<!-- ============================================================ -->
<section class="section-white py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10 reveal">
      <p class="text-danger-500 font-bold text-sm mb-2 font-round tracking-wide">ERROR TAXONOMY</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">
        "ケアレスミス"で終わらせない。<br><span class="text-highlight">ミスは7つに分類</span>できる。
      </h2>
    </div>
    <div class="flex flex-wrap justify-center gap-2.5 mb-10 reveal">
      <span class="error-tag bg-red-50 text-red-700 border border-red-200">知識不足</span>
      <span class="error-tag bg-orange-50 text-orange-700 border border-orange-200">理解不足</span>
      <span class="error-tag bg-yellow-50 text-yellow-700 border border-yellow-200">手順不足</span>
      <span class="error-tag bg-emerald-50 text-emerald-700 border border-emerald-200">転移不足</span>
      <span class="error-tag bg-blue-50 text-blue-700 border border-blue-200">戦略不足</span>
      <span class="error-tag bg-violet-50 text-violet-700 border border-violet-200">設計ミス</span>
      <span class="error-tag bg-pink-50 text-pink-700 border border-pink-200">検算不足</span>
    </div>
    <div class="grid md:grid-cols-2 gap-5 reveal">
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition">
        <span class="inline-block bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-lg mb-4">検算不足</span>
        <div class="bg-pink-50 rounded-xl p-5">
          <p class="text-sm text-slate-700 font-medium"><i class="fas fa-exclamation-circle text-pink-400 mr-1"></i>計算ミスが多い</p>
          <p class="text-sm text-slate-600 mt-2">→ "検算不足"とわかれば、<strong class="text-brand-700">チェック手順を固定する</strong>だけで解決。</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition">
        <span class="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-lg mb-4">手順不足</span>
        <div class="bg-yellow-50 rounded-xl p-5">
          <p class="text-sm text-slate-700 font-medium"><i class="fas fa-exclamation-circle text-yellow-400 mr-1"></i>解法が浮かばない</p>
          <p class="text-sm text-slate-600 mt-2">→ "手順不足"とわかれば、<strong class="text-brand-700">解法パターンの型を作る</strong>ことで克服。</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 09. VOICES (そら塾: 成績UPカード + あすなろ: 長めの体験談)   -->
<!-- ============================================================ -->
<section id="voices" class="section-warm py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10 reveal">
      <p class="text-success-600 font-bold text-sm mb-2 font-round tracking-wide">VOICES</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">
        受講生に起きている<span class="text-highlight">変化</span>
      </h2>
    </div>
    <div class="voice-carousel-v2 reveal">
      <div class="voice-v2">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-lg">高3・男子</span>
          <span class="score-badge"><i class="fas fa-arrow-up text-[10px]"></i>偏差値 55→67</span>
        </div>
        <p class="text-sm text-slate-700 leading-relaxed mb-5">「計画の立て直しで復習が回るようになりました。毎週やることが決まっているから、迷いがなくなった。メンターの先生が同じ大学出身で、過去問の傾向も教えてもらえて助かりました。」</p>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center"><i class="fas fa-user text-brand-400"></i></div>
          <div><p class="text-xs font-bold text-slate-700">T.K. さん</p><p class="text-[11px] text-slate-400">私立医学部 合格</p></div>
        </div>
      </div>
      <div class="voice-v2">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="bg-success-50 text-success-600 text-xs font-bold px-3 py-1 rounded-lg">高2・女子</span>
          <span class="score-badge"><i class="fas fa-arrow-up text-[10px]"></i>数学 +40点</span>
        </div>
        <p class="text-sm text-slate-700 leading-relaxed mb-5">「ミス分類で同じ失点が消えました。"ケアレスミス"の正体がわかって、対策が具体的になった。自分の弱点が言語化されるのが新鮮でした。」</p>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 bg-success-50 rounded-full flex items-center justify-center"><i class="fas fa-user text-success-400"></i></div>
          <div><p class="text-xs font-bold text-slate-700">M.S. さん</p><p class="text-[11px] text-slate-400">国公立医学部 志望</p></div>
        </div>
      </div>
      <div class="voice-v2">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="bg-purple-50 text-purple-600 text-xs font-bold px-3 py-1 rounded-lg">保護者</span>
        </div>
        <p class="text-sm text-slate-700 leading-relaxed mb-5">「不安が減りました。やることが可視化されて、子どもが何を頑張っているか見えるようになった。親としても安心感が全然違います。毎週のレポートが嬉しい。」</p>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center"><i class="fas fa-user text-purple-400"></i></div>
          <div><p class="text-xs font-bold text-slate-700">Y.N. さん（保護者）</p><p class="text-[11px] text-slate-400">高3のお母さま</p></div>
        </div>
      </div>
      <div class="voice-v2">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-lg">高3・男子</span>
          <span class="score-badge"><i class="fas fa-arrow-up text-[10px]"></i>E判定→合格</span>
        </div>
        <p class="text-sm text-slate-700 leading-relaxed mb-5">「志望校メンターから聞いた"実際の併願戦略"が一番参考になりました。偏差値だけでは見えない情報がもらえて、自信を持って受験に臨めた。」</p>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center"><i class="fas fa-user text-brand-400"></i></div>
          <div><p class="text-xs font-bold text-slate-700">R.A. さん</p><p class="text-[11px] text-slate-400">国公立医学部 合格</p></div>
        </div>
      </div>
      <div class="voice-v2">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="bg-accent-50 text-accent-600 text-xs font-bold px-3 py-1 rounded-lg">高1・男子</span>
        </div>
        <p class="text-sm text-slate-700 leading-relaxed mb-5">「高1から始めて正解でした。早めに勉強の"型"を知れたので、周りが焦り始める頃には自分のペースが確立できていて、余裕が生まれました。」</p>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 bg-accent-50 rounded-full flex items-center justify-center"><i class="fas fa-user text-accent-400"></i></div>
          <div><p class="text-xs font-bold text-slate-700">K.H. さん</p><p class="text-[11px] text-slate-400">医学部受験準備中</p></div>
        </div>
      </div>
      <div class="voice-v2">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="bg-purple-50 text-purple-600 text-xs font-bold px-3 py-1 rounded-lg">保護者</span>
        </div>
        <p class="text-sm text-slate-700 leading-relaxed mb-5">「塾を3つ掛け持ちして疲弊していた息子が、MedPathに絞ってから成績も表情も変わりました。本人が"やるべきこと"を自分で語れるようになったのが一番の変化です。」</p>
        <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div class="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center"><i class="fas fa-user text-purple-400"></i></div>
          <div><p class="text-xs font-bold text-slate-700">A.M. さん（保護者）</p><p class="text-[11px] text-slate-400">高3のお父さま</p></div>
        </div>
      </div>
    </div>
    <p class="text-center text-xs text-slate-400 mt-6">※個人の体験であり、成果を保証するものではありません。</p>
  </div>
</section>

<!-- ===== CTA Band 3 ===== -->
<div class="cta-band py-6 relative">
  <div class="relative max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-round font-bold text-sm text-center sm:text-left">あなたの「勝ち筋」を、一緒に見つけませんか？</p>
    <a href="#final-cta" class="btn-primary btn-sm shadow-lg"><i class="fas fa-calendar-check"></i>無料で相談する</a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 10. DELIVERABLES                                              -->
<!-- ============================================================ -->
<section class="section-white py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round tracking-wide">WEEKLY DELIVERABLES</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">毎週、<span class="text-highlight">これ</span>を一緒に作ります</h2>
      <p class="text-slate-500 text-sm mt-3">面談は「話して終わり」ではありません</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
      <div class="glass-card p-6 text-center reveal">
        <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl flex items-center justify-center text-2xl">📋</div>
        <p class="text-[11px] text-brand-600 font-bold mb-1">毎週</p>
        <p class="font-round font-bold text-slate-800">学習計画</p>
        <p class="text-xs text-slate-500 mt-1">やること・順番・量を明確に</p>
      </div>
      <div class="glass-card p-6 text-center reveal">
        <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-success-100 to-emerald-200 rounded-2xl flex items-center justify-center text-2xl">🔍</div>
        <p class="text-[11px] text-success-600 font-bold mb-1">毎週</p>
        <p class="font-round font-bold text-slate-800">振り返り</p>
        <p class="text-xs text-slate-500 mt-1">なぜできなかったかを分析</p>
      </div>
      <div class="glass-card p-6 text-center reveal">
        <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center text-2xl">🔧</div>
        <p class="text-[11px] text-purple-600 font-bold mb-1">毎週</p>
        <p class="font-round font-bold text-slate-800">修正プラン</p>
        <p class="text-xs text-slate-500 mt-1">次週の勝ち筋を再設計</p>
      </div>
      <div class="glass-card p-6 text-center reveal">
        <div class="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-accent-100 to-amber-200 rounded-2xl flex items-center justify-center text-2xl">🤝</div>
        <p class="text-[11px] text-accent-600 font-bold mb-1">随時</p>
        <p class="font-round font-bold text-slate-800">意思決定相談</p>
        <p class="text-xs text-slate-500 mt-1">併願・教材・戦略の相談</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 11. PLANS                                                     -->
<!-- ============================================================ -->
<section id="plans" class="section-brand-light py-16 md:py-24">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round tracking-wide">PLANS</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">あなたに合った<span class="text-highlight">伴走スタイル</span></h2>
      <p class="text-slate-500 text-sm mt-3">すべてのプランに初回オンボーディング（90分）が含まれます</p>
    </div>
    <div class="grid md:grid-cols-3 gap-5 lg:gap-7 stagger">
      <!-- Light -->
      <div class="plan-v2 text-center reveal">
        <p class="text-xs font-bold text-slate-400 mb-1 tracking-widest">LIGHT</p>
        <h3 class="font-round font-black text-xl text-slate-800 mb-3">ライト</h3>
        <div class="mb-5">
          <p class="font-round font-black text-4xl text-slate-800">¥29,800<span class="text-base font-medium text-slate-400">/月</span></p>
          <p class="text-[11px] text-slate-400">税込</p>
        </div>
        <ul class="text-sm text-slate-600 space-y-3 text-left mb-7">
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>月2回のZoom面談</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>チャットサポート</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>学習計画テンプレート</span></li>
          <li class="flex gap-2.5 text-slate-300"><i class="fas fa-minus mt-0.5 shrink-0"></i><span>週次伴走</span></li>
          <li class="flex gap-2.5 text-slate-300"><i class="fas fa-minus mt-0.5 shrink-0"></i><span>添削・面接対策</span></li>
        </ul>
        <a href="#final-cta" class="block bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm py-3.5 rounded-xl transition font-round">まずは無料相談</a>
      </div>
      <!-- Standard -->
      <div class="plan-v2 plan-featured text-center reveal relative">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-bold px-5 py-1.5 rounded-full font-round shadow-md">
          <i class="fas fa-crown mr-1"></i>おすすめ
        </div>
        <p class="text-xs font-bold text-brand-500 mb-1 tracking-widest">STANDARD</p>
        <h3 class="font-round font-black text-xl text-slate-800 mb-3">スタンダード</h3>
        <div class="mb-5">
          <p class="font-round font-black text-4xl text-brand-700">¥49,800<span class="text-base font-medium text-slate-400">/月</span></p>
          <p class="text-[11px] text-slate-400">税込</p>
        </div>
        <ul class="text-sm text-slate-700 space-y-3 text-left mb-7 font-medium">
          <li class="flex gap-2.5"><i class="fas fa-check text-brand-500 mt-0.5 shrink-0"></i><span>月4回のZoom面談</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-brand-500 mt-0.5 shrink-0"></i><span>週次伴走サイクル</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-brand-500 mt-0.5 shrink-0"></i><span>チャットサポート</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-brand-500 mt-0.5 shrink-0"></i><span>計画＋振り返り＋修正</span></li>
          <li class="flex gap-2.5 text-slate-300"><i class="fas fa-minus mt-0.5 shrink-0"></i><span>添削・面接対策</span></li>
        </ul>
        <a href="#final-cta" class="block btn-primary text-sm py-3.5 justify-center font-round">無料相談を予約する</a>
      </div>
      <!-- Premium -->
      <div class="plan-v2 text-center reveal">
        <p class="text-xs font-bold text-slate-400 mb-1 tracking-widest">PREMIUM</p>
        <h3 class="font-round font-black text-xl text-slate-800 mb-3">プレミアム</h3>
        <div class="mb-5">
          <p class="font-round font-black text-4xl text-slate-800">¥79,800<span class="text-base font-medium text-slate-400">/月</span></p>
          <p class="text-[11px] text-slate-400">税込</p>
        </div>
        <ul class="text-sm text-slate-600 space-y-3 text-left mb-7">
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>月4回のZoom面談</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>週次伴走サイクル</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>優先チャットサポート</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>小論文添削・面接対策</span></li>
          <li class="flex gap-2.5"><i class="fas fa-check text-success-500 mt-0.5 shrink-0"></i><span>日次チェック対応</span></li>
        </ul>
        <a href="#final-cta" class="block bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm py-3.5 rounded-xl transition font-round">まずは無料相談</a>
      </div>
    </div>
    <p class="text-center text-xs text-slate-400 mt-8 reveal">
      <i class="fas fa-info-circle text-brand-400 mr-1"></i>
      初月はオンボーディング（90分ヒアリング＋戦略サマリ）を実施。返金条件はFAQをご覧ください。
    </p>
  </div>
</section>

<!-- ============================================================ -->
<!-- 12. MATCHING OPTION                                           -->
<!-- ============================================================ -->
<section class="section-white py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gradient-to-br from-accent-50 via-amber-50 to-orange-50 rounded-[32px] p-8 md:p-12 border border-accent-200 reveal">
      <div class="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div class="inline-flex items-center gap-2 bg-accent-200 text-accent-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <i class="fas fa-puzzle-piece"></i>オプション
          </div>
          <h2 class="font-round text-xl sm:text-2xl font-black text-slate-800 mb-4">志望校メンター<br>優先アサイン</h2>
          <p class="text-sm text-slate-600 leading-relaxed mb-3">
            希少メンターの優先配置のための運営コストです。<br>裏情報提供ではありません。
          </p>
          <p class="text-xs text-slate-400">※在籍状況により優先アサインが難しい場合もあります。</p>
        </div>
        <div class="bg-white rounded-3xl p-7 text-center shadow-sm border border-slate-100">
          <p class="font-round font-bold text-slate-500 text-sm mb-2">月額オプション</p>
          <p class="font-round font-black text-4xl text-slate-800 mb-5">¥9,800<span class="text-sm font-medium text-slate-400">/月（税込）</span></p>
          <ul class="text-sm text-slate-600 space-y-2.5 text-left mb-6">
            <li class="flex gap-2.5"><i class="fas fa-check text-accent-500 mt-0.5 shrink-0"></i>志望校メンター優先配置</li>
            <li class="flex gap-2.5"><i class="fas fa-check text-accent-500 mt-0.5 shrink-0"></i>受験体験談の共有</li>
            <li class="flex gap-2.5"><i class="fas fa-check text-accent-500 mt-0.5 shrink-0"></i>大学生活リアル情報</li>
            <li class="flex gap-2.5"><i class="fas fa-check text-accent-500 mt-0.5 shrink-0"></i>併願戦略アドバイス</li>
          </ul>
          <a href="#final-cta" class="block btn-primary text-sm py-3.5 justify-center">空き状況を確認する</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 13. STEP FLOW                                                 -->
<!-- ============================================================ -->
<section id="flow" class="section-warm py-16 md:py-24">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-14 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round tracking-wide">5 STEPS TO START</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">受講の流れ</h2>
      <p class="text-slate-500 text-sm mt-3">最短5日で伴走スタート</p>
    </div>
    <div class="space-y-0 reveal">
      <div class="flow-line flex gap-5 items-start pb-8">
        <div class="w-14 h-14 bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shrink-0 z-10 shadow-md">1</div>
        <div class="pt-2.5">
          <p class="font-round font-bold text-slate-800">無料相談（15分）</p>
          <p class="text-sm text-slate-500 mt-1">まずはお気軽に。オンラインで完結します。</p>
        </div>
      </div>
      <div class="flow-line flex gap-5 items-start pb-8">
        <div class="w-14 h-14 bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shrink-0 z-10 shadow-md">2</div>
        <div class="pt-2.5">
          <p class="font-round font-bold text-slate-800">現状診断・志望校ヒアリング</p>
          <p class="text-sm text-slate-500 mt-1">あなたの「今」と「目標」を詳しく聞き取ります。</p>
        </div>
      </div>
      <div class="flow-line flex gap-5 items-start pb-8">
        <div class="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-400 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shrink-0 z-10 shadow-md">3</div>
        <div class="pt-2.5">
          <p class="font-round font-bold text-slate-800">メンター決定</p>
          <p class="text-sm text-slate-500 mt-1">最適なメンターをマッチングしてご紹介。</p>
        </div>
      </div>
      <div class="flow-line flex gap-5 items-start pb-8">
        <div class="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-400 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shrink-0 z-10 shadow-md">4</div>
        <div class="pt-2.5">
          <p class="font-round font-bold text-slate-800">初回オンボーディング（90分）</p>
          <p class="text-sm text-slate-500 mt-1">戦略設計・年間計画・初回の週次計画を作成。</p>
        </div>
      </div>
      <div class="flex gap-5 items-start">
        <div class="w-14 h-14 bg-gradient-to-br from-success-600 to-success-400 text-white rounded-2xl flex items-center justify-center font-round font-black text-lg shrink-0 z-10 shadow-md">5</div>
        <div class="pt-2.5">
          <p class="font-round font-bold text-slate-800">週次伴走スタート</p>
          <p class="text-sm text-success-600 font-bold mt-1"><i class="fas fa-flag-checkered mr-1"></i>ここから毎週のサイクルが始まります</p>
        </div>
      </div>
    </div>
    <div class="text-center mt-12 reveal">
      <a href="#final-cta" class="btn-primary inline-flex"><i class="fas fa-calendar-check"></i>まずは無料相談から始める</a>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 14. FAQ                                                       -->
<!-- ============================================================ -->
<section id="faq" class="section-white py-16 md:py-24">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 reveal">
      <p class="text-brand-600 font-bold text-sm mb-2 font-round tracking-wide">FAQ</p>
      <h2 class="font-round text-2xl sm:text-[2rem] font-black text-slate-800">よくある質問</h2>
    </div>
    <div class="space-y-3 reveal" id="faqList">
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 授業はしないんですか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">MedPathは「授業」ではなく「勉強法の設計と伴走」に特化しています。教科の指導が必要な場合は、既存の塾や予備校との併用がおすすめです。「何を、どの順番で、どれだけやるか」を決めることが成績向上の最大のレバーだと考えています。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 志望校メンターは必ず付きますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">「優先アサイン」制度のため、完全一致を保証するものではありません。ただし、近い大学群や同系統のメンターをアサインするなど、可能な限り最適なマッチングを行います。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 返金はありますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">初回オンボーディング完了後7日以内にご満足いただけなかった場合、全額返金いたします。詳細は利用規約に記載しています。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 親だけの相談もできますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">はい、保護者の方だけのご相談も大歓迎です。お子さまの学習状況の共有や受験戦略のご相談を承ります。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 推薦・面接にも対応しますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">プレミアムプランでは小論文添削・面接対策に対応しています。メンター自身の推薦入試経験を活かしたアドバイスが好評です。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. どのレベルから対象ですか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">偏差値40台から国公立志望まで幅広く対応しています。重要なのは偏差値ではなく「勝てるやり方を固定すること」です。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 塾や予備校と併用できますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">もちろんです。MedPathは「学習戦略の設計」に特化しているため、既存の塾との併用で最大の効果を発揮します。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 面談の曜日・時間は選べますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">メンターとの調整により、平日夕方〜夜・土日にも対応可能です。Zoomを使うので自宅からどこでも受講できます。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 途中でプラン変更はできますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">月単位でのプラン変更が可能です。ライトで試し、手応えを感じたらスタンダードに切り替える方も多いです。</p></div>
      </div>
      <div class="faq-item bg-white">
        <button class="faq-btn w-full flex items-center justify-between p-5 sm:p-6 text-left" onclick="toggleFaq(this)">
          <span class="font-round font-bold text-sm sm:text-[15px] text-slate-800 pr-4">Q. 高1・高2からでも意味がありますか？</span>
          <span class="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-brand-500 text-xs faq-chevron"></i></span>
        </button>
        <div class="faq-answer"><p class="text-sm text-slate-600 leading-relaxed">大いにあります。早期に「勉強の型」を身につけることで、高3時の伸びが大きく変わります。</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA Band 4 (FAQ後) ===== -->
<div class="cta-band-warm py-6 relative">
  <div class="relative max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
    <p class="text-white font-round font-bold text-sm text-center sm:text-left">まだ迷っていますか？ 15分で疑問を解消できます。</p>
    <a href="#final-cta" class="bg-white text-accent-600 font-round font-bold text-sm px-7 py-3 rounded-xl transition hover:bg-accent-50 shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 15. FINAL CTA                                                 -->
<!-- ============================================================ -->
<section id="final-cta" class="section-dark py-24 md:py-32 relative overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 left-10 w-60 h-60 bg-brand-400/10 rounded-full blur-3xl"></div>
    <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px); background-size: 80px 80px;"></div>
  </div>
  <div class="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
    <div class="reveal">
      <p class="text-brand-300 font-bold text-sm mb-4 font-round tracking-wide">START YOUR PATH</p>
      <h2 class="font-round text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
        まずは15分。<br>"今週の勝ち筋"だけ<br class="sm:hidden">持ち帰ってください。
      </h2>
      <p class="text-white/70 text-base sm:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
        あなたの現状と志望校を聞いて、やることを具体化します。<br>
        <strong class="text-amber-300">無料相談は完全無料。無理な勧誘はありません。</strong>
      </p>
    </div>
    <div class="flex flex-col sm:flex-row gap-4 justify-center reveal">
      <a href="#" class="btn-primary text-lg py-5 px-12 justify-center shadow-xl shadow-orange-500/30">
        <i class="fas fa-calendar-check"></i>無料相談（15分）を予約する
      </a>
      <a href="#" class="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur py-5 px-10 justify-center">
        <i class="fas fa-file-alt"></i>資料を見る<span class="text-sm opacity-60 ml-1">30秒</span>
      </a>
    </div>
  </div>
</section>

<!-- ===== FOOTER ===== -->
<footer class="bg-slate-900 py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
      <span class="font-round font-black text-lg text-white/80 flex items-center gap-2.5">
        <span class="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-sm"><i class="fas fa-graduation-cap"></i></span>
        MedPath
      </span>
      <div class="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
        <a href="#" class="hover:text-white transition">運営者情報</a>
        <a href="#" class="hover:text-white transition">特定商取引法に基づく表記</a>
        <a href="#" class="hover:text-white transition">プライバシーポリシー</a>
        <a href="#" class="hover:text-white transition">利用規約</a>
      </div>
    </div>
    <div class="border-t border-slate-800 pt-6">
      <p class="text-center text-xs text-slate-500">&copy; 2026 MedPath Inc. All rights reserved.</p>
    </div>
  </div>
</footer>

<!-- ===== MOBILE STICKY CTA ===== -->
<div class="mobile-sticky">
  <a href="#final-cta" class="flex-1 flex items-center justify-center bg-gradient-to-r from-accent-500 to-accent-400 text-white font-round font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-accent-500/25">
    <i class="fas fa-calendar-check mr-2 text-xs"></i>無料相談 15分
  </a>
  <a href="#final-cta" class="flex-1 flex items-center justify-center bg-slate-100 text-slate-700 font-round font-bold text-sm py-3.5 rounded-xl">
    <i class="fas fa-file-alt mr-2 text-xs"></i>資料を見る 30秒
  </a>
</div>

<!-- ===== JAVASCRIPT ===== -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // === Scroll reveal with stagger ===
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        // Stagger children
        if (e.target.classList.contains('stagger')) {
          e.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(child => {
            child.classList.add('show');
          });
        }
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach(el => io.observe(el));

  // === Header ===
  const hdr = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      hdr.classList.add('header-scrolled');
      hdr.classList.remove('header-glass');
    } else {
      hdr.classList.remove('header-scrolled');
      hdr.classList.add('header-glass');
    }
    lastScroll = y;
  }, { passive: true });

  // === Mobile menu ===
  const mobBtn = document.getElementById('mobMenuBtn');
  const mobMenu = document.getElementById('mobMenu');
  mobBtn.addEventListener('click', () => mobMenu.classList.toggle('hidden'));
  document.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => mobMenu.classList.add('hidden')));

  // === Smooth scroll ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const offset = 80;
        const pos = t.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // === Active nav highlight ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.hdr-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.pageYOffset >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(l => {
      l.classList.remove('!text-white', '!text-brand-600');
      if (l.getAttribute('href') === '#' + current) {
        if (hdr.classList.contains('header-scrolled')) l.classList.add('!text-brand-600');
        else l.classList.add('!text-white');
      }
    });
  }, { passive: true });
});

// === FAQ ===
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const ans = btn.nextElementSibling;
  const isOpen = ans.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-active'));

  if (!isOpen) {
    ans.classList.add('open');
    item.classList.add('faq-active');
  }
}
</script>
</body>
</html>`
}

export default app
