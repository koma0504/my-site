// マッピング関数（修正版）
export const transitionMapping = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
  trimming?: boolean // オプショナル引数
): number => {
  let val = ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
  if (trimming) {
    val = Math.max(Math.min(val, toMax), toMin);
  }
  return val;
};
