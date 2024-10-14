import { gsap } from "gsap";

/**
 * リンク要素にホバー時のアニメーションを適用する関数
 * @param ancherLinkSelector - 対象とするリンク要素のセレクタ（例: "a", ".link-class" など）
 */
export function initializeLinkHoverAnimation(ancherLinkSelector: string): void {
  // 指定されたセレクタにマッチするリンク要素をすべて取得
  const links = gsap.utils.toArray<HTMLAnchorElement>(ancherLinkSelector);

  // 各リンクに対してホバー時のアニメーションを設定
  links.forEach((ele) => {
    // リンクがホバーされた際に実行されるアニメーションを定義
    const linkHoverAnimation = gsap.fromTo(
      ele,
      { opacity: 1 }, // 初期の不透明度（ホバー前の状態）
      {
        opacity: 0.5, // ホバー時の不透明度
        duration: 0.4, // アニメーションの長さ（0.4秒）
        ease: "power2.inOut", // イージングを指定（ゆっくり始まりゆっくり終わる）
        paused: true, // アニメーションは最初は停止
        reversed: true, // 初期状態はアニメーションの逆再生（ホバー解除時と同じ）
      }
    );

    // ホバーが開始されたときの処理
    ele.addEventListener("mouseenter", () => {
      // ホバー時にアニメーションを再生
      linkHoverAnimation.play();
    });

    // ホバーが解除されたときの処理
    ele.addEventListener("mouseleave", () => {
      // ホバー解除時にアニメーションを逆再生
      linkHoverAnimation.reverse();
    });
  });
}
