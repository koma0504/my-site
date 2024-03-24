// imageDisplay.ts

import { getCurrentTheme } from "./themeState";
import { addObserver } from "./util/observer";

export function displayImageBasedOnTheme(): void {
  const imageElement = document.getElementById("themeImage") as HTMLImageElement;

  if (!imageElement) {
    console.error("Image element not found");
    return;
  }

  // ダークモードとライトモードの画像パスを配列で定義
  const darkThemeImagePaths = ["../images/image_dark01.jpg", "../images/image_dark02.jpg", "../images/image_dark03.jpg", "../images/image_dark04.jpg"];
  const lightThemeImagePaths = ["../images/image_light02.jpg", "../images/image_light03.jpg", "../images/image_light04.jpg", "../images/image_light05.jpg", "../images/image_light06.jpg"];

  // 画像パスの配列からランダムに画像を選択する関数
  const getRandomImagePath = (paths: string[]) => {
    return paths[Math.floor(Math.random() * paths.length)];
  };

  const updateImage = (theme: string) => {
    // 現在のテーマに応じて画像配列を選択し、ランダムに画像を表示
    if (theme === "dark") {
      imageElement.src = getRandomImagePath(darkThemeImagePaths);
      console.log("ダークモード用の画像をランダムに表示");
    } else {
      imageElement.src = getRandomImagePath(lightThemeImagePaths);
      console.log("ライトモード用の画像をランダムに表示");
    }
  };

  addObserver(updateImage);
  updateImage(getCurrentTheme());
}

document.addEventListener("DOMContentLoaded", displayImageBasedOnTheme);
