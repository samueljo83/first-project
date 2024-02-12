let computerNumber = 0;
let userInput = document.querySelector("#user-input");
let playButton = document.querySelector("#play-button");
let resultDisplay = document.querySelector(".result-display");
let resetButton = document.querySelector("#reset-button");
let chanceCount = document.querySelector(".chance-count");
let gameOver = false;
let chanceRemainder = 5;
let userValueList = []; // 유저가 입력한 숫자들 리스트

playButton = addEventListener("click", play);
resetButton.addEventListener("click", reset);
chanceCount.innerHTML = `남은 기회:${chanceRemainder}`;
userInput.addEventListener("focus", focusInput);

// random 번호 생성 함수
function randomNumber() {
  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNumber);
}

//play 함수
function play() {
  let userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultDisplay.textContent = "1부터 100 사이의 숫자를 입력 해주세요";

    return;
  }

  if (userValueList.includes(userValue)) {
    resultDisplay.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";

    return;
  }

  chanceRemainder--;
  chanceCount.innerHTML = `남은 기회:${chanceRemainder}`;
  userValueList.push(userValue);
  if (userValue < computerNumber) {
    resultDisplay.textContent = "좀 더 쓰세요";
  } else if (userValue > computerNumber) {
    resultDisplay.textContent = "좀 줄이세요";
  } else {
    resultDisplay.textContent = "어떻게 알았지?";
  }
  if (chanceRemainder == 0) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function focusInput() {
  userInput.value = "";
}

function reset() {
  //리셋
  randomNumber();
  userInput.value = "";
  gameOver = false;
  playButton.disabled = false;
  chanceCount.innerHTML = `남은 기회:${chances}`;
  resultDisplay.innerHTML = "초기화 완료";
  userValueList = [];
  chances = 5;
}

randomNumber();
