export const Scroll = () => {
  // wheel event
  const wheel = "onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll";

  // タッチイベントが有効かの判定
  const isTouch = typeof document.ontouchstart !== "undefined";

  // ポインターイベントを持っているかの判定
  const isPointer = window.navigator.pointerEnabled;

  const pointer = {
    start: isPointer ? "pointerdown" : isTouch ? "touchstart" : "mousedown",
    move: isPointer ? "pointermove" : isTouch ? "touchmove" : "mousemove",
    end: isPointer ? "pointerup" : isTouch ? "touchend" : "mouseup",
  };

  class Scroll {
    constructor(containerId, boxId) {
      // 親要素
      const container = document.getElementById(containerId);
      this._container = {
        elem: container,
        h: container.offsetHeight,
      };

      // 子要素
      const box = document.getElementById(boxId);
      this._box = {
        elem: box,
        h: 0, // 後で設定
      };

      this._windowSize = 0;

      this._setup();
    }

    update() {
      // ブラウザの幅を取得
      const w = document.documentElement.clientWidth || document.body.clientWidth;

      if (w !== this._windowSize) {
        this.deactivate();

        // 現在の横幅を記録する
        this._windowSize = w;

        this._setup();
        this.activate();
      }
    }

    activate() {
      // 子要素が親要素より小さい場合はイベントを発行しない
      if (this._box.h <= this._container.h) return false;

      this._ev = {};

      this._swipe();
      this._wheel();
    }

    deactivate() {
      // イベントを生成していない場合は処理しない
      if (this._ev === undefined) return false;

      const elem = this._container.elem;
      elem.removeEventListener(pointer.start, this._ev.start, false);
      elem.removeEventListener(pointer.move, this._ev.move, { passive: true });
      elem.removeEventListener(pointer.end, this._ev.end, false);
      elem.removeEventListener(wheel, this._ev.wheel, { passive: true });

      // イベントの初期化
      delete this._ev;
    }

    _setup() {
      // 子要素の高さを取得
      this._box.h = this._box.elem.offsetHeight;

      this._box.elem.removeAttribute("style");
      this._pos = 0;
    }

    _swipe() {
      // 子要素の最後が見える座標値
      const lastPos = this._container.h - this._box.h;

      // 座標の一時格納
      let startY = null;
      let startTime = null;
      let movePos = null;
      let endTime = null;

      const elem = this._container.elem;

      /* スタートイベント */
      const evStart = (e) => {
        // touchstartのときはtouchイベントを拾う
        startY = e.touches ? e.touches[0].pageY : e.pageY;
        startTime = e.timeStamp;

        // 初期化
        movePos = null;
        endTime = null;
      };

      this._ev.start = evStart.bind(this);
      elem.addEventListener(pointer.start, this._ev.start, false);

      /* ムーブイベント */
      const evMove = (e) => {
        // startを通ってない場合は処理しない
        if (startY == null) return false;

        // ウィンドウ全体をスクロールさせない
        e.preventDefault();

        const pageY = e.touches ? e.touches[0].pageY : e.pageY;

        // 移動させるピクセル数を計算
        movePos = Math.floor(pageY - startY - Math.abs(this._pos));

        this._animation(movePos, 0);

        endTime = e.timeStamp;
      };

      this._ev.move = evMove.bind(this);
      elem.addEventListener(pointer.move, this._ev.move, { passive: false });

      /* エンドイベント */
      const evEnd = () => {
        // moveイベントを通ってなければ単なるクリックと判定
        if (movePos == null) return false;

        // 最終px位置の格納
        let pos = 0;

        // 要素の高さと最終的な移動量の差分
        const diffH = this._box.h - Math.abs(movePos);

        if (movePos > 0) {
          // 下に引っ張りすぎた!
          pos = 0;
        } else if (diffH < this._container.h) {
          // 上に行き過ぎた！
          pos = lastPos;
        } else {
          const vertical = movePos - this._pos;
          const diffTime = endTime - startTime;

          // すんなり止まると違和感あるので慣性を効かせるために付与する移動量
          const reverb = Math.floor((Math.abs(vertical) / diffTime) * 100);

          if (vertical > 0) {
            // 下へ移動
            pos = movePos + reverb;
            if (pos > 0) pos = 0;
          } else {
            // 上へ移動
            pos = movePos - reverb;
            if (pos < lastPos) pos = lastPos;
          }
        }

        this._animation(pos, 0.3);

        // 初期化
        this._pos = pos;
        startY = null;
      };

      this._ev.end = evEnd.bind(this);
      elem.addEventListener(pointer.end, this._ev.end, false);
    }

    _wheel() {
      const lastPos = this._container.h - this._box.h;

      const ev = (e) => {
        // ウィンドウ全体のスクロールはさせない
        e.preventDefault();

        // ブラウザによってホイール移動した量の情報が格納されている場所が違う
        const delta = e.deltaY ? -e.deltaY : e.wheelDelta || -e.detail;

        // そのままホイール移動量を付与すると一気に進んでしまうので、付与するホイール量を抑える
        let pos = Math.floor(this._pos + delta / 3);

        if (pos > 0) {
          pos = 0;
        } else if (pos < lastPos) {
          pos = lastPos;
        }

        this._animation(pos, 0.1);
        this._pos = pos;
      };

      this._ev.wheel = ev.bind(this);
      this._container.elem.addEventListener(wheel, this._ev.wheel, { passive: false });
    }

    _animation(pos, duration) {
      const ops = `${duration}s linear`;
      const transform = `translate3d(0, ${pos}px, 0)`;
      const elem = this._box.elem;

      elem.style["-webkit-transform"] = transform;
      elem.style["transform"] = transform;
      elem.style["-webkit-transition"] = `-webkit-transform ${ops}`;
      elem.style["transition"] = `transform ${ops}`;
    }
  }
  //   const sc = new Scroll("projects", "contents");
  //   sc.activate();
  //   window.addEventListener("resize", () => {
  //     sc.update();
  //   });
};
