// TypeScriptの型定義を活用して、より厳密な型チェックを行います
import { gsap } from "gsap";

export function initializePageTransition(): void {
  const pageList = document.querySelectorAll<HTMLElement>(".js-main section");
  const navList = document.querySelectorAll<HTMLAnchorElement>(".js-nav a");

  // ページとナビゲーションアイテムを初期化します
  pageList.forEach((page, index) => {
    page.style.display = index === 0 ? "block" : "none";
  });

  navList.forEach((navItem) => {
    navItem.addEventListener("click", (event) => {
      event.preventDefault();
      switchPage(navItem.className, pageList);
    });
  });
}

function switchPage(currentClass: string, pageList: NodeListOf<HTMLElement>): void {
  // すべてのページを非表示に設定
  pageList.forEach((page) => {
    page.style.display = "none";
  });

  // アクティブなページを表示
  const currentPage = Array.from(pageList).find((page) => page.classList.contains(currentClass));
  if (currentPage) {
    currentPage.style.display = "block";

    // GSAPを使用したアニメーション
    gsap.fromTo(currentPage, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power2.out" });
  }
}
