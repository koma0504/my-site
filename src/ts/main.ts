"use strict";
import "../scss/style.scss";
import { ToArch } from "./toArch";
import { initializeThemeSwitcher } from "./themeSwitcher";
import { initializePageTransition } from "./pageTransition";
import { initializeNavTransition } from "./navTransition";
import { initializeLinkHoverAnimation } from "./linkHoverAnimation";
import { displayImageBasedOnTheme } from "./randomBgImages";
import { getScrollPosition } from "./scrollTracker";
import { transitionMapping } from "./util/transitionMapping";
import gsap from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  // テーマ切り替え
  initializeThemeSwitcher();
  //数字を円形にする
  const archtarget = document.querySelector(".circle_number") as HTMLElement;
  if (archtarget) {
    ToArch(archtarget);
  }
  initializePageTransition();
  initializeNavTransition();
  initializeLinkHoverAnimation();
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

  // パララックス効果を適用する関数
  const applyParallaxEffect = (bodyScrollHeight) => {
    const scrollY = getScrollPosition();
    const rotationSize = transitionMapping(scrollY, 0, getWindowHeight(bodyScrollHeight), 0, 325);
    const blurSize = transitionMapping(scrollY, 0, getWindowHeight(bodyScrollHeight), 0, 80);
    gsap.to(".bg_container", { filter: `blur(${blurSize}px)` });
    gsap.to(".circle_number", { rotation: rotationSize + 218 });
  };

  // 初期化関数
  const init = () => {
    const body = document.querySelector("body");
    body.style.height = "5000px";
    const bodyScrollHeight = body.scrollHeight;

    handleResize(bodyScrollHeight);
    window.addEventListener("resize", () => handleResize(bodyScrollHeight));
    window.addEventListener("scroll", () => applyParallaxEffect(bodyScrollHeight));
  };

  init();
});
