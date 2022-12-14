"use strict";
import "../scss/style.scss";
import gsap from "gsap";
import WebFont from "webfontloader";
import { theme } from "./theme";
import { textCircle } from "./textCircle";

window.addEventListener("DOMContentLoaded", () => {
  //bg関連//////////////////////////
  const darkImages =
    '<div class="bg js-bg"><img src="../image/image_dark01.jpg" alt="" /><img src="../image/image_dark02.jpg" alt="" /><img src="../image/image_dark03.jpg" alt="" /><img src="../image/image_dark04.jpg" alt="" /></div>';
  const lightImages =
    '<div class="bg js-bg"><img src="../image/image_light05.jpg" alt="" /><img src="../image/image_light02.jpg" alt="" /><img src="../image/image_light03.jpg" alt="" /><img src="../image/image_light04.jpg" alt="" /></div>';

  // bg追加
  const bgAppend = (bgHtmlEle) => {
    const bgContainer = document.querySelector(".bg_container");
    bgContainer.insertAdjacentHTML("afterbegin", bgHtmlEle);
  };
  // bg初期化
  const initBgImages = () => {
    const storageTheme = sessionStorage.getItem("theme");
    if (storageTheme === "is-theme-dark") {
      bgAppend(darkImages);
    } else if (storageTheme === "is-theme-light") {
      bgAppend(lightImages);
    }
  };
  initBgImages();
  // 背景の画像ランダム表示
  let bgImages = Array.from(document.querySelectorAll(".js-bg img"));
  const imageRandom = (imageArray) => {
    const random = Math.floor(Math.random() * bgImages.length);
    imageArray[random].style.display = "block";
  };

  imageRandom(bgImages); // テーマボタンクリック時BG変更
  const switchTheme = () => {
    const storageTheme = sessionStorage.getItem("theme");
    const bgContainer = document.querySelector(".bg_container");
    const bg = document.querySelector(".bg");
    bgContainer.removeChild(bg);
    if (storageTheme === "is-theme-dark") {
      bgAppend(darkImages);
      const bgImages = Array.from(document.querySelectorAll(".js-bg img"));
      imageRandom(bgImages);
    } else {
      bgAppend(lightImages);
      const bgImages = Array.from(document.querySelectorAll(".js-bg img"));
      imageRandom(bgImages);
    }
  };
  const switchThemeBtn = document.querySelectorAll(".js-theme_btn");
  switchThemeBtn.forEach((btn) => {
    btn.addEventListener("change", switchTheme);
  });
  //bg関連終わり//////////////////////////

  //page切り替え//////////////////////////
  const pageList = document.querySelectorAll(".js-main section");
  const pageArray = Array.from(pageList);
  const navList = document.querySelectorAll(".js-nav a");
  const navArray = Array.from(navList);

  //初期化
  pageList.forEach((page, index) => {
    if (index === 0) {
      page.style.display = "block";
    } else {
      page.style.display = "none";
    }
  });
  //動き
  const pageTransition = () => {
    navList.forEach((navItem) => {
      navItem.addEventListener("click", (e) => {
        e.preventDefault();
        pageList.forEach((page) => {
          page.style.display = "none";
        });
        const currentClass = navItem.className;
        //pageArrayの中でcurrentClassと同じクラスを持つ要素を取り出す
        const currentPage = pageArray.find((navItem) => navItem.className === currentClass);
        currentPage.style.display = "block";
        // 切り替わりのアニメーション
        gsap.fromTo(
          currentPage,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 2,
            ease: "power2.out",
          }
        );
      });
    });
  };
  pageTransition();
  //page切り替え//////////////////////////

  //リサイズ時の高さ調節
  let body = document.querySelector("body");
  body.style.height = "5000px";
  let bodyScrollHeight = body.scrollHeight; //スクロールしないと見えないところまで含めた全体の高さ
  let innerHeight = window.innerHeight;
  let windowHeight = bodyScrollHeight - innerHeight;

  const reportWindowSize = () => {
    innerHeight = window.innerHeight;
    windowHeight = bodyScrollHeight - innerHeight;
  };

  window.addEventListener("resize", reportWindowSize);

  // マッピング関数（修正版）
  const map = (value, fromMin, fromMax, toMin, toMax, trimming) => {
    let val = ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
    return trimming ? Math.Max(Math.min(val, toMax), toMin) : val;
  };
  // F値初期化
  gsap.set(".circle_number", { rotation: 218 });
  const scrollParallax = () => {
    let scrollY = window.pageYOffset;
    let rotationSize = map(scrollY, 0, windowHeight, 0, 325);
    let blurSize = map(scrollY, 0, windowHeight, 0, 80);

    gsap.to(".bg_container", { filter: "blur(" + blurSize + "px)" });
    gsap.to(".circle_number", { rotation: rotationSize + 218 });
  };
  window.addEventListener("scroll", scrollParallax);
  //webフォント読み込み後でないとフォントの横幅が変わって計算がずれる
  WebFont.load({
    custom: {
      families: ["IBM Plex Sans"],
      urls: ["../scss/style.scss"],
    },
    active: function () {
      // メニューの三角形が動く計算
      const navWidth = navArray.map((ele) => {
        return ele.getBoundingClientRect().width; //各メニューの幅
      });
      // 初期化
      gsap.set(".triangle_marker", { left: navWidth[0] / 2 - 3 });

      const navTransition = () => {
        navList.forEach((navItem, index) => {
          navItem.addEventListener("click", (e) => {
            const sumArray = (array) => {
              let sum = 0;
              for (let i = 0, len = index; i <= len; i++) {
                sum += array[i];
              }
              return sum - array[index] / 2 + index * 20 - 3;
            };
            let pointerPosition = sumArray(navWidth);

            gsap.to(".triangle_marker", { left: pointerPosition });
          });
        });
      };
      navTransition();
    },
  });
  //aタグにホバーした時のアニメーション
  gsap.utils.toArray("a").forEach((ele) => {
    let linkHoverAnimation = gsap.fromTo(ele, { opacity: 1 }, { opacity: 0.5, paused: true, duration: 0.04, ease: "power4.easeout" });
    ele.addEventListener("mouseover", () => {
      linkHoverAnimation.play();
    });
    ele.addEventListener("mouseout", () => {
      linkHoverAnimation.reverse();
    });
  });

  setTimeout(window.location.reload, 5000);
});
textCircle();
theme();
