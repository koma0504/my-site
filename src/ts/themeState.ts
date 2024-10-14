import { notifyObservers } from "./util/observer";

// 利用可能なテーマの型を定義（"light" または "dark"）
type Theme = "light" | "dark";

// テーマの状態を保持するオブジェクトのインターフェース
interface ThemeState {
  currentTheme: Theme;
}

/**
 * 初期テーマ状態の設定
 * - ローカルストレージに保存されているテーマを使用（存在する場合）
 * - もし存在しなければ、ユーザーのシステム設定に基づいてテーマを決定
 * - デフォルトではシステム設定に基づくテーマ（"light" または "dark"）を使用
 */
const themeState: ThemeState = {
  currentTheme: (localStorage.getItem("theme") as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
};

/**
 * 現在のテーマを取得する関数
 * @returns {Theme} 現在のテーマ（"light" または "dark"）
 */
export const getCurrentTheme = (): Theme => {
  return themeState.currentTheme;
};

/**
 * 新しいテーマを設定する関数
 * - テーマを更新し、ローカルストレージに保存する
 * - テーマ変更時にはオブザーバーに通知して他のコンポーネントに反映させる
 * @param {Theme} newTheme - 新しく設定するテーマ
 */
export const setCurrentTheme = (newTheme: Theme): void => {
  // テーマ状態を更新
  themeState.currentTheme = newTheme;

  // ローカルストレージに新しいテーマを保存
  localStorage.setItem("theme", newTheme);

  // オブザーバーにテーマ変更を通知して、他のコンポーネントに反映させる
  notifyObservers(newTheme);
};
