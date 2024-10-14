// circularText.ts

/**
 * 中心座標を表すインターフェース
 */
interface Point {
  x: number;
  y: number;
}

/**
 * オプション設定をまとめたインターフェース
 */
interface CircularTextOptions {
  radius: number;
  center: Point;
  // duration: number;
  appendToSelector: string; // SVGを追加する要素のセレクタ（例: '.circle'）
  textSelector: string; // テキストを取得する要素のセレクタ（例: '.circle_number'）
  svgClass?: string;
  groupClass?: string;
  textClass?: string;
}

/**
 * 円形に配置されたテキストを含むSVG要素を作成します。
 * @param text - カンマで区切られた文字列。
 * @param options - オプション設定。
 * @returns 作成されたSVG要素。
 */
export function createCircularText(text: string, options: CircularTextOptions): SVGSVGElement {
  const SVG_NS = "http://www.w3.org/2000/svg";

  // テキストをカンマで分割し、配列に変換
  const substrings = text.split(",");
  const numSubstrings = substrings.length;

  // SVG要素の作成と基本属性の設定
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", (options.center.x * 2).toString());
  svg.setAttribute("height", (options.center.y * 2).toString());
  svg.setAttribute("viewBox", `0 0 ${options.center.x * 2} ${options.center.y * 2}`);

  // SVG要素にクラスを適用
  if (options.svgClass) {
    svg.setAttribute("class", options.svgClass);
  }

  // グループ要素の作成と中心への移動
  const group = document.createElementNS(SVG_NS, "g");
  group.setAttribute("transform", `translate(${options.center.x}, ${options.center.y})`);

  // グループ要素にクラスを適用
  if (options.groupClass) {
    group.setAttribute("class", options.groupClass);
  }

  svg.appendChild(group);

  // 各テキスト要素を円周上に配置
  substrings.forEach((substring, index) => {
    // 角度の計算（ラジアン）
    const angle = (index / numSubstrings) * 2 * Math.PI - Math.PI / 2; // 上から開始

    // テキストの位置を計算
    const x = options.radius * Math.cos(angle);
    const y = options.radius * Math.sin(angle);

    // テキスト要素の作成と属性の設定
    const textElem = document.createElementNS(SVG_NS, "text");
    textElem.setAttribute("x", x.toString());
    textElem.setAttribute("y", y.toString());
    textElem.setAttribute("text-anchor", "middle");
    textElem.setAttribute("dominant-baseline", "middle");

    // テキスト要素にクラスを適用
    if (options.textClass) {
      textElem.setAttribute("class", options.textClass);
    }

    // テキストを回転させて読みやすくする
    const rotation = (angle * 180) / Math.PI + 90;
    textElem.setAttribute("transform", `rotate(${rotation}, ${x}, ${y})`);

    // テキストコンテンツを設定
    textElem.textContent = substring.trim();

    group.appendChild(textElem);
  });

  return svg;
}

// /**
//  * SVGグループ要素を中心点を基準に回転アニメーションさせます。
//  * @param group - 回転させるSVGグループ要素。
//  * @param options - オプション設定。
//  */
// export function animateRotation(group: SVGGElement, options: CircularTextOptions): void {
//   let startTime: number | null = null;

//   // アニメーション関数
//   function rotate(timestamp: number) {
//     if (startTime === null) startTime = timestamp;
//     const elapsed = timestamp - startTime;
//     const angle = (elapsed / options.duration) * 360;

//     // 回転変換を適用
//     group.setAttribute("transform", `translate(${options.center.x}, ${options.center.y}) rotate(${angle})`);

//     if (elapsed < options.duration) {
//       requestAnimationFrame(rotate);
//     } else {
//       // アニメーション終了時に角度をリセット
//       group.setAttribute("transform", `translate(${options.center.x}, ${options.center.y}) rotate(0)`);
//     }
//   }

//   requestAnimationFrame(rotate);
// }

/**
 * 円形テキストを指定されたオプションでレンダリングします。
 * @param options - オプション設定。
 */
export function renderCircularText(options: CircularTextOptions): void {
  // 指定されたセレクタの要素を取得
  const elements = document.querySelectorAll(options.textSelector);
  if (elements.length === 0) {
    console.error(`セレクタ "${options.textSelector}" に一致する要素が見つかりませんでした。`);
    return;
  }

  // 各要素のテキストコンテンツを取得し、カンマで結合
  const text = Array.from(elements)
    .map((element) => element.textContent?.trim() || "")
    .join(",");

  // SVG要素を作成
  const svg = createCircularText(text, options);

  // SVGを指定された要素に追加
  const appendToElement = document.querySelector(options.appendToSelector);
  if (appendToElement) {
    appendToElement.appendChild(svg);
  } else {
    console.error(`セレクタ "${options.appendToSelector}" に一致する要素が見つかりませんでした。`);
    return;
  }

  // グループ要素を取得
  const group = svg.querySelector("g") as SVGGElement;
  if (!group) {
    console.error("SVG内にグループ要素が見つかりませんでした。");
    return;
  }

  // アニメーションを開始
  // animateRotation(group, options);
}
