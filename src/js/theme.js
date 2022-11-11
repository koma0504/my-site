export const theme = () => {
  // 初回セッションか判断する(状態管理)
  const applyVisited = (status) => {
    sessionStorage.setItem("status", status);
  };

  // hrmlにclassを設定する。
  // テーマを適応する(テーマの状態管理)
  const applyTheme = (themeName) => {
    sessionStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  };

  const initialTheme = () => {
    // OSテーマがダークモードか判断する
    // t/f
    const prefersColorSchemeDark = matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersColorSchemeDark) {
      applyTheme("is-theme-dark");
    } else {
      applyTheme("is-theme-light");
    }
  };

  //セッションストレージからテーマの情報を取得する
  const getStorageTheme = () => {
    const storageTheme = sessionStorage.getItem("theme");
    if (storageTheme === "is-theme-dark") {
      applyTheme("is-theme-dark");
    } else if (storageTheme === "is-theme-light") {
      applyTheme("is-theme-light");
    }
  };
  // ラジオボタンのチェックの位置判定
  const initialBtn = () => {
    const storageTheme = sessionStorage.getItem("theme");
    console.log(storageTheme);
    if (storageTheme == "is-theme-dark") {
      document.querySelector(".dark_btn").checked = true;
    } else {
      document.querySelector(".light_btn").checked = true;
    }
  };
  initialBtn();

  // ボタンクリックでテーマを切り替える
  const switchTheme = () => {
    const storageTheme = sessionStorage.getItem("theme");
    if (storageTheme !== "is-theme-dark") {
      applyTheme("is-theme-dark");
      sessionStorage.setItem("theme", "is-theme-dark");
    } else {
      applyTheme("is-theme-light");
      sessionStorage.setItem("theme", "is-theme-light");
    }
  };
  const switchThemeBtn = document.querySelectorAll(".js-theme_btn");
  switchThemeBtn.forEach((btn) => {
    btn.addEventListener("change", switchTheme);
  });

  // 状況に応じてテーマを適応する
  const discriminationTheme = () => {
    const getStrageVisited = sessionStorage.getItem("status");
    if (getStrageVisited) {
      // 初回アクセス以外、ページ遷移や再読み込みが発生した時に実行する処
      // セッションストレージの情報を元にテーマを適応
      getStorageTheme();
      console.log("初回以降");
    } else {
      // 初回アクセス時に実行する処理
      // ユーザーのOSテーマを元にサイトのテーマを適応
      console.log("初回");
      initialTheme();
      applyVisited("visted");
    }
  };
  discriminationTheme();
};
