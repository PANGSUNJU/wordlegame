const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;
const regex = /[A-Z]/;
let 맞은_개수 = 0;
// $(document).ready(function () {
//   $(".key-board").on("click", function () {
//     alert(this.textContent);
//   });
// });

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    if (맞은_개수 === 5) {
      div.innerText = "성공하였습니다.";
      div.style =
        "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:yellow; width: 200px; height:150px";
      div.className = "succese";
      document.body.appendChild(div);
    } else {
      div.innerText = "게임이 종료됐습니다.";
      div.style =
        "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:yellow; width: 200px; height:150px";
      div.className = "fail";
      document.body.appendChild(div);
    }
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }

    if (index !== 0) index -= 1;
  };
  const hendleEnterKey = () => {
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      // console.log("block", block.innerText);
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      const keyBlock = document.querySelector(
        `.key-board[data-key='${입력한_글자}']`
      );
      if (입력한_글자 === 정답_글자) {
        맞은_개수 += 1;
        block.style.background = "#6AAA64";
        keyBlock.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "#C9B458";
        keyBlock.style.background = "#C9B458";
      } else {
        block.style.background = "#86888A";
        block.style.color = "white";
        keyBlock.style.background = "#86888A";
        keyBlock.style.color = "white";
      }
    }
    if (맞은_개수 === 5) gameover();
    else if (attempts === 5) {
      gameover();
    } else nextLine();
  };
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (event.key === "Enter") hendleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index = index + 1;
    }
  };

  const handleClick = (event) => {
    const clickKey = event.target.getAttribute("data-key");
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.target.className == "key-board") {
      if (regex.test(clickKey)) {
        thisBlock.innerText = clickKey;
        index = index + 1;
      }
    } else if (clickKey == "ENTER") {
      hendleEnterKey();
    } else if (clickKey == "BACK") {
      handleBackspace();
    } else {
      return;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const time = new Date();
      const 흐른_시간 = new Date(time - startTime);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timer = document.querySelector("#timer");
      timer.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("click", handleClick);
}

appStart();
