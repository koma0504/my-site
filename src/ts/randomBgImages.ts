import { getCurrentTheme } from "./themeState";
import { addObserver } from "./util/observer";

/**
 * 現在のテーマに基づいてランダムに画像を表示する関数
 * ダークテーマではダークモードの画像、ライトテーマではライトモードの画像を表示する。
 */
export function displayImageBasedOnTheme(): void {
  // ダークモード用とライトモード用の画像をそれぞれ取得
  const darkImages: NodeListOf<HTMLImageElement> = document.querySelectorAll("#dark_images img");
  const lightImages: NodeListOf<HTMLImageElement> = document.querySelectorAll("#light_images img");

  // 画像が正しく取得されているかの確認用
  console.log(darkImages);
  console.log(lightImages);

  /**
   * 現在のテーマに基づいて、対応する画像を表示する関数
   * @param theme - 現在のテーマ（"dark" または "light"）
   */
  const updateImage = (theme: string): void => {
    // ランダムにダークモードとライトモードの画像を選択
    const darkRandomImg: HTMLImageElement = darkImages[Math.floor(Math.random() * darkImages.length)];
    const lightRandomImg: HTMLImageElement = lightImages[Math.floor(Math.random() * lightImages.length)];

    // すべての画像を一旦非表示にする
    hideAllImages(darkImages);
    hideAllImages(lightImages);

    // 現在のテーマに応じて、ランダムに選んだ画像を表示
    if (theme === "dark") {
      darkRandomImg.style.display = "block"; // ダークモードの画像を表示
      console.log("Displayed a random dark mode image");
    } else {
      lightRandomImg.style.display = "block"; // ライトモードの画像を表示
      console.log("Displayed a random light mode image");
    }
  };

  // テーマの変更を監視し、テーマが変わるたびに画像を更新
  addObserver(updateImage);

  // ページの初期表示時に、現在のテーマに応じた画像を表示
  updateImage(getCurrentTheme());
}

/**
 * すべての画像を非表示にするヘルパー関数
 * @param images - 非表示にする画像のリスト
 */
const hideAllImages = (images: NodeListOf<HTMLImageElement>): void => {
  images.forEach((img: HTMLImageElement) => (img.style.display = "none"));
};

// DOMが読み込まれたら画像表示の初期化を行う
document.addEventListener("DOMContentLoaded", displayImageBasedOnTheme);
