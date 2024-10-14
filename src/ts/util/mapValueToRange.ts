/**
 * 任意の範囲の値を別の範囲にマッピングする汎用関数
 * @param value - マッピングする元の値
 * @param fromMin - 元の範囲の最小値
 * @param fromMax - 元の範囲の最大値
 * @param toMin - マッピング先の範囲の最小値
 * @param toMax - マッピング先の範囲の最大値
 * @param shouldTrim - true の場合、結果をマッピング先の範囲内に制限する（オプショナル）
 * @returns マッピングされた値
 */
export const mapValueToRange = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
  shouldTrim = false // デフォルトをfalseに設定
): number => {
  // まずは元の範囲からの割合を計算
  const ratio = (value - fromMin) / (fromMax - fromMin);

  // マッピング先の範囲での値を計算
  let mappedValue = ratio * (toMax - toMin) + toMin;

  // 結果を範囲内に制限するオプションを適用
  if (shouldTrim) {
    mappedValue = Math.max(toMin, Math.min(mappedValue, toMax));
  }

  // 浮動小数点の誤差を丸める (特に小数点を扱う場合)
  return parseFloat(mappedValue.toFixed(10));
};
