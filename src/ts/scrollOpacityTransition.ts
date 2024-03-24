import gsap from "gsap";
import { transitionMapping } from "./util/transitionMapping";

// F値初期化
gsap.set(".circle_number", { rotation: 218 });
const scrollParallax = () => {
  let scrollY = window.pageYOffset;
  let rotationSize = transitionMapping(scrollY, 0, windowHeight, 0, 325);
  let blurSize = transitionMapping(scrollY, 0, windowHeight, 0, 80);

  gsap.to(".bg_container", { filter: "blur(" + blurSize + "px)" });
  gsap.to(".circle_number", { rotation: rotationSize + 218 });
};
window.addEventListener("scroll", scrollParallax);
