let computerNumber = 0;
let userInput = document.querySelector("#user-input");
let playButton = document.querySelector("#play-button");
let resultDisplay = document.querySelector(".result-display");
let resetButton = document.querySelector("#reset-button");

// playButton 함수 생성
playButton = addEventListener("click", play);
resetButton.addEventListener("click", reset);

// random 번호 생성 함수
function randomNumber() {
  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNumber);
}

//play 함수
function play() {
  let userValue = userInput.value;
  if (userValue < computerNumber) {
    resultDisplay.textContent = "좀 더 쓰세요";
  } else if (userValue > computerNumber) {
    resultDisplay.textContent = "좀 줄이세요";
  } else {
    resultDisplay.textContent = "어떻게 알았지?";
  }
}

function reset() {
  //리셋
  randomNumber();
  userInput.value = "";
  resultDisplay.textContent = "게임 초기화";
}
