import { gsap } from "gsap";
import WebFont from "webfontloader";

export function initializeNavTransition() {
  WebFont.load({
    custom: {
      families: ["IBM Plex Sans"],
      urls: ["../scss/style.scss"],
    },
    active: () => {
      const navItems = document.querySelectorAll(".js-nav a");
      const navWidths = Array.from(navItems, (item) => item.getBoundingClientRect().width);

      // 初期位置の設定
      const initialPosition = navWidths[0] / 2 - 3;
      gsap.set(".triangle_marker", { left: initialPosition });

      // ナビゲーションアイテムのクリック時の処理を設定
      navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
          const pointerPosition = calculatePosition(navWidths, index);
          gsap.to(".triangle_marker", { left: pointerPosition });
        });
      });
    },
  });
}

// ナビゲーションアイテムの位置を計算
function calculatePosition(widths, currentIndex) {
  const partialSum = widths.slice(0, currentIndex + 1).reduce((acc, width) => acc + width, 0);
  return partialSum - widths[currentIndex] / 2 + currentIndex * 20 - 3;
}
