import { gsap } from "gsap";
import WebFont from "webfontloader";

/**
 * ナビゲーションのホバーやクリック時にアニメーションを適用する関数
 * @param navListSelector - 対象となるナビゲーションリンクのセレクタ（例: ".nav-item"）
 */
export const initializeNavTransition = (navListSelector: string): void => {
  // Webフォントを読み込んだ後にナビゲーションを設定
  WebFont.load({
    custom: {
      families: ["IBM Plex Sans"], // フォントファミリーを指定
      urls: ["../scss/style.scss"], // フォントと関連するスタイルシートを読み込む
    },
    // フォントが読み込まれたらナビゲーション設定を実行
    active: () => setupNavigation(navListSelector),
  });
};

/**
 * ナビゲーションの初期設定を行う関数
 * @param navListSelector - 対象となるナビゲーションリンクのセレクタ
 */
const setupNavigation = (navListSelector: string): void => {
  // 指定されたセレクタにマッチするすべてのナビゲーションアイテムを取得
  const navItems = document.querySelectorAll<HTMLAnchorElement>(navListSelector);

  // 各ナビゲーションアイテムの幅を取得し、配列として保持
  const navWidths = Array.from(navItems, (item) => item.getBoundingClientRect().width);

  // 初期位置を計算し、三角形のマーカーを設定
  const initialPosition = calculateInitialPosition(navWidths[0]);
  gsap.set(".triangle_marker", { left: initialPosition });

  // 各ナビゲーションアイテムにクリックイベントを追加
  navItems.forEach((item, index) => {
    // クリック時にマーカーを移動する処理を追加
    item.addEventListener("click", () => handleNavItemClick(navWidths, index));
  });
};

/**
 * 初期位置の計算を行う関数
 * @param firstNavWidth - 最初のナビゲーションアイテムの幅
 * @returns マーカーの初期位置（ピクセル単位）
 */
const calculateInitialPosition = (firstNavWidth: number): number => {
  // ナビゲーションの最初のアイテムの幅の中央にマーカーを設定
  return firstNavWidth / 2 - 3;
};

/**
 * ナビゲーションアイテムがクリックされたときにマーカーを移動する処理
 * @param navWidths - ナビゲーションアイテムの幅の配列
 * @param index - クリックされたアイテムのインデックス
 */
const handleNavItemClick = (navWidths: number[], index: number): void => {
  // マーカーをクリックされたアイテムの位置に移動
  const pointerPosition = calculatePosition(navWidths, index);
  gsap.to(".triangle_marker", { left: pointerPosition });
};

/**
 * ナビゲーションアイテムの位置を計算する関数
 * @param widths - ナビゲーションアイテムの幅の配列
 * @param currentIndex - 現在のアイテムのインデックス
 * @returns マーカーが移動するべき位置（ピクセル単位）
 */
const calculatePosition = (widths: number[], currentIndex: number): number => {
  // 現在のアイテムまでの幅の合計を計算し、そのアイテムの中央をマーカーの位置とする
  const partialSum = widths.slice(0, currentIndex + 1).reduce((acc, width) => acc + width, 0);
  return partialSum - widths[currentIndex] / 2 + currentIndex * 20 - 3;
};
