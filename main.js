//random  번호 생성 script 작성
//input -> 1. go 를 클릭할 때 값을 random 번호와 비교한다
//숫자가 나옵니다 status input -> 결과에 따라 내용 바꾸기
//남은 기회 remainder -> 남은 횟수 표기, go를 클릭할 때마다 -- remainder

// 1>input-number || input-number<100 -> 1과 100 사이의 숫자만 입력 할 수 있습니다
// status 에러 메세지 띄우고, 기회는 줄이지 않음
// 이미 입력한 숫자의 유효성 검사하여, 같은 숫자는 "동일한 숫자 사용 불가" 에러 띄우고 기회 줄이지 않음
// history.push(inputNumber) 함수 사용 / history.includes(inputNumber)
// 숫자 입력 후 go를 누르고 마우스 커서를 number-input 창으로 가져오면 숫자가 초기화 focus.inputNumber()
// 기회를 5번 사용하면 go 버튼을 disable / remainder >1 disable.playButton

// 필요한 html elements 다 가져오기
let computerNumber = 0;
let playButton = document.getElementById("play-button");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");

playButton.addEventListener("click", play);
userInput.addEventListener("focus", focusInput);

function pickRandomNumber() {
  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNumber);
}

function play() {
  // 숫자 추측하기
  const userValue = userInput.value;
  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1부터 100 사이의 숫자를 입력 해주세요";

    return;
  }

  if (userValue < computerNumber) {
    resultText.textContent = "Up!";
  } else if (userValue > computerNumber) {
    resultText.textContent = "Down!";
  } else {
    resultText.textContent = "정답!";
  }
}

function focusInput() {
  userInput.value = "";
}

pickRandomNumber();
