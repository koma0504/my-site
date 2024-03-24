// 引数elementの型をHTMLElementに指定
export const ToArch = (element: HTMLElement): HTMLElement => {
  // 要素内のテキストを抜き出して配列にする
  let textContent = element.textContent;
  if (!textContent) {
    return element; // テキストがない場合は、そのままelementを返す
  }
  let text = textContent.split(",");

  // 要素内のテキストを1文字ずつ包み、それらに角度と高さを設定
  element.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    // 要素の角度
    let divrotate = (360 / text.length) * i;

    let divnode = document.createElement("span");
    divnode.textContent = text[i];
    divnode.style.position = "absolute";
    divnode.style.height = "50%";
    divnode.style.color = "unset";
    divnode.style.transformOrigin = "bottom center";
    divnode.style.top = "0";
    divnode.style.left = "40%";
    divnode.style.transform = `rotate(${divrotate}deg)`;
    element.appendChild(divnode);
  }
  return element;
};
