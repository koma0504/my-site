import { getCurrentTheme } from "./themeState";
import { addObserver } from "./util/observer";

export function displayImageBasedOnTheme(): void {
  const imageElement = document.getElementById("themeImage") as HTMLImageElement;

  if (!imageElement) {
    console.error("Image element not found");
    return;
  }

  const darkThemeImagePaths = ["../images/image_dark01.jpg", "../images/image_dark02.jpg", "../images/image_dark03.jpg", "../images/image_dark04.jpg"];
  const lightThemeImagePaths = ["../images/image_light02.jpg", "../images/image_light03.jpg", "../images/image_light04.jpg", "../images/image_light05.jpg", "../images/image_light06.jpg"];

  // 画像パスの配列からランダムに画像を選択する関数
  const getRandomImagePath = (paths: string[]) => {
    return paths[Math.floor(Math.random() * paths.length)];
  };

  const preloadImage = (src: string, callback: () => void) => {
    const img = new Image();
    img.onload = callback;
    img.src = src;
  };

  const updateImage = (theme: string) => {
    const selectedImagePath = theme === "dark" ? getRandomImagePath(darkThemeImagePaths) : getRandomImagePath(lightThemeImagePaths);

    // プリロードしてから画像を更新
    preloadImage(selectedImagePath, () => {
      imageElement.src = selectedImagePath;
      console.log(`${theme === "dark" ? "ダーク" : "ライト"}モード用の画像をランダムに表示`);
    });
  };

  addObserver(updateImage);
  updateImage(getCurrentTheme());
}

document.addEventListener("DOMContentLoaded", displayImageBasedOnTheme);
