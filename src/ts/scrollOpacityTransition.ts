import gsap from "gsap";
import { mapValueToRange } from "./util/mapValueToRange";

/**
 * 初期設定：F値（rotation）の初期値を設定
 * 初期値は .circle_number 要素に対して rotation 218 をセット
 */
gsap.set(".circle_number", { rotation: 218 });

/**
 * スクロールによるパララックス効果を実装する関数
 * スクロール位置に応じて、バックグラウンドのブラー効果と回転を変更する。
 */
const scrollParallax = (): void => {
  // 現在のスクロール量を取得
  const scrollY: number = window.pageYOffset;

  // ウィンドウの高さを取得
  const windowHeight: number = window.innerHeight;

  // スクロール量を回転角度にマッピング（0 から 325 の範囲に変換）
  const rotationSize: number = mapValueToRange(scrollY, 0, windowHeight, 0, 325);

  // スクロール量をブラーのピクセル数にマッピング（0 から 80 の範囲に変換）
  const blurSize: number = mapValueToRange(scrollY, 0, windowHeight, 0, 80);

  // 背景画像に対してブラー効果を適用
  gsap.to(".bg_container", { filter: `blur(${blurSize}px)` });

  // .circle_number 要素に対して回転を適用
  gsap.to(".circle_number", { rotation: rotationSize + 218 });
};

// スクロールイベントが発生したときに scrollParallax 関数を実行
window.addEventListener("scroll", scrollParallax);
