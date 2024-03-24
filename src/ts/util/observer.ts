// observer.ts

// 監視リスナーを保持する配列
const listeners: Function[] = [];

// リスナーを追加する関数
export const addObserver = (listener: Function) => {
  listeners.push(listener);
};

// すべてのリスナーに通知する関数
export const notifyObservers = (theme: string) => {
  listeners.forEach((listener) => listener(theme));
};
