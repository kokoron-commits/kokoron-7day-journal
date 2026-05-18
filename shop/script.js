// =============================================
// 商品を追加するには：
// products配列にオブジェクトを1つ追加するだけでOKです
// =============================================

const products = [
  {
    id: "values",
    name: "自分らしさをそっと見つけるワーク",
    subtitle: "マインドフルネス × 価値観ワークシート",
    description: "自分が大切にしてきたこと、心地よい瞬間、こうありたい願いを整理しながら、自分らしさのヒントを見つけるワークです。",
    recommend: "価値観を見つめ直したい方へ",
    image: "images/product-values.jpg",
    price: "¥500",
    tag: "人気",
    buyUrl: "#",
    detailUrl: "#"
  },
  {
    id: "7days",
    name: "こころんと整える 7日間ジャーナル",
    subtitle: "朝と夜、1日2ページ × 7日間",
    description: "7日間、毎日テーマに沿って朝と夜に書き進めるマインドフルジャーナルです。書く習慣をやさしく始めたい方におすすめです。",
    recommend: "ジャーナリングを習慣にしたい方へ",
    image: "images/product-7days.jpg",
    price: "¥600",
    tag: "定番",
    buyUrl: "#",
    detailUrl: "#"
  },
  {
    id: "memory",
    name: "脳のメモリーを空ける 3つの時間軸ジャーナリング",
    subtitle: "「何もしたくない」の正体に気づく、書き込み式セルフケアワーク",
    description: "過去・現在・未来の3つの時間軸で頭の中のもやもやを書き出し、今の自分に必要なことを整理するセルフケアワークです。",
    recommend: "頭の中が忙しい方、何もしたくない理由を整理したい方へ",
    image: "images/product-memory.jpg",
    price: "¥500",
    tag: "NEW",
    buyUrl: "#",
    detailUrl: "#"
  }
];

// =============================================
// タグに応じたCSSクラスを返す関数
// =============================================
function getTagClass(tag) {
  if (tag === "NEW") return "product-tag tag-new";
  if (tag === "人気") return "product-tag tag-popular";
  return "product-tag";
}

// =============================================
// 商品カードのHTMLを生成する関数
// 商品を追加する場合は products 配列を編集してください
// =============================================
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.setAttribute("data-id", product.id);

  card.innerHTML = `
    <div class="product-image-wrap">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <span class="${getTagClass(product.tag)}">${product.tag}</span>
    </div>
    <div class="product-body">
      <p class="product-name">${product.name}</p>
      <p class="product-subtitle">${product.subtitle}</p>
      <p class="product-description">${product.description}</p>
      <p class="product-recommend"><span aria-hidden="true">✦</span>${product.recommend}</p>
      <p class="product-price">${product.price}</p>
      <div class="product-buttons">
        <a href="${product.detailUrl}" class="btn-card-outline">詳細を見る</a>
        <a href="${product.buyUrl}" class="btn-card-filled">購入する</a>
      </div>
    </div>
  `;

  return card;
}

// =============================================
// 商品グリッドを生成・挿入する
// =============================================
function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  products.forEach(function (product) {
    fragment.appendChild(createProductCard(product));
  });
  grid.appendChild(fragment);
}

// =============================================
// FAQアコーディオン
// =============================================
function initFaq() {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;

      // 他のアイテムをすべて閉じる
      questions.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          const otherAnswer = otherBtn.nextElementSibling;
          if (otherAnswer) otherAnswer.classList.remove("open");
        }
      });

      // クリックしたアイテムをトグル
      const newState = !isExpanded;
      btn.setAttribute("aria-expanded", String(newState));
      if (answer) {
        answer.classList.toggle("open", newState);
      }
    });
  });
}

// =============================================
// スクロール時のヘッダーshadow
// =============================================
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // 初期状態も確認
}

// =============================================
// スムーズスクロール（hrefが#で始まるリンク）
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = anchor.getAttribute("href");
      if (href === "#") return; // 購入URLは対象外

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = 60;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });
}

// =============================================
// 初期化
// =============================================
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  initFaq();
  initHeaderScroll();
  initSmoothScroll();
});
