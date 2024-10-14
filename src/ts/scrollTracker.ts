/**
 * スクロール位置を監視し、スクロールするたびに現在の位置をコンソールに出力する関数
 * この関数は、`scroll` イベントが発生するたびに呼び出される。
 */
const handleScroll = (): void => {
  // window.scrollY を使用して垂直方向のスクロール位置を取得
  const scrollPosition = window.scrollY;
  console.log(`Current scroll position: ${scrollPosition}`);
};

/**
 * スクロールイベントリスナーを設定する関数
 * `passive: true` を設定してパフォーマンスを向上（スクロール時の処理を非同期で行う）
 */
window.addEventListener("scroll", handleScroll, { passive: true });

/**
 * 現在のスクロール位置を取得する関数
 * @returns {number} 現在の垂直方向のスクロール位置を返す
 */
export const getScrollPosition = (): number => {
  return window.scrollY;
};
