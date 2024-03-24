// scrollTracker.ts

// スクロールイベントを監視し、スクロール位置をコンソールに出力する関数
const handleScroll = () => {
  // window.scrollY は垂直方向のスクロール位置を取得する
  const scrollPosition = window.scrollY;
  console.log(`Current scroll position: ${scrollPosition}`);
};

// スクロールイベントリスナーを設定
window.addEventListener("scroll", handleScroll, { passive: true });

// 現在のスクロール位置を取得する関数（必要に応じて使用）
export const getScrollPosition = () => {
  return window.scrollY;
};
