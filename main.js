// 定義
const panel = document.getElementById("panel");
let allNum = [1, 2, 3, 4];
let card1 = [];
let card2 = [];

// allNumから重複しないように乱数を取り出してcard1に入れる
for (let i = 0; i < 4; i++) {
  while (true) {
    const numRandom = Math.floor(Math.random() * allNum.length);
    if (!card1.includes(allNum[numRandom])) {
      card1.push(allNum[numRandom]);
      break;
    }
  }
  // allNumから重複しないように乱数を取り出してcard2に入れる
  while (true) {
    const numRandom = Math.floor(Math.random() * allNum.length);
    if (!card2.includes(allNum[numRandom])) {
      card2.push(allNum[numRandom]);
      break;
    }
  }
}
// card1とcard2を、1つの配列にまとめる
let card = card1.concat(card2);
console.log(card);
let first = null;
let second = null;
let timer = null;

// div要素を8こ作る、またdiv要素にclass属性の、"card","back"を加える
for (let k = 0; k < 8; k++) {
  let newDiv = document.createElement("div");
  panel.appendChild(newDiv);
  newDiv.classList.add("card", "back");
  newDiv.onclick = () => {
    // timer処理中の処理
    if (timer) {
      clearTimeout(timer);
      judge();
    }
    // 1枚目のカードクリック時にfirstの中身がない場合、一枚目のdiv要素をfirstに代入
    // 1枚目のカードを表にして、番号を見れるようにする
    if (!first) {
      first = newDiv;
      first.textContent = card[k]
      first.classList.remove('back');
      console.log(first);
      // 2枚目のカードクリック時にfirstの値は入っているので、elseが実行される
      // 2枚目のカードのdiv要素をsecondに代入
      // 0.5秒間、2枚目のカードの値を見れるようにして、裏にする
    } else {
      second = newDiv;
      second.textContent = card[k];
      second.classList.remove('back');
      console.log(second);
      timer = setTimeout(judge, 500);
    }
  }
}

function judge() {
  // めくったカードの番号が同じだったらclass "finish"を追加してカードを非表示にする
  if (first.innerHTML === second.innerHTML) {
    first.textContent = "";
    second.textContent = "";
    first.classList.add("finish");
    second.classList.add("finish");
    first = null;
    second = null;
    timer = null;
    // めくったカードの番号が違う場合は、class "card","back"を追加してカードを裏にする
  } else {
    first.textContent = "";
    second.textContent = "";
    first.classList.add("card", "back");
    second.classList.add("card", "back");
    first = null;
    second = null;
    timer = null;
  }
}

// memo
// 同じ番号を二回連続で押すと消えてしまう