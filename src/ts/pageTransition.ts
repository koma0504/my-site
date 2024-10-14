import { gsap } from "gsap";

/**
 * ページの遷移アニメーションを初期化する関数
 * @param pageListSelector - ページ要素のセレクタ（例: ".pages"）
 * @param navListSelector - ナビゲーションリンクのセレクタ（例: ".nav-links a"）
 */
export const initializePageTransition = (pageListSelector: string, navListSelector: string): void => {
  // ページとナビゲーションアイテムを取得
  const pageList = document.querySelectorAll<HTMLElement>(pageListSelector);
  const navList = document.querySelectorAll<HTMLAnchorElement>(navListSelector);

  // 初期状態として最初のページを表示し、他のページを非表示にする
  initializePages(pageList);

  // 各ナビゲーションアイテムにクリックイベントを設定
  navList.forEach((navItem) => {
    navItem.addEventListener("click", (event) => handleNavClick(event, navItem, pageList));
  });
};

/**
 * ページの初期化を行い、最初のページを表示し他のページを非表示にする関数
 * @param pageList - ページ要素のリスト
 */
const initializePages = (pageList: NodeListOf<HTMLElement>): void => {
  pageList.forEach((page, index) => {
    // 最初のページだけを表示し、それ以外は非表示にする
    page.style.display = index === 0 ? "block" : "none";
  });
};

/**
 * ナビゲーションアイテムがクリックされたときの処理
 * @param event - クリックイベント
 * @param navItem - クリックされたナビゲーションアイテム
 * @param pageList - ページ要素のリスト
 */
const handleNavClick = (event: Event, navItem: HTMLAnchorElement, pageList: NodeListOf<HTMLElement>): void => {
  event.preventDefault(); // デフォルトのリンクの動作をキャンセル
  switchPage(navItem.className, pageList); // クリックされたアイテムに対応するページを表示
};

/**
 * ページを切り替える関数
 * @param currentClass - クリックされたナビゲーションアイテムのクラス名
 * @param pageList - ページ要素のリスト
 */
const switchPage = (currentClass: string, pageList: NodeListOf<HTMLElement>): void => {
  // 全てのページを一旦非表示にする
  hideAllPages(pageList);

  // クラス名に基づいて表示するページを特定し、表示する
  const currentPage = Array.from(pageList).find((page) => page.classList.contains(currentClass));
  if (currentPage) {
    showPageWithAnimation(currentPage);
  }
};

/**
 * 全てのページを非表示にする関数
 * @param pageList - ページ要素のリスト
 */
const hideAllPages = (pageList: NodeListOf<HTMLElement>): void => {
  pageList.forEach((page) => {
    page.style.display = "none"; // 全ページを非表示にする
  });
};

/**
 * アニメーションを使用してページを表示する関数
 * @param page - 表示するページ要素
 */
const showPageWithAnimation = (page: HTMLElement): void => {
  page.style.display = "block"; // ページを表示
  // GSAPを使用してフェードインアニメーションを適用
  gsap.fromTo(page, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power2.out" });
};
