"use strict";
import "../scss/style.scss";
import { ToArch } from "./toArch";
import { initializeThemeSwitcher } from "./themeSwitcher";
import { initializePageTransition } from "./pageTransition";
import { initializeNavTransition } from "./navTransition";
import { initializeLinkHoverAnimation } from "./linkHoverAnimation";
import { displayImageBasedOnTheme } from "./randomBgImages";
import { getScrollPosition } from "./scrollTracker";
import { mapValueToRange } from "./util/mapValueToRange";
import gsap from "gsap";
import { renderCircularText } from "./renderCircularText";

window.addEventListener("DOMContentLoaded", () => {
  //　右上の円形を製作する処理
  const options = {
    textSelector: ".circle_number", // テキストを取得する要素のセレクタ
    radius: 64,
    center: { x: 80, y: 80 },
    // duration: 5000, // アニメーションの長さ（ミリ秒）
    appendToSelector: ".circle", // SVGを追加する要素のセレクタ
    svgClass: "circular_svg",
    groupClass: "circular_group",
    textClass: "circular_text",
  };
  renderCircularText(options);

  // テーマ切り替え;
  initializeThemeSwitcher();
  //ページ遷移
  initializePageTransition(".js-main section", ".js-nav a");
  // ナビアニメーション
  initializeNavTransition(".js-nav a");
  // リンクホバーアニメーション
  initializeLinkHoverAnimation("a");
  // ランダム背景画像
  displayImageBasedOnTheme();
  // 画面の高さを取得する関数
  const getInnerHeight = () => window.innerHeight;
  // スクロールが必要な全体の高さを計算する関数
  const getWindowHeight = (bodyScrollHeight) => bodyScrollHeight - getInnerHeight();
  // ウィンドウのリサイズ時に行う処理
  const handleResize = (bodyScrollHeight) => {
    const windowHeight = getWindowHeight(bodyScrollHeight);
    console.log(windowHeight); // 必要に応じてリサイズ時の処理をここに追加
  };
  // スクロール位置を取得する関数
  const getScrollPosition = () => window.scrollY || document.documentElement.scrollTop;
  // パララックス効果を適用する関数;
  const applyParallaxEffect = (bodyScrollHeight) => {
    const scrollY = getScrollPosition();
    const rotationSize = mapValueToRange(scrollY, 0, getWindowHeight(bodyScrollHeight), 0, 325);
    const blurSize = mapValueToRange(scrollY, 0, getWindowHeight(bodyScrollHeight), 0, 80);
    gsap.to(".bg_container", { filter: `blur(${blurSize}px)` });
    gsap.to(".circular_svg", { rotation: rotationSize + 218 });
  };
  // 初期化関数
  const init = () => {
    const body = document.querySelector("body");
    if (body) {
      body.style.height = "5000px";
      const bodyScrollHeight = body.scrollHeight;
      handleResize(bodyScrollHeight);
      window.addEventListener("resize", () => handleResize(bodyScrollHeight));
      window.addEventListener("scroll", () => applyParallaxEffect(bodyScrollHeight));
    }
  };
  init();
});
