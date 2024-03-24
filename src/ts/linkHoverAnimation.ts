import { gsap } from "gsap";

// リンクのホバーアニメーションを初期化する関数
export function initializeLinkHoverAnimation(): void {
  gsap.utils.toArray<HTMLAnchorElement>("a").forEach((ele) => {
    let linkHoverAnimation = gsap.fromTo(ele, { opacity: 1 }, { opacity: 0.5, paused: true, duration: 0.04, ease: "power4.easeout" });
    ele.addEventListener("mouseover", () => {
      linkHoverAnimation.play();
    });
    ele.addEventListener("mouseout", () => {
      linkHoverAnimation.reverse();
    });
  });
}
