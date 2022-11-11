import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "./", // 相対パスを指定する。デプロイ先がルートでない場合にも対応
  build: {
    outDir: "../dist",
  },
});
