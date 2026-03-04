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
  <meta name="description" content="志望校から逆算して毎週やること・順番・量を設計。現役医学生メンターが伴走するオンラインメンタリング。">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800;900&family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans:['Noto Sans JP','sans-serif'], round:['Zen Maru Gothic','sans-serif'] },
          colors: {
            primary: { 50:'#e8f5e9',100:'#c8e6c9',200:'#a5d6a7',300:'#81c784',400:'#66bb6a',500:'#4caf50',600:'#43a047',700:'#388e3c',800:'#2e7d32',900:'#1b5e20' },
            warm: { 50:'#fff8e1',100:'#ffecb3',200:'#ffe082',300:'#ffd54f',400:'#ffca28',500:'#ffc107' },
            coral: { 50:'#fce4ec',100:'#f8bbd0',400:'#ef5350',500:'#e53935',600:'#c62828' },
            sky: { 50:'#e3f2fd',100:'#bbdefb',200:'#90caf9',500:'#2196f3',600:'#1e88e5',700:'#1565c0' },
            cream: '#fffdf7',
            paper: '#fefcf6'
          }
        }
      }
    }
  </script>
  <style>
    html { scroll-behavior: smooth; }
    body { font-family: 'Noto Sans JP', sans-serif; color: #333; background: #fffdf7; }
    .font-round { font-family: 'Zen Maru Gothic', sans-serif; }

    /* ===== Animations ===== */
    .reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
    .reveal.show { opacity:1; transform:translateY(0); }

    /* ===== Hero ===== */
    .hero-bg {
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 30%, #fff8e1 100%);
      position: relative;
    }
    .hero-bg::after {
      content:''; position:absolute; bottom:-1px; left:0; right:0; height:60px;
      background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 C480,60 960,20 1440,40 L1440,60 L0,60 Z' fill='%23fffdf7'/%3E%3C/svg%3E") no-repeat bottom/cover;
    }

    /* ===== Marker underline ===== */
    .marker-yellow { background: linear-gradient(transparent 55%, #ffe082 55%); padding: 0 2px; }
    .marker-green { background: linear-gradient(transparent 55%, #c8e6c9 55%); padding: 0 2px; }
    .marker-pink { background: linear-gradient(transparent 55%, #f8bbd0 55%); padding: 0 2px; }

    /* ===== Speech bubbles ===== */
    .bubble-parent {
      background: #fff; border: 2px solid #ffe082; border-radius: 20px; padding: 18px 22px;
      position: relative; max-width: 380px;
    }
    .bubble-parent::after {
      content:''; position:absolute; bottom:-12px; left:30px;
      border-left: 12px solid transparent; border-right: 12px solid transparent;
      border-top: 14px solid #ffe082;
    }
    .bubble-parent::before {
      content:''; position:absolute; bottom:-9px; left:32px;
      border-left: 10px solid transparent; border-right: 10px solid transparent;
      border-top: 12px solid #fff; z-index:1;
    }
    .bubble-staff {
      background: #e8f5e9; border: 2px solid #a5d6a7; border-radius: 20px; padding: 18px 22px;
      position: relative; max-width: 420px;
    }
    .bubble-staff::after {
      content:''; position:absolute; bottom:-12px; right:30px;
      border-left: 12px solid transparent; border-right: 12px solid transparent;
      border-top: 14px solid #a5d6a7;
    }
    .bubble-staff::before {
      content:''; position:absolute; bottom:-9px; right:32px;
      border-left: 10px solid transparent; border-right: 10px solid transparent;
      border-top: 12px solid #e8f5e9; z-index:1;
    }

    /* ===== Sections ===== */
    .bg-cream { background: #fffdf7; }
    .bg-soft-green { background: linear-gradient(180deg, #e8f5e9 0%, #fffdf7 100%); }
    .bg-soft-yellow { background: linear-gradient(180deg, #fff8e1 0%, #fffdf7 100%); }
    .bg-soft-blue { background: linear-gradient(180deg, #e3f2fd 0%, #fffdf7 100%); }
    .bg-green-solid { background: #43a047; }

    /* ===== Worry cards ===== */
    .worry-card {
      background: #fff; border-radius: 20px; padding: 24px 20px;
      border: 2px solid #ffe082; text-align: center;
      transition: transform .2s; box-shadow: 0 2px 12px rgba(0,0,0,.04);
    }
    .worry-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.08); }

    /* ===== Reason / Feature cards ===== */
    .reason-card {
      background: #fff; border-radius: 24px; padding: 32px 24px;
      border: 1px solid #e0e0e0; box-shadow: 0 4px 16px rgba(0,0,0,.04);
      position: relative; overflow: hidden;
    }
    .reason-card::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; }
    .reason-card.rc-green::before { background: linear-gradient(90deg, #43a047, #66bb6a); }
    .reason-card.rc-orange::before { background: linear-gradient(90deg, #ff9800, #ffb74d); }
    .reason-card.rc-blue::before { background: linear-gradient(90deg, #1e88e5, #64b5f6); }

    /* ===== Big number ===== */
    .big-num { font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; color: #43a047; line-height: 1; }

    /* ===== Plan cards ===== */
    .plan-card {
      background: #fff; border-radius: 24px; padding: 32px 24px;
      border: 2px solid #e0e0e0; transition: all .3s;
    }
    .plan-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.08); }
    .plan-card.recommended { border-color: #43a047; box-shadow: 0 4px 20px rgba(67,160,71,.15); }

    /* ===== CTA buttons ===== */
    .cta-primary {
      background: linear-gradient(135deg, #ff9800, #f57c00);
      color: #fff; font-weight: 800; border-radius: 60px;
      padding: 18px 36px; font-size: 1rem;
      box-shadow: 0 6px 20px rgba(255,152,0,.35);
      transition: all .2s; display: inline-flex; align-items: center; gap: 10px;
      text-decoration: none; font-family: 'Zen Maru Gothic', sans-serif;
    }
    .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,152,0,.4); }
    .cta-sm { padding: 12px 24px; font-size: .875rem; }

    /* ===== CTA Bands ===== */
    .cta-band-green { background: linear-gradient(135deg, #2e7d32, #43a047); }
    .cta-band-orange { background: linear-gradient(135deg, #e65100, #ff9800); }

    /* ===== FAQ ===== */
    .faq-item {
      background: #fff; border-radius: 16px; border: 2px solid #c8e6c9;
      overflow: hidden; transition: border-color .25s;
    }
    .faq-item:hover { border-color: #66bb6a; }
    .faq-answer { max-height:0; overflow:hidden; transition: max-height .4s ease; }
    .faq-answer.open { max-height:500px; }
    .faq-chevron { transition: transform .3s; }
    .faq-active .faq-chevron { transform: rotate(180deg); }

    /* ===== Flow steps ===== */
    .flow-step { position: relative; }
    .flow-step::after {
      content:''; position:absolute; left:31px; top:64px; bottom:-16px;
      width: 3px; background: #c8e6c9; border-radius: 2px;
    }
    .flow-step:last-child::after { display: none; }

    /* ===== Method timeline ===== */
    .method-item { position: relative; padding-left: 56px; }
    .method-item::before {
      content:''; position:absolute; left:23px; top:48px; bottom:-16px;
      width: 2px; background: #c8e6c9;
    }
    .method-item:last-child::before { display: none; }

    /* ===== Header ===== */
    .hdr-fixed {
      position: fixed; top:0; left:0; right:0; z-index:50;
      background: rgba(255,253,247,.95); backdrop-filter: blur(8px);
      box-shadow: 0 1px 8px rgba(0,0,0,.06); transition: all .3s;
    }

    /* ===== Mobile bar ===== */
    .mobile-bar {
      position: fixed; bottom:0; left:0; right:0; z-index:100;
      background: rgba(255,253,247,.95); backdrop-filter: blur(8px);
      border-top: 2px solid #c8e6c9;
      box-shadow: 0 -4px 16px rgba(0,0,0,.08);
      padding: 10px 16px; display: none;
    }
    @media (max-width:767px) { .mobile-bar { display: flex; gap: 10px; } }

    /* ===== Misc ===== */
    .tag-pill { padding: 6px 16px; border-radius: 50px; font-size: .75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; }
    .avatar-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .error-tag { padding: 8px 18px; border-radius: 50px; font-size: .8rem; font-weight: 700; }
    .pillar-badge {
      width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-family: 'Zen Maru Gothic', sans-serif; font-weight: 900; font-size: 1.5rem; color: #fff;
    }
    @media (max-width:768px) { body { padding-bottom: 80px; } }

    /* ===== Life skill accent ===== */
    .life-icon-box {
      width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center;
      font-size: 1.75rem; color: #fff; flex-shrink: 0;
    }

    /* ===== Mentor highlight card ===== */
    .mentor-highlight {
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 40%, #fff8e1 100%);
      border: 3px solid #43a047; border-radius: 28px;
      position: relative; overflow: hidden;
    }
    .mentor-highlight::before {
      content: ''; position: absolute; top: -60px; right: -60px;
      width: 160px; height: 160px; background: rgba(67,160,71,.08); border-radius: 50%;
    }
  </style>
</head>
<body>

<!-- ===== HEADER ===== -->
<header class="hdr-fixed">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between h-16">
      <a href="#" class="font-round font-black text-xl text-primary-700 flex items-center gap-2">
        <span class="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm"><i class="fas fa-graduation-cap"></i></span>
        MedPath
      </a>
      <nav class="hidden lg:flex items-center gap-5 text-[13px] font-bold text-gray-500">
        <a href="#worries" class="hover:text-primary-600 transition">悩み</a>
        <a href="#how" class="hover:text-primary-600 transition">仕組み</a>
        <a href="#mentors" class="hover:text-primary-600 transition">メンター</a>
        <a href="#method" class="hover:text-primary-600 transition">メソッド</a>
        <a href="#life-skill" class="hover:text-primary-600 transition">一生の力</a>
        <a href="#plans" class="hover:text-primary-600 transition">プラン</a>
        <a href="#faq" class="hover:text-primary-600 transition">FAQ</a>
      </nav>
      <div class="hidden md:flex items-center gap-3">
        <a href="#final-cta" class="text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white rounded-full px-5 py-2.5 transition shadow-md shadow-orange-500/25">
          <i class="fas fa-calendar-check mr-1"></i>無料相談 15分
        </a>
      </div>
      <button id="mobMenuBtn" class="lg:hidden text-primary-600 p-2"><i class="fas fa-bars text-xl"></i></button>
    </div>
  </div>
  <div id="mobMenu" class="hidden lg:hidden bg-white shadow-lg rounded-b-2xl mx-3 border border-primary-100">
    <div class="py-3 px-5 flex flex-col gap-1 text-sm font-bold text-gray-600">
      <a href="#worries" class="mm-link py-2.5 hover:text-primary-600">悩み</a>
      <a href="#how" class="mm-link py-2.5 hover:text-primary-600">仕組み</a>
      <a href="#mentors" class="mm-link py-2.5 hover:text-primary-600">メンター</a>
      <a href="#method" class="mm-link py-2.5 hover:text-primary-600">メソッド</a>
      <a href="#life-skill" class="mm-link py-2.5 hover:text-primary-600">一生の力</a>
      <a href="#plans" class="mm-link py-2.5 hover:text-primary-600">プラン</a>
      <a href="#faq" class="mm-link py-2.5 hover:text-primary-600">FAQ</a>
      <div class="pt-2 mt-1 border-t">
        <a href="#final-cta" class="block text-center text-xs bg-orange-500 text-white font-bold py-2.5 rounded-lg">無料相談 15分</a>
      </div>
    </div>
  </div>
</header>

<!-- ============================================================ -->
<!-- 01. HERO                                                      -->
<!-- ============================================================ -->
<section class="hero-bg pt-24 pb-28 md:pt-32 md:pb-40">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
    <!-- Price tag -->
    <div class="flex justify-center mb-6 reveal">
      <div class="bg-white rounded-full px-6 py-2.5 shadow-md border border-primary-200 flex items-center gap-3">
        <span class="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">初回限定</span>
        <span class="font-round font-black text-primary-700 text-lg">無料相談 <span class="text-2xl">15</span>分</span>
        <span class="text-xs text-gray-400">/ オンライン完結</span>
      </div>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap justify-center gap-2 mb-6 reveal">
      <span class="tag-pill bg-primary-100 text-primary-700"><i class="fas fa-stethoscope mr-1"></i>医学部受験専門</span>
      <span class="tag-pill bg-warm-100 text-amber-700"><i class="fas fa-laptop mr-1"></i>オンライン完結</span>
      <span class="tag-pill bg-sky-50 text-sky-700"><i class="fas fa-users mr-1"></i>保護者相談OK</span>
    </div>

    <div class="text-center mb-8 reveal">
      <h1 class="font-round text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.4] mb-5">
        <span class="marker-yellow">「わかる」の笑顔</span>と<br>
        <span class="marker-green">「受かる」の自信</span>で<br>
        <span class="text-primary-700">医学部受験が変わる！</span>
      </h1>
      <p class="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
        志望校から逆算して、毎週<strong class="text-primary-700">「やること・順番・量」</strong>を設計。<br>
        現役医学生メンターが、あなた専用の勉強戦略で<strong>伴走</strong>します。
      </p>
    </div>

    <!-- CTA -->
    <div class="flex justify-center mb-8 reveal">
      <a href="#final-cta" class="cta-primary text-center justify-center">
        <i class="fas fa-calendar-check"></i>まずは無料で相談する<span class="text-xs font-normal opacity-80 ml-1">（15分）</span>
      </a>
    </div>

    <div class="flex justify-center gap-5 text-[13px] text-gray-400 mb-12 reveal">
      <a href="#final-cta" class="hover:text-primary-600 underline underline-offset-4 transition">受験生の方</a>
      <a href="#final-cta" class="hover:text-primary-600 underline underline-offset-4 transition">保護者の方</a>
    </div>

    <!-- Stats: 2 cards only -->
    <div class="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto reveal">
      <div class="bg-white rounded-2xl py-6 px-4 text-center shadow-sm border border-primary-100">
        <div class="w-12 h-12 mx-auto mb-2 bg-primary-50 rounded-full flex items-center justify-center">
          <i class="fas fa-university text-primary-600 text-xl"></i>
        </div>
        <p class="big-num text-4xl sm:text-5xl">30<span class="text-base sm:text-lg">校+</span></p>
        <p class="text-[11px] sm:text-xs text-gray-500 mt-1 font-medium">メンター所属大学数</p>
      </div>
      <div class="bg-white rounded-2xl py-6 px-4 text-center shadow-sm border border-primary-100">
        <div class="w-12 h-12 mx-auto mb-2 bg-primary-50 rounded-full flex items-center justify-center">
          <i class="fas fa-user-graduate text-primary-600 text-xl"></i>
        </div>
        <p class="big-num text-4xl sm:text-5xl">120<span class="text-base sm:text-lg">名+</span></p>
        <p class="text-[11px] sm:text-xs text-gray-500 mt-1 font-medium">登録メンター数</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 02. SOCIAL PROOF                                              -->
<!-- ============================================================ -->
<section class="bg-cream py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-10 reveal">
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800">
        数字でわかる<span class="marker-green">MedPathの安心</span>
      </h2>
      <p class="text-gray-500 text-sm mt-2">選ばれ続ける4つの理由</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-orange-100 hover:border-orange-300 hover:shadow-md transition">
        <div class="w-14 h-14 mx-auto mb-3 bg-orange-50 rounded-full flex items-center justify-center">
          <i class="fas fa-shield-alt text-2xl text-orange-400"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-sm">志望校メンター</p>
        <p class="text-xs text-orange-500 font-bold mt-0.5">優先アサイン制度</p>
      </div>
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-primary-100 hover:border-primary-300 hover:shadow-md transition">
        <div class="w-14 h-14 mx-auto mb-3 bg-primary-50 rounded-full flex items-center justify-center">
          <i class="fas fa-user-graduate text-2xl text-primary-500"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-sm">メンター全員</p>
        <p class="text-xs text-primary-600 font-bold mt-0.5">現役医学生</p>
      </div>
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-sky-100 hover:border-sky-300 hover:shadow-md transition">
        <div class="w-14 h-14 mx-auto mb-3 bg-sky-50 rounded-full flex items-center justify-center">
          <i class="fas fa-video text-2xl text-sky-500"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-sm">面談はすべて</p>
        <p class="text-xs text-sky-600 font-bold mt-0.5">Zoom完結</p>
      </div>
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-purple-100 hover:border-purple-300 hover:shadow-md transition">
        <div class="w-14 h-14 mx-auto mb-3 bg-purple-50 rounded-full flex items-center justify-center">
          <i class="fas fa-clipboard-check text-2xl text-purple-500"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-sm">学習設計テンプレ</p>
        <p class="text-xs text-purple-600 font-bold mt-0.5">毎週アップデート</p>
      </div>
    </div>
    <p class="text-center text-xs text-gray-400 mt-6">※在籍状況は時期により変動します。志望校メンターは「優先アサイン」制度であり、確約ではありません。</p>
  </div>
</section>

<!-- ============================================================ -->
<!-- 03. WORRIES                                                   -->
<!-- ============================================================ -->
<section id="worries" class="bg-soft-yellow py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-6 reveal">
      <span class="inline-block bg-coral-50 text-coral-500 font-round font-bold text-sm px-5 py-2 rounded-full mb-3">
        <i class="fas fa-question-circle mr-1"></i>Q
      </span>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800 leading-tight">
        「<span class="marker-pink">医学部受験がうまくいかない…</span>」と<br>お悩みではありませんか？
      </h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 reveal">
      <div class="worry-card">
        <div class="w-12 h-12 mx-auto mb-3 bg-red-50 rounded-full flex items-center justify-center">
          <i class="fas fa-head-side-virus text-red-400 text-xl"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-[15px] leading-snug">何を信じて何を捨てるか<br>決められない</p>
        <p class="text-xs text-gray-500 mt-2">情報が多すぎて方針が定まらない…</p>
      </div>
      <div class="worry-card">
        <div class="w-12 h-12 mx-auto mb-3 bg-orange-50 rounded-full flex items-center justify-center">
          <i class="fas fa-calendar-times text-orange-400 text-xl"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-[15px] leading-snug">計画を立てても続かない<br>崩れたら終わる</p>
        <p class="text-xs text-gray-500 mt-2">1日サボると全部崩壊する…</p>
      </div>
      <div class="worry-card">
        <div class="w-12 h-12 mx-auto mb-3 bg-yellow-50 rounded-full flex items-center justify-center">
          <i class="fas fa-books text-yellow-500 text-xl"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-[15px] leading-snug">教材が増えるほど<br>不安が増える</p>
        <p class="text-xs text-gray-500 mt-2">何をやれば正解なの？</p>
      </div>
      <div class="worry-card">
        <div class="w-12 h-12 mx-auto mb-3 bg-blue-50 rounded-full flex items-center justify-center">
          <i class="fas fa-chart-line text-blue-400 text-xl"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-[15px] leading-snug">模試の復習が形だけで<br>伸びない</p>
        <p class="text-xs text-gray-500 mt-2">やった気になるだけで終わる…</p>
      </div>
      <div class="worry-card">
        <div class="w-12 h-12 mx-auto mb-3 bg-purple-50 rounded-full flex items-center justify-center">
          <i class="fas fa-sync-alt text-purple-400 text-xl"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-[15px] leading-snug">"ケアレスミス"で片付けて<br>同じ失点を繰り返す</p>
        <p class="text-xs text-gray-500 mt-2">本当の原因が見えていない…</p>
      </div>
      <div class="worry-card">
        <div class="w-12 h-12 mx-auto mb-3 bg-green-50 rounded-full flex items-center justify-center">
          <i class="fas fa-map-marked-alt text-green-500 text-xl"></i>
        </div>
        <p class="font-round font-bold text-gray-800 text-[15px] leading-snug">志望校の情報がなく<br>戦い方が曖昧</p>
        <p class="text-xs text-gray-500 mt-2">大学ごとの傾向がつかめない…</p>
      </div>
    </div>

    <!-- Parent-staff bubble dialog -->
    <div class="max-w-2xl mx-auto reveal">
      <div class="flex items-end gap-3 mb-8">
        <div class="avatar-circle bg-warm-100 shrink-0"><i class="fas fa-female text-amber-600"></i></div>
        <div class="bubble-parent">
          <p class="text-sm text-gray-700 font-round">口で「勉強しなさい」と言うだけでは<br>ダメなのかしら…仕事もあって<br>なかなか見てあげられないし…</p>
        </div>
      </div>
      <div class="flex items-end gap-3 flex-row-reverse">
        <div class="avatar-circle bg-primary-100 shrink-0"><i class="fas fa-user-md text-primary-600"></i></div>
        <div class="bubble-staff">
          <p class="text-sm text-gray-700 font-round">
            <strong class="text-primary-700">お任せください！</strong><br>
            勉強がうまくいかないのには<br>ちゃんと<strong>「理由」</strong>があります。<br>
            MedPathがその理由を解決します。
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA Band 1 ===== -->
<div class="cta-band-green py-5">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
    <p class="text-white font-round font-bold text-sm text-center">まずは15分、お子さまの状況を聞かせてください。</p>
    <a href="#final-cta" class="cta-primary cta-sm shadow-lg"><i class="fas fa-calendar-check"></i>無料で相談する</a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 04. 3 REASONS                                                 -->
<!-- ============================================================ -->
<section class="bg-cream py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-4 reveal">
      <p class="text-primary-600 font-round font-bold text-sm mb-2">\\ 理由もなく成績は下がりません ／</p>
    </div>
    <div class="text-center mb-12 reveal">
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800 leading-tight">
        医学部受験がうまくいかない<br>
        <span class="big-num text-5xl sm:text-6xl">3</span>
        <span class="font-round font-black text-2xl sm:text-3xl text-gray-800">つの理由を<br>ご存じでしょうか？</span>
      </h2>
    </div>

    <div class="grid md:grid-cols-3 gap-5 reveal">
      <div class="reason-card rc-green text-center">
        <div class="pillar-badge bg-primary-500 mx-auto mb-4">01</div>
        <h3 class="font-round font-black text-lg text-gray-800 mb-3">勉強しても<br>結果が出ない…</h3>
        <p class="text-sm text-gray-600 leading-relaxed">「やっている<strong>つもり</strong>」が一番危険。復習の仕方・繰り返しの質が結果を分けます。正しい「型」がないまま量だけ増やしても伸びません。</p>
      </div>
      <div class="reason-card rc-orange text-center">
        <div class="pillar-badge bg-orange-500 mx-auto mb-4">02</div>
        <h3 class="font-round font-black text-lg text-gray-800 mb-3">自分に合った<br>やり方がわからない…</h3>
        <p class="text-sm text-gray-600 leading-relaxed">塾・参考書・YouTube……情報はあるのに<strong>自分用の戦略がない</strong>。志望校の配点や傾向に合った優先順位を知らないと、努力がムダになります。</p>
      </div>
      <div class="reason-card rc-blue text-center">
        <div class="pillar-badge bg-sky-600 mx-auto mb-4">03</div>
        <h3 class="font-round font-black text-lg text-gray-800 mb-3">一人で抱え込んで<br>モチベが続かない…</h3>
        <p class="text-sm text-gray-600 leading-relaxed">受験は長期戦。崩れた計画を<strong>一人で立て直す</strong>のは至難の業。定期的に伴走してくれる存在がいれば、挫折を防げます。</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 05. ABOUT + Before/After                                      -->
<!-- ============================================================ -->
<section class="bg-soft-green py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 text-center">
    <div class="reveal">
      <p class="text-primary-600 font-round font-bold text-sm mb-4">About MedPath</p>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800 leading-tight mb-5">
        私たちMedPathは<br>
        <span class="marker-green">医学部受験 学習設計のプロ</span>です！
      </h2>
      <p class="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
        全国<strong class="text-primary-700">30校以上</strong>の医学部に在籍する<strong class="text-primary-700">120名以上</strong>の現役医学生メンターが、<br class="hidden sm:inline">志望校から逆算した学習戦略であなたを伴走します。
      </p>
    </div>

    <!-- Before/After -->
    <div class="grid md:grid-cols-2 gap-6 items-stretch mt-10 reveal">
      <div class="bg-red-50 rounded-3xl p-7 border-2 border-red-200 text-left">
        <div class="flex items-center gap-2 mb-5">
          <span class="w-9 h-9 bg-coral-500 text-white rounded-full flex items-center justify-center font-bold text-lg"><i class="fas fa-times text-sm"></i></span>
          <p class="font-round font-black text-coral-500 text-sm">今のままだと…</p>
        </div>
        <ul class="space-y-4">
          <li class="flex gap-3 items-start"><i class="fas fa-frown text-coral-400 mt-0.5"></i><p class="text-sm text-gray-700">今日は何をやるか<strong>毎朝迷う</strong></p></li>
          <li class="flex gap-3 items-start"><i class="fas fa-frown text-coral-400 mt-0.5"></i><p class="text-sm text-gray-700">復習しても<strong>伸びている実感がない</strong></p></li>
          <li class="flex gap-3 items-start"><i class="fas fa-frown text-coral-400 mt-0.5"></i><p class="text-sm text-gray-700">ミスを繰り返すが<strong>対策が見えない</strong></p></li>
        </ul>
      </div>
      <div class="bg-green-50 rounded-3xl p-7 border-2 border-primary-200 text-left relative">
        <div class="absolute -left-5 top-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center z-10">
          <i class="fas fa-arrow-right text-primary-600"></i>
        </div>
        <div class="flex items-center gap-2 mb-5">
          <span class="w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg"><i class="fas fa-check text-sm"></i></span>
          <p class="font-round font-black text-primary-600 text-sm">MedPathを始めると…</p>
        </div>
        <ul class="space-y-4">
          <li class="flex gap-3 items-start"><i class="fas fa-smile text-primary-500 mt-0.5"></i><p class="text-sm text-gray-700">毎週、<strong class="text-primary-700">やることが決まっている</strong></p></li>
          <li class="flex gap-3 items-start"><i class="fas fa-smile text-primary-500 mt-0.5"></i><p class="text-sm text-gray-700">ミスの原因が分類され、<strong class="text-primary-700">対策が固定される</strong></p></li>
          <li class="flex gap-3 items-start"><i class="fas fa-smile text-primary-500 mt-0.5"></i><p class="text-sm text-gray-700">志望校までの<strong class="text-primary-700">最短ルートが見える</strong></p></li>
        </ul>
      </div>
    </div>

    <div class="mt-10 reveal">
      <a href="#final-cta" class="cta-primary inline-flex"><i class="fas fa-calendar-check"></i>無料相談で「今週の勝ち筋」を持ち帰る</a>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 06. 3 FEATURES                                                -->
<!-- ============================================================ -->
<section id="how" class="bg-cream py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-5 reveal">
      <p class="font-round text-primary-600 font-bold text-sm mb-2">Feature</p>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800 leading-tight">
        成績がグンと伸びる<br>
        <span class="big-num text-5xl sm:text-6xl">3</span>
        <span class="font-round font-black text-2xl sm:text-3xl text-gray-800">つの<span class="marker-green">秘密</span></span>
      </h2>
    </div>

    <!-- Feature 1 -->
    <div class="mb-10 reveal">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3 mb-5">
          <div class="pillar-badge bg-primary-500 shrink-0 text-xl">01</div>
          <div>
            <p class="text-xs text-primary-500 font-bold">Feature 1</p>
            <h3 class="font-round font-black text-xl text-gray-800"><span class="marker-green">逆算設計</span>が万全</h3>
          </div>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed mb-6">志望校の配点・出題傾向から逆算し、「何を・いつまでに・どの順番で」を科目別に設計します。最短ルートを作るから、ムダな遠回りがなくなります。</p>
        <div class="max-w-xl">
          <div class="flex items-end gap-3 mb-6">
            <div class="avatar-circle bg-warm-100 shrink-0 w-10 h-10"><i class="fas fa-female text-amber-600 text-sm"></i></div>
            <div class="bubble-parent text-sm"><p class="text-gray-700 font-round">何から手をつけたらいいか全然わからなくて…</p></div>
          </div>
          <div class="flex items-end gap-3 flex-row-reverse">
            <div class="avatar-circle bg-primary-100 shrink-0 w-10 h-10"><i class="fas fa-user-md text-primary-600 text-sm"></i></div>
            <div class="bubble-staff text-sm"><p class="text-gray-700 font-round"><strong class="text-primary-700">お任せください！</strong>志望校の傾向から逆算して、週ごとの学習計画を一緒に作ります。</p></div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-5">
          <span class="tag-pill bg-primary-50 text-primary-700"><i class="fas fa-sitemap mr-1"></i>科目配分</span>
          <span class="tag-pill bg-primary-50 text-primary-700"><i class="fas fa-book mr-1"></i>教材選定</span>
          <span class="tag-pill bg-primary-50 text-primary-700"><i class="fas fa-calendar-week mr-1"></i>週次計画</span>
        </div>
      </div>
    </div>

    <!-- Feature 2 -->
    <div class="mb-10 reveal">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3 mb-5">
          <div class="pillar-badge bg-orange-500 shrink-0 text-xl">02</div>
          <div>
            <p class="text-xs text-orange-500 font-bold">Feature 2</p>
            <h3 class="font-round font-black text-xl text-gray-800"><span class="marker-yellow">相性ピッタリ</span>のメンター</h3>
          </div>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed mb-6">MedPathでは「勉強のやる気」を大事にしています。志望校を経験したメンターが、受験のリアルを共有しながら、楽しく伴走します。</p>
        <div class="max-w-xl">
          <div class="flex items-end gap-3 mb-6">
            <div class="avatar-circle bg-warm-100 shrink-0 w-10 h-10"><i class="fas fa-female text-amber-600 text-sm"></i></div>
            <div class="bubble-parent text-sm"><p class="text-gray-700 font-round">志望校の先輩に教えてもらえたら心強いのだけど…</p></div>
          </div>
          <div class="flex items-end gap-3 flex-row-reverse">
            <div class="avatar-circle bg-primary-100 shrink-0 w-10 h-10"><i class="fas fa-user-md text-primary-600 text-sm"></i></div>
            <div class="bubble-staff text-sm"><p class="text-gray-700 font-round"><strong class="text-primary-700">はい、お任せください！</strong>志望校メンターを「優先アサイン」で可能な限りマッチングします。</p></div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-5">
          <span class="tag-pill bg-orange-50 text-orange-600"><i class="fas fa-handshake mr-1"></i>志望校メンター優先</span>
          <span class="tag-pill bg-orange-50 text-orange-600"><i class="fas fa-chess mr-1"></i>併願戦略</span>
          <span class="tag-pill bg-orange-50 text-orange-600"><i class="fas fa-comments mr-1"></i>大学生活リアル</span>
        </div>
      </div>
    </div>

    <!-- Feature 3 -->
    <div class="reveal">
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div class="flex items-center gap-3 mb-5">
          <div class="pillar-badge bg-sky-600 shrink-0 text-xl">03</div>
          <div>
            <p class="text-xs text-sky-600 font-bold">Feature 3</p>
            <h3 class="font-round font-black text-xl text-gray-800">面談日以外の<span class="marker-green">サポートが万全</span></h3>
          </div>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed mb-6">面談がない日もチャットで質問OK。一人の勉強で「わからない」「不安」が出ても、すぐに相談できる環境を用意しています。</p>
        <div class="max-w-xl">
          <div class="flex items-end gap-3 mb-6">
            <div class="avatar-circle bg-warm-100 shrink-0 w-10 h-10"><i class="fas fa-female text-amber-600 text-sm"></i></div>
            <div class="bubble-parent text-sm"><p class="text-gray-700 font-round">面談の日以外に困った時はどうすれば…？</p></div>
          </div>
          <div class="flex items-end gap-3 flex-row-reverse">
            <div class="avatar-circle bg-primary-100 shrink-0 w-10 h-10"><i class="fas fa-user-md text-primary-600 text-sm"></i></div>
            <div class="bubble-staff text-sm"><p class="text-gray-700 font-round"><strong class="text-primary-700">ご安心ください！</strong>チャットサポートで面談日以外もフォローします。一人で悩ませません。</p></div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mt-5">
          <span class="tag-pill bg-sky-50 text-sky-700"><i class="fas fa-comment-dots mr-1"></i>チャットサポート</span>
          <span class="tag-pill bg-sky-50 text-sky-700"><i class="fas fa-video mr-1"></i>週次面談</span>
          <span class="tag-pill bg-sky-50 text-sky-700"><i class="fas fa-tasks mr-1"></i>日次チェック</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA Band 2 ===== -->
<div class="cta-band-orange py-5">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
    <p class="text-white font-round font-bold text-sm text-center">志望校メンターの空き状況、聞いてみませんか？</p>
    <a href="#final-cta" class="bg-white text-orange-600 font-round font-bold text-sm px-6 py-3 rounded-full transition hover:bg-orange-50 shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 07. MENTOR HIGHLIGHT (30校+ 強調・マップなし)                  -->
<!-- ============================================================ -->
<section id="mentors" class="bg-soft-blue py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-10 reveal">
      <span class="inline-block bg-warm-200 text-amber-700 font-round font-bold text-xs px-4 py-1.5 rounded-full mb-4"><i class="fas fa-star mr-1"></i>MedPath最大の特長</span>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800 leading-tight">
        志望校の<span class="marker-yellow">"先輩"</span>が<br>受験のリアルを教えてくれる
      </h2>
    </div>

    <!-- Big highlight card -->
    <div class="mentor-highlight p-8 sm:p-12 text-center mb-10 reveal">
      <div class="relative z-10">
        <div class="w-20 h-20 mx-auto mb-4 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
          <i class="fas fa-university text-white text-3xl"></i>
        </div>
        <p class="big-num text-6xl sm:text-8xl mb-1">30<span class="text-2xl sm:text-3xl">校以上</span></p>
        <p class="font-round font-black text-xl sm:text-2xl text-gray-800 mb-3">の医学部メンターが在籍</p>
        <p class="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed mb-6">
          関東エリアを中心に、全国の国公立・私立医学部に在籍する<br class="hidden sm:inline">
          <strong class="text-primary-700">120名以上</strong>の現役医学生が登録。<br>
          教科書には書いていない<strong class="text-primary-700">「経験者だけが知っている情報」</strong>をもとに伴走します。
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <span class="tag-pill bg-white text-primary-700 shadow-sm"><i class="fas fa-check-circle mr-1"></i>関東エリア中心</span>
          <span class="tag-pill bg-white text-primary-700 shadow-sm"><i class="fas fa-check-circle mr-1"></i>全国対応</span>
          <span class="tag-pill bg-white text-primary-700 shadow-sm"><i class="fas fa-check-circle mr-1"></i>国公立・私立</span>
        </div>
        <p class="text-[11px] text-gray-400 mt-4">※在籍状況は時期により変動します</p>
      </div>
    </div>

    <!-- Matching flow -->
    <div class="grid md:grid-cols-3 gap-5 reveal">
      <div class="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
        <div class="w-14 h-14 mx-auto mb-3 bg-primary-500 text-white rounded-full flex items-center justify-center font-round font-bold text-lg">1</div>
        <p class="font-round font-bold text-gray-800 text-sm mb-1">志望校・現状をヒアリング</p>
        <p class="text-xs text-gray-500">あなたの「今」を丁寧に聞き取ります</p>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
        <div class="w-14 h-14 mx-auto mb-3 bg-primary-500 text-white rounded-full flex items-center justify-center font-round font-bold text-lg">2</div>
        <p class="font-round font-bold text-gray-800 text-sm mb-1">志望校メンターを優先アサイン</p>
        <p class="text-xs text-gray-500">可能な限り最適なメンターをマッチング</p>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
        <div class="w-14 h-14 mx-auto mb-3 bg-primary-500 text-white rounded-full flex items-center justify-center font-round font-bold text-lg">3</div>
        <p class="font-round font-bold text-gray-800 text-sm mb-1">毎週、勝ち筋を一緒に更新</p>
        <p class="text-xs text-gray-500">面談→計画修正→実行のサイクル</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 08. METHOD (S1-S6)                                            -->
<!-- ============================================================ -->
<section id="method" class="bg-soft-yellow py-16 md:py-20">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12 reveal">
      <p class="font-round text-primary-600 font-bold text-sm mb-2">6ステップメソッド</p>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800">
        勉強法は<span class="marker-yellow">フェーズ</span>で変わる。<br class="sm:hidden">だから迷走しない。
      </h2>
    </div>
    <div class="space-y-5 reveal">
      <div class="method-item">
        <div class="absolute left-0 top-0 w-11 h-11 bg-primary-700 text-white rounded-xl flex items-center justify-center font-round font-black text-sm shadow-md">S1</div>
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"><p class="font-round font-bold text-gray-800 mb-1">大舵 ― 志望校仕様を定義</p><p class="text-sm text-gray-500">目標から逆算し、必要な到達ラインを科目別に設計。</p></div>
      </div>
      <div class="method-item">
        <div class="absolute left-0 top-0 w-11 h-11 bg-primary-600 text-white rounded-xl flex items-center justify-center font-round font-black text-sm shadow-md">S2</div>
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"><p class="font-round font-bold text-gray-800 mb-1">現状把握 ― 点数より原因</p><p class="text-sm text-gray-500">模試の点数ではなく「なぜ落としたか」を分類して伸ばす要素を特定。</p></div>
      </div>
      <div class="method-item">
        <div class="absolute left-0 top-0 w-11 h-11 bg-primary-500 text-white rounded-xl flex items-center justify-center font-round font-black text-sm shadow-md">S3</div>
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"><p class="font-round font-bold text-gray-800 mb-1">基礎完璧 ― 伸びる土台</p><p class="text-sm text-gray-500">応用の前に基礎の穴を潰す。土台なしの応用はムダになるから。</p></div>
      </div>
      <div class="method-item">
        <div class="absolute left-0 top-0 w-11 h-11 bg-sky-600 text-white rounded-xl flex items-center justify-center font-round font-black text-sm shadow-md">S4</div>
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"><p class="font-round font-bold text-gray-800 mb-1">応用 ― 解ける形にする</p><p class="text-sm text-gray-500">「わかる」を「解ける」に変える演習設計。パターンを型として定着。</p></div>
      </div>
      <div class="method-item">
        <div class="absolute left-0 top-0 w-11 h-11 bg-sky-500 text-white rounded-xl flex items-center justify-center font-round font-black text-sm shadow-md">S5</div>
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"><p class="font-round font-bold text-gray-800 mb-1">実戦 ― 傾向→対策→検証</p><p class="text-sm text-gray-500">過去問分析から頻出パターンと時間配分を最適化。</p></div>
      </div>
      <div class="method-item">
        <div class="absolute left-0 top-0 w-11 h-11 bg-orange-500 text-white rounded-xl flex items-center justify-center font-round font-black text-sm shadow-md">S6</div>
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"><p class="font-round font-bold text-gray-800 mb-1">改善 ― 良いものだけ残す</p><p class="text-sm text-gray-500">効果の出た勉強法を残し薄いものは切る。常にPDCAを回す。</p></div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 09. ERROR TAXONOMY                                            -->
<!-- ============================================================ -->
<section class="bg-cream py-16 md:py-20">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-8 reveal">
      <p class="font-round text-coral-500 font-bold text-sm mb-2">Error Taxonomy</p>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800">
        "ケアレスミス"で終わらせない。<br><span class="marker-pink">ミスは7つに分類</span>できる。
      </h2>
    </div>
    <div class="flex flex-wrap justify-center gap-2 mb-8 reveal">
      <span class="error-tag bg-red-50 text-red-700 border border-red-200"><i class="fas fa-brain mr-1"></i>知識不足</span>
      <span class="error-tag bg-orange-50 text-orange-700 border border-orange-200"><i class="fas fa-lightbulb mr-1"></i>理解不足</span>
      <span class="error-tag bg-yellow-50 text-yellow-700 border border-yellow-200"><i class="fas fa-list-ol mr-1"></i>手順不足</span>
      <span class="error-tag bg-green-50 text-green-700 border border-green-200"><i class="fas fa-random mr-1"></i>転移不足</span>
      <span class="error-tag bg-blue-50 text-blue-700 border border-blue-200"><i class="fas fa-chess-knight mr-1"></i>戦略不足</span>
      <span class="error-tag bg-purple-50 text-purple-700 border border-purple-200"><i class="fas fa-drafting-compass mr-1"></i>設計ミス</span>
      <span class="error-tag bg-pink-50 text-pink-700 border border-pink-200"><i class="fas fa-calculator mr-1"></i>検算不足</span>
    </div>
    <div class="grid md:grid-cols-2 gap-4 reveal">
      <div class="bg-white rounded-2xl p-6 border-2 border-pink-100 shadow-sm">
        <span class="inline-block bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full mb-3"><i class="fas fa-calculator mr-1"></i>検算不足</span>
        <div class="bg-pink-50 rounded-xl p-4">
          <p class="text-sm text-gray-700 font-medium"><i class="fas fa-exclamation-triangle text-pink-400 mr-1"></i>計算ミスが多い</p>
          <p class="text-sm text-gray-600 mt-2">→ "検算不足"とわかれば、<strong class="text-primary-700">チェック手順を固定する</strong>だけで解決。</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-6 border-2 border-yellow-100 shadow-sm">
        <span class="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-3"><i class="fas fa-list-ol mr-1"></i>手順不足</span>
        <div class="bg-yellow-50 rounded-xl p-4">
          <p class="text-sm text-gray-700 font-medium"><i class="fas fa-exclamation-triangle text-yellow-500 mr-1"></i>解法が浮かばない</p>
          <p class="text-sm text-gray-600 mt-2">→ "手順不足"とわかれば、<strong class="text-primary-700">解法パターンの型を作る</strong>ことで克服。</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ===== CTA Band 3 ===== -->
<div class="cta-band-green py-5">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
    <p class="text-white font-round font-bold text-sm text-center">あなたの「勝ち筋」を、一緒に見つけませんか？</p>
    <a href="#final-cta" class="cta-primary cta-sm shadow-lg"><i class="fas fa-calendar-check"></i>無料で相談する</a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 10. LIFE SKILL (計画力・思考力は一生モノ)                      -->
<!-- ============================================================ -->
<section id="life-skill" class="bg-soft-green py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-6 reveal">
      <span class="inline-block bg-primary-100 text-primary-700 font-round font-bold text-xs px-4 py-1.5 rounded-full mb-4"><i class="fas fa-gem mr-1"></i>受験のその先へ</span>
      <h2 class="font-round text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 leading-tight">
        MedPathで身につく力は、<br>
        <span class="marker-green">受験だけで終わらない。</span>
      </h2>
      <p class="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
        MedPathのメンタリングで鍛える<strong class="text-primary-700">「計画力」と「思考力」</strong>は、<br class="hidden sm:inline">
        医学部合格の後も、あなたの人生を支え続ける<strong class="text-primary-700">一生モノのスキル</strong>です。
      </p>
    </div>

    <!-- Main message card -->
    <div class="bg-white rounded-3xl p-8 sm:p-10 border-2 border-primary-200 shadow-md mb-10 reveal">
      <div class="text-center mb-8">
        <h3 class="font-round font-black text-xl sm:text-2xl text-gray-800">
          <i class="fas fa-seedling text-primary-500 mr-2"></i>
          受験で培う<span class="text-primary-700">「計画力」「思考力」</span>は<br>
          人生のあらゆる場面で武器になる
        </h3>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="flex gap-4 items-start">
          <div class="life-icon-box bg-primary-500">
            <i class="fas fa-user-md"></i>
          </div>
          <div>
            <p class="font-round font-bold text-gray-800 text-sm mb-1">医学部での学び</p>
            <p class="text-xs text-gray-500 leading-relaxed">膨大な医学知識を効率よく整理・暗記する力。逆算設計で身につけた「優先順位の判断力」がそのまま活きます。</p>
          </div>
        </div>
        <div class="flex gap-4 items-start">
          <div class="life-icon-box bg-sky-600">
            <i class="fas fa-stethoscope"></i>
          </div>
          <div>
            <p class="font-round font-bold text-gray-800 text-sm mb-1">臨床・研修医時代</p>
            <p class="text-xs text-gray-500 leading-relaxed">限られた時間で最善の判断を下す「思考の型」。ミス分類で鍛えた分析力が、医療現場でも助けになります。</p>
          </div>
        </div>
        <div class="flex gap-4 items-start">
          <div class="life-icon-box bg-orange-500">
            <i class="fas fa-briefcase-medical"></i>
          </div>
          <div>
            <p class="font-round font-bold text-gray-800 text-sm mb-1">医師としてのキャリア</p>
            <p class="text-xs text-gray-500 leading-relaxed">研究計画、学会発表、論文執筆…すべて「逆算→実行→改善」のサイクル。受験で身につけたPDCA力が土台になります。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Before/After: Skill comparison -->
    <div class="grid md:grid-cols-2 gap-6 reveal">
      <div class="bg-white rounded-2xl p-6 border-2 border-gray-200">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><i class="fas fa-times text-gray-500 text-xs"></i></div>
          <p class="font-round font-bold text-gray-500 text-sm">ただ "合格" を目指すだけの受験</p>
        </div>
        <ul class="space-y-3 text-sm text-gray-500">
          <li class="flex gap-2 items-start"><i class="fas fa-minus-circle mt-0.5 text-xs"></i>丸暗記で試験を乗り切る</li>
          <li class="flex gap-2 items-start"><i class="fas fa-minus-circle mt-0.5 text-xs"></i>誰かに言われたことをやるだけ</li>
          <li class="flex gap-2 items-start"><i class="fas fa-minus-circle mt-0.5 text-xs"></i>合格した瞬間にスキルがリセットされる</li>
        </ul>
      </div>
      <div class="bg-white rounded-2xl p-6 border-2 border-primary-300 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"><i class="fas fa-check text-white text-xs"></i></div>
          <p class="font-round font-bold text-primary-700 text-sm">MedPathで "人生の武器" を手に入れる受験</p>
        </div>
        <ul class="space-y-3 text-sm text-gray-700">
          <li class="flex gap-2 items-start"><i class="fas fa-check-circle text-primary-500 mt-0.5 text-xs"></i><strong>計画力</strong> ― 目標から逆算して動ける自分になる</li>
          <li class="flex gap-2 items-start"><i class="fas fa-check-circle text-primary-500 mt-0.5 text-xs"></i><strong>分析力</strong> ― 失敗を分類し、次の一手に変えられる</li>
          <li class="flex gap-2 items-start"><i class="fas fa-check-circle text-primary-500 mt-0.5 text-xs"></i><strong>PDCA力</strong> ― 合格後も一生使えるスキルが残る</li>
        </ul>
      </div>
    </div>

    <div class="text-center mt-8 reveal">
      <p class="font-round font-bold text-primary-700 text-base sm:text-lg mb-2">
        <i class="fas fa-quote-left text-primary-300 mr-1"></i>
        合格はゴールではなく、スタートライン。
        <i class="fas fa-quote-right text-primary-300 ml-1"></i>
      </p>
      <p class="text-sm text-gray-500">MedPathは「受かる力」だけでなく「生きる力」を育てます。</p>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 11. DELIVERABLES                                              -->
<!-- ============================================================ -->
<section class="bg-cream py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-10 reveal">
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800">毎週、<span class="marker-green">これ</span>を一緒に作ります</h2>
      <p class="text-gray-500 text-sm mt-2">面談は「話して終わり」ではありません</p>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-primary-100 hover:shadow-md transition">
        <div class="w-12 h-12 mx-auto mb-3 bg-primary-50 rounded-full flex items-center justify-center">
          <i class="fas fa-clipboard-list text-primary-600 text-xl"></i>
        </div>
        <p class="text-xs text-primary-500 font-bold mb-1">毎週</p>
        <p class="font-round font-bold text-gray-800">学習計画</p>
        <p class="text-xs text-gray-500 mt-1">やること・順番・量</p>
      </div>
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-sky-100 hover:shadow-md transition">
        <div class="w-12 h-12 mx-auto mb-3 bg-sky-50 rounded-full flex items-center justify-center">
          <i class="fas fa-search text-sky-500 text-xl"></i>
        </div>
        <p class="text-xs text-sky-500 font-bold mb-1">毎週</p>
        <p class="font-round font-bold text-gray-800">振り返り</p>
        <p class="text-xs text-gray-500 mt-1">なぜできなかったか</p>
      </div>
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-purple-100 hover:shadow-md transition">
        <div class="w-12 h-12 mx-auto mb-3 bg-purple-50 rounded-full flex items-center justify-center">
          <i class="fas fa-wrench text-purple-500 text-xl"></i>
        </div>
        <p class="text-xs text-purple-500 font-bold mb-1">毎週</p>
        <p class="font-round font-bold text-gray-800">修正プラン</p>
        <p class="text-xs text-gray-500 mt-1">次週の勝ち筋</p>
      </div>
      <div class="bg-white rounded-2xl p-5 text-center border-2 border-orange-100 hover:shadow-md transition">
        <div class="w-12 h-12 mx-auto mb-3 bg-orange-50 rounded-full flex items-center justify-center">
          <i class="fas fa-handshake text-orange-500 text-xl"></i>
        </div>
        <p class="text-xs text-orange-500 font-bold mb-1">随時</p>
        <p class="font-round font-bold text-gray-800">意思決定相談</p>
        <p class="text-xs text-gray-500 mt-1">併願・戦略</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 12. PLANS                                                     -->
<!-- ============================================================ -->
<section id="plans" class="bg-soft-green py-16 md:py-20">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-4 reveal">
      <p class="font-round text-primary-600 font-bold text-sm mb-2">Plan</p>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800">お得な<span class="marker-green">料金プラン</span></h2>
      <p class="text-gray-500 text-sm mt-2">あなたに合った伴走スタイルを選べます</p>
    </div>

    <div class="grid md:grid-cols-3 gap-5 reveal">
      <div class="plan-card text-center">
        <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">LIGHT</p>
        <h3 class="font-round font-black text-xl text-gray-800 mb-3">ライト</h3>
        <p class="font-round font-black text-4xl text-gray-800">&#165;29,800<span class="text-sm font-medium text-gray-400">/月</span></p>
        <p class="text-[11px] text-gray-400 mb-5">税込</p>
        <ul class="text-sm text-gray-600 space-y-3 text-left mb-6">
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>月2回のZoom面談</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>チャットサポート</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>学習計画テンプレート</li>
          <li class="flex gap-2 text-gray-300"><i class="fas fa-minus mt-0.5"></i>週次伴走</li>
          <li class="flex gap-2 text-gray-300"><i class="fas fa-minus mt-0.5"></i>添削・面接対策</li>
        </ul>
        <a href="#final-cta" class="block bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm py-3.5 rounded-full transition font-round">まずは無料相談</a>
      </div>
      <div class="plan-card recommended text-center relative">
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-5 py-1.5 rounded-full font-round shadow-md"><i class="fas fa-crown mr-1"></i>おすすめ</div>
        <p class="text-xs font-bold text-primary-500 tracking-widest mb-1">STANDARD</p>
        <h3 class="font-round font-black text-xl text-gray-800 mb-3">スタンダード</h3>
        <p class="font-round font-black text-4xl text-primary-700">&#165;49,800<span class="text-sm font-medium text-gray-400">/月</span></p>
        <p class="text-[11px] text-gray-400 mb-5">税込</p>
        <ul class="text-sm text-gray-700 space-y-3 text-left mb-6 font-medium">
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>月4回のZoom面談</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>週次伴走サイクル</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>チャットサポート</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>計画＋振り返り＋修正</li>
          <li class="flex gap-2 text-gray-300"><i class="fas fa-minus mt-0.5"></i>添削・面接対策</li>
        </ul>
        <a href="#final-cta" class="block cta-primary text-sm py-3.5 justify-center">無料相談を予約する</a>
      </div>
      <div class="plan-card text-center">
        <p class="text-xs font-bold text-gray-400 tracking-widest mb-1">PREMIUM</p>
        <h3 class="font-round font-black text-xl text-gray-800 mb-3">プレミアム</h3>
        <p class="font-round font-black text-4xl text-gray-800">&#165;79,800<span class="text-sm font-medium text-gray-400">/月</span></p>
        <p class="text-[11px] text-gray-400 mb-5">税込</p>
        <ul class="text-sm text-gray-600 space-y-3 text-left mb-6">
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>月4回のZoom面談</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>週次伴走サイクル</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>優先チャットサポート</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>小論文添削・面接対策</li>
          <li class="flex gap-2"><i class="fas fa-check text-primary-500 mt-0.5"></i>日次チェック対応</li>
        </ul>
        <a href="#final-cta" class="block bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm py-3.5 rounded-full transition font-round">まずは無料相談</a>
      </div>
    </div>

    <!-- Option -->
    <div class="mt-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-warm-200 reveal">
      <div class="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <span class="tag-pill bg-warm-100 text-amber-700 mb-3"><i class="fas fa-puzzle-piece mr-1"></i>オプション</span>
          <h3 class="font-round font-black text-xl text-gray-800 mb-2">志望校メンター優先アサイン</h3>
          <p class="text-sm text-gray-600">月額 <strong class="font-round font-black text-2xl text-gray-800">&#165;9,800</strong> <span class="text-xs text-gray-400">（税込）</span></p>
          <p class="text-xs text-gray-400 mt-2">※在籍状況により難しい場合もあります</p>
        </div>
        <ul class="text-sm text-gray-600 space-y-2">
          <li class="flex gap-2"><i class="fas fa-check text-orange-400 mt-0.5"></i>志望校メンター優先配置</li>
          <li class="flex gap-2"><i class="fas fa-check text-orange-400 mt-0.5"></i>受験体験談の共有</li>
          <li class="flex gap-2"><i class="fas fa-check text-orange-400 mt-0.5"></i>大学生活リアル情報</li>
          <li class="flex gap-2"><i class="fas fa-check text-orange-400 mt-0.5"></i>併願戦略アドバイス</li>
        </ul>
      </div>
    </div>

    <p class="text-center text-xs text-gray-400 mt-6">
      <i class="fas fa-info-circle text-primary-400 mr-1"></i>
      初月はオンボーディング（90分ヒアリング＋戦略サマリ）を実施。返金条件はFAQをご覧ください。
    </p>
  </div>
</section>

<!-- ============================================================ -->
<!-- 13. FLOW                                                      -->
<!-- ============================================================ -->
<section id="flow" class="bg-soft-yellow py-16 md:py-20">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12 reveal">
      <p class="font-round text-primary-600 font-bold text-sm mb-2">Flow</p>
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800">受講開始までの流れ</h2>
      <p class="text-gray-500 text-sm mt-2">最短5日で伴走スタート</p>
    </div>
    <div class="space-y-0 reveal">
      <div class="flow-step flex gap-5 items-start pb-8">
        <div class="w-16 h-16 bg-primary-500 text-white rounded-2xl flex flex-col items-center justify-center font-round shrink-0 z-10 shadow-md">
          <span class="text-[10px] opacity-70">Flow</span><span class="font-black text-lg">01</span>
        </div>
        <div class="pt-1.5">
          <p class="font-round font-bold text-gray-800 text-lg">無料相談（15分）</p>
          <p class="text-sm text-gray-500 mt-1">まずはお気軽に。オンラインで完結します。</p>
        </div>
      </div>
      <div class="flow-step flex gap-5 items-start pb-8">
        <div class="w-16 h-16 bg-primary-500 text-white rounded-2xl flex flex-col items-center justify-center font-round shrink-0 z-10 shadow-md">
          <span class="text-[10px] opacity-70">Flow</span><span class="font-black text-lg">02</span>
        </div>
        <div class="pt-1.5">
          <p class="font-round font-bold text-gray-800 text-lg">現状診断・志望校ヒアリング</p>
          <p class="text-sm text-gray-500 mt-1">あなたの「今」と「目標」を詳しく聞き取ります。</p>
        </div>
      </div>
      <div class="flow-step flex gap-5 items-start pb-8">
        <div class="w-16 h-16 bg-primary-400 text-white rounded-2xl flex flex-col items-center justify-center font-round shrink-0 z-10 shadow-md">
          <span class="text-[10px] opacity-70">Flow</span><span class="font-black text-lg">03</span>
        </div>
        <div class="pt-1.5">
          <p class="font-round font-bold text-gray-800 text-lg">メンター決定</p>
          <p class="text-sm text-gray-500 mt-1">最適なメンターをマッチングしてご紹介。</p>
        </div>
      </div>
      <div class="flow-step flex gap-5 items-start pb-8">
        <div class="w-16 h-16 bg-primary-400 text-white rounded-2xl flex flex-col items-center justify-center font-round shrink-0 z-10 shadow-md">
          <span class="text-[10px] opacity-70">Flow</span><span class="font-black text-lg">04</span>
        </div>
        <div class="pt-1.5">
          <p class="font-round font-bold text-gray-800 text-lg">初回オンボーディング（90分）</p>
          <p class="text-sm text-gray-500 mt-1">戦略設計・年間計画・初回の週次計画を作成。</p>
        </div>
      </div>
      <div class="flex gap-5 items-start">
        <div class="w-16 h-16 bg-orange-500 text-white rounded-2xl flex flex-col items-center justify-center font-round shrink-0 z-10 shadow-md">
          <span class="text-[10px] opacity-70">Flow</span><span class="font-black text-lg">05</span>
        </div>
        <div class="pt-1.5">
          <p class="font-round font-bold text-gray-800 text-lg">週次伴走スタート</p>
          <p class="text-sm text-primary-600 font-bold mt-1"><i class="fas fa-flag-checkered mr-1"></i>ここから毎週のサイクルが始まります</p>
        </div>
      </div>
    </div>
    <div class="text-center mt-10 reveal">
      <a href="#final-cta" class="cta-primary inline-flex"><i class="fas fa-calendar-check"></i>まずは無料相談から始める</a>
    </div>
  </div>
</section>

<!-- ============================================================ -->
<!-- 14. FAQ                                                       -->
<!-- ============================================================ -->
<section id="faq" class="bg-cream py-16 md:py-20">
  <div class="max-w-3xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-10 reveal">
      <h2 class="font-round text-2xl sm:text-3xl font-black text-gray-800">よくある質問</h2>
    </div>
    <div class="space-y-3 reveal" id="faqList">
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 授業はしないんですか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">MedPathは「授業」ではなく「勉強法の設計と伴走」に特化しています。教科の指導が必要な場合は、既存の塾や予備校との併用がおすすめです。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 志望校メンターは必ず付きますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">「優先アサイン」制度のため、完全一致を保証するものではありません。近い大学群や同系統のメンターをアサインするなど、可能な限り最適なマッチングを行います。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 返金はありますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">初回オンボーディング完了後7日以内にご満足いただけなかった場合、全額返金いたします。詳細は利用規約に記載しています。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 親だけの相談もできますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">はい、保護者の方だけのご相談も大歓迎です。お子さまの学習状況の共有や受験戦略のご相談を承ります。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 推薦・面接にも対応しますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">プレミアムプランでは小論文添削・面接対策に対応しています。メンター自身の推薦入試経験を活かしたアドバイスが好評です。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. どのレベルから対象ですか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">偏差値40台から国公立志望まで幅広く対応しています。重要なのは偏差値ではなく「勝てるやり方を固定すること」です。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 塾や予備校と併用できますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">もちろんです。MedPathは「学習戦略の設計」に特化しているため、既存の塾との併用で最大の効果を発揮します。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 面談の曜日・時間は選べますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">メンターとの調整により、平日夕方〜夜・土日にも対応可能です。Zoomを使うので自宅からどこでも受講できます。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 途中でプラン変更はできますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">月単位でのプラン変更が可能です。ライトで試し、手応えを感じたらスタンダードに切り替える方も多いです。</p></div></div>
      <div class="faq-item"><button class="faq-btn w-full flex items-center justify-between p-5 text-left" onclick="toggleFaq(this)"><span class="font-round font-bold text-sm text-gray-800 pr-4">Q. 高1・高2からでも意味がありますか？</span><span class="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><i class="fas fa-chevron-down text-primary-500 text-xs faq-chevron"></i></span></button><div class="faq-answer px-5"><p class="text-sm text-gray-600 leading-relaxed pb-4">大いにあります。早期に「勉強の型」を身につけることで、高3時の伸びが大きく変わります。</p></div></div>
    </div>
  </div>
</section>

<!-- ===== CTA Band 4 ===== -->
<div class="cta-band-orange py-5">
  <div class="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3">
    <p class="text-white font-round font-bold text-sm text-center">まだ迷っていますか？ 15分で疑問を解消できます。</p>
    <a href="#final-cta" class="bg-white text-orange-600 font-round font-bold text-sm px-6 py-3 rounded-full transition hover:bg-orange-50 shadow-lg">
      無料相談を予約する <i class="fas fa-arrow-right ml-1"></i>
    </a>
  </div>
</div>

<!-- ============================================================ -->
<!-- 15. FINAL CTA                                                 -->
<!-- ============================================================ -->
<section id="final-cta" class="bg-green-solid py-20 md:py-28 relative overflow-hidden">
  <div class="absolute inset-0">
    <div class="absolute top-10 right-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
  </div>
  <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
    <div class="reveal">
      <p class="text-primary-200 font-round font-bold text-sm mb-6">MedPathに少しでもご興味を持っていただけましたか？</p>
      <h2 class="font-round text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
        まずは15分。<br>"今週の勝ち筋"だけ<br class="sm:hidden">持ち帰ってください。
      </h2>
      <p class="text-white/80 text-base mb-6">
        あなたの現状と志望校を聞いて、やることを具体化します。<br>
        <strong class="text-warm-200">無料相談は完全無料。無理な勧誘はありません。</strong>
      </p>

      <!-- 3 support summary -->
      <div class="grid sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
        <div class="bg-white/15 backdrop-blur rounded-2xl py-5 px-3 text-center border border-white/20">
          <div class="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas fa-drafting-compass text-white text-xl"></i>
          </div>
          <p class="font-round font-bold text-white text-sm">逆算設計が<br>万全</p>
        </div>
        <div class="bg-white/15 backdrop-blur rounded-2xl py-5 px-3 text-center border border-white/20">
          <div class="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas fa-user-graduate text-white text-xl"></i>
          </div>
          <p class="font-round font-bold text-white text-sm">相性ピッタリの<br>メンター</p>
        </div>
        <div class="bg-white/15 backdrop-blur rounded-2xl py-5 px-3 text-center border border-white/20">
          <div class="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas fa-comment-dots text-white text-xl"></i>
          </div>
          <p class="font-round font-bold text-white text-sm">面談日以外の<br>サポートが万全</p>
        </div>
      </div>
    </div>

    <div class="reveal">
      <a href="#" class="cta-primary text-lg py-5 px-10 justify-center shadow-xl">
        <i class="fas fa-calendar-check"></i>無料相談（15分）を予約する
      </a>
    </div>
  </div>
</section>

<!-- ===== FOOTER ===== -->
<footer class="bg-gray-800 py-10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col md:flex-row items-center justify-between gap-5 mb-6">
      <span class="font-round font-bold text-lg text-white/80 flex items-center gap-2">
        <span class="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-xs"><i class="fas fa-graduation-cap"></i></span>
        MedPath
      </span>
      <div class="flex flex-wrap justify-center gap-3 text-xs text-gray-400">
        <a href="#" class="hover:text-white transition">運営者情報</a>
        <a href="#" class="hover:text-white transition">特定商取引法に基づく表記</a>
        <a href="#" class="hover:text-white transition">プライバシーポリシー</a>
        <a href="#" class="hover:text-white transition">利用規約</a>
      </div>
    </div>
    <p class="text-center text-xs text-gray-500">&copy; 2026 MedPath Inc. All rights reserved.</p>
  </div>
</footer>

<!-- ===== MOBILE STICKY CTA ===== -->
<div class="mobile-bar">
  <a href="#final-cta" class="flex-1 flex items-center justify-center bg-orange-500 text-white font-round font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-orange-500/25">
    <i class="fas fa-calendar-check mr-2 text-xs"></i>無料相談 15分
  </a>
</div>

<!-- ===== JAVASCRIPT ===== -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Scroll reveal
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });

  // Mobile menu
  document.getElementById('mobMenuBtn').addEventListener('click', function() {
    document.getElementById('mobMenu').classList.toggle('hidden');
  });
  document.querySelectorAll('.mm-link').forEach(function(l) {
    l.addEventListener('click', function() { document.getElementById('mobMenu').classList.add('hidden'); });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      var t = document.querySelector(href);
      if (t) { e.preventDefault(); var pos = t.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: pos, behavior: 'smooth' }); }
    });
  });
});

// FAQ
function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  var ans = btn.nextElementSibling;
  var isOpen = ans.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(function(a) { a.classList.remove('open'); });
  document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('faq-active'); });
  if (!isOpen) { ans.classList.add('open'); item.classList.add('faq-active'); }
}
</script>
</body>
</html>`
}

export default app
