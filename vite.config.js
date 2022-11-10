import { defineConfig } from "vite";
export default defineConfig({
  base: "./", // 相対パスを指定する。デプロイ先がルートでない場合にも対応
  root: "src",
  build: {
    outDir: "../dist",
  },
});
