/**
 * 監視リスナーを保持するための配列
 * リスナーは、特定のイベントが発生したときに実行されるコールバック関数
 */
const listeners: Array<(data: string) => void> = [];

/**
 * リスナーを追加する関数
 * @param listener - テーマ変更など、状態が変わったときに実行されるコールバック関数
 * この関数は、変更が発生したときに通知を受けたいロジックを登録するために使用
 */
export const addObserver = (listener: (data: string) => void): void => {
  // リスナーを配列に追加
  listeners.push(listener);
};

/**
 * すべてのリスナーに通知を送信する関数
 * @param data - リスナーに送信するデータ（テーマや他の状態）
 * この関数は、状態が変わったときに呼ばれ、登録されたすべてのリスナーに通知が行われる
 */
export const notifyObservers = (data: string): void => {
  // リスナー配列をループして、それぞれに変更されたデータを渡して実行
  listeners.forEach((listener) => listener(data));
};
