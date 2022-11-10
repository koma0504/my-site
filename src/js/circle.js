export const circle = () => {
  // 文字を円にする
  const ToArch = (element) => {
    // 要素内のテキストを抜き出して配列にする
    let text = element.textContent;
    text = text.split(",");

    // 要素内のテキストを１文字ずつかこみ、それらに角度と高さを設定
    element.innerHTML = "";
    for (let int = 0; int < text.length; int++) {
      let divnode = null;

      // 要素の角度
      let divrotate = (360 / text.length) * int;

      divnode = document.createElement("span");
      divnode.innerHTML = text[int];
      divnode.style.position = "absolute";
      divnode.style.height = "50%";
      divnode.style.color = "unset";
      divnode.style.transformOrigin = "bottom center";
      divnode.style.top = "0";
      divnode.style.bottom = "0";
      divnode.style.left = "40%";
      divnode.style.transform = "rotate(" + divrotate + "deg)";
      element.appendChild(divnode);
    }
    return element;
  };

  // 引数にはdocument要素を入れること。
  const archtarget = document.querySelector(".circle_number");
  ToArch(archtarget);
};
