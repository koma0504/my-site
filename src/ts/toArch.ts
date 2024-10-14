interface ToArchOptions {
  separator?: string; // テキストを分割するための区切り文字（デフォルトはカンマ）
  radius?: string; // 回転させる要素の高さ（デフォルトは "50%"）
  baseRotation?: number; // 回転の基準となる角度（デフォルトは 360 度）
  color?: string; // 文字の色（デフォルトは "unset"）
}

/**
 * 指定した要素内のテキストを円形に配置する関数
 * @param className - 対象の要素のクラス名
 * @param options - テキストを円形に配置するためのオプション（省略可能）
 * @returns 対象の HTML 要素
 */
export const ToArch = (
  className: string,
  options: ToArchOptions = {} // オプションはデフォルト値を持つ
): HTMLElement | null => {
  // オプションのデフォルト値を設定
  const { separator = ",", radius = "120px", baseRotation = 360, color = "unset" } = options;

  // 指定されたクラス名から要素を取得
  const element = document.querySelector<HTMLElement>(className);

  // 要素が存在しない場合は null を返す
  if (!element) {
    console.error(`要素が見つかりません: ${className}`);
    return null;
  }

  // 要素内のテキストを取得し、空白を削除した状態にする
  const textContent = element.textContent?.trim();

  // テキストが存在しない場合は処理を終了
  if (!textContent) return element;

  // テキストを区切り文字で分割して配列にする
  const textArray = textContent.split(separator);

  // 要素内をクリア（既存のテキストを消す）
  element.innerHTML = "";

  // テキストを1文字ずつ処理して span 要素を作成し、スタイルを適用
  textArray.forEach((char, index) => {
    // 各文字に適用する回転角度を計算
    const rotationAngle = (baseRotation / textArray.length) * index;

    // span 要素を作成して文字を設定
    const spanElement = document.createElement("span");
    spanElement.textContent = char;

    // span 要素のスタイルを設定（position, height, color, transformなど）
    Object.assign(spanElement.style, {
      position: "absolute",
      height: radius,
      top: "0",
      left: "39%",
      transform: `rotate(${rotationAngle}deg)`,
    });

    // span 要素を親要素に追加
    element.appendChild(spanElement);
  });

  // 最終的に処理された要素を返す
  return element;
};
