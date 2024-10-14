import { getCurrentTheme, setCurrentTheme } from "./themeState";
import { addObserver } from "./util/observer";

/**
 * テーマスイッチャーを初期化する関数
 * - 現在のテーマに基づいてUIを更新し、ユーザーがテーマを切り替えた際に処理を行う
 */
export function initializeThemeSwitcher(): void {
  // ライトモードとダークモードのラジオボタンを取得
  const lightModeRadio = document.querySelector<HTMLInputElement>("#light");
  const darkModeRadio = document.querySelector<HTMLInputElement>("#dark");

  // UIを現在のテーマに合わせて更新する関数
  const updateTheme = (theme: string): void => {
    // 現在のテーマに応じて body のクラスを更新
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);

    // ラジオボタンの状態を更新
    if (lightModeRadio && darkModeRadio) {
      lightModeRadio.checked = theme === "light";
      darkModeRadio.checked = theme === "dark";
    }
  };

  // ライトモードのラジオボタンが変更されたときにテーマを「light」に設定
  lightModeRadio?.addEventListener("change", () => {
    setCurrentTheme("light");
  });

  // ダークモードのラジオボタンが変更されたときにテーマを「dark」に設定
  darkModeRadio?.addEventListener("change", () => {
    setCurrentTheme("dark");
  });

  // テーマの変更時にUIを更新するためのリスナーを追加
  addObserver(updateTheme);

  // ページの初期化時に現在のテーマでUIを更新
  updateTheme(getCurrentTheme());
}

// DOMが読み込まれたらテーマスイッチャーを初期化
document.addEventListener("DOMContentLoaded", initializeThemeSwitcher);
