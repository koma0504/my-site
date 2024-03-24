// themeState.ts
// 状態管理と通知のロジックを組み込む
import { notifyObservers } from "./util/observer";

// 利用可能なテーマの型を定義
type Theme = "light" | "dark";

// テーマの状態を持つオブジェクト
interface ThemeState {
  currentTheme: Theme;
}

// 初期状態の設定。ローカルストレージからテーマを取得するか、システムの設定を使用
const themeState: ThemeState = {
  currentTheme: (localStorage.getItem("theme") as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
};

// 現在のテーマを取得する関数
export const getCurrentTheme = (): Theme => {
  return themeState.currentTheme;
};

// 新しいテーマを設定し、ローカルストレージに保存する関数
export const setCurrentTheme = (newTheme: Theme) => {
  themeState.currentTheme = newTheme;
  localStorage.setItem("theme", newTheme);
  notifyObservers(newTheme); // 状態変更時にオブザーバーに通知
};
