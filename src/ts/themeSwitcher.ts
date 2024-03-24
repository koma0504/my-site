// themeSwitcher.ts

import { getCurrentTheme, setCurrentTheme } from "./themeState";
import { addObserver } from "./util/observer";

export function initializeThemeSwitcher(): void {
  const lightModeRadio = document.querySelector<HTMLInputElement>("#light");
  const darkModeRadio = document.querySelector<HTMLInputElement>("#dark");

  // UIを現在のテーマに合わせて更新
  const updateTheme = (theme: string) => {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);

    lightModeRadio!.checked = theme === "light";
    darkModeRadio!.checked = theme === "dark";
  };

  // ラジオボタンの変更でテーマを設定
  lightModeRadio!.addEventListener("change", () => {
    setCurrentTheme("light");
  });

  darkModeRadio!.addEventListener("change", () => {
    setCurrentTheme("dark");
  });

  // テーマ変更時にUI更新するリスナーを追加
  addObserver(updateTheme);

  // 初期化時に現在のテーマでUIを更新
  updateTheme(getCurrentTheme());
}

document.addEventListener("DOMContentLoaded", initializeThemeSwitcher);
