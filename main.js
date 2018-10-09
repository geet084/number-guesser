var updateClick = document.querySelector('.update-button');
var submitClick = document.querySelector('.submit-button');
var clearClick = document.querySelector('.clear-button');
var resetClick = document.querySelector('.reset-button');
var guessedNum = 0;
var start;
var stop;

updateClick.addEventListener("click", function( ) {
  start = document.querySelector('#min-range').value;
  stop = document.querySelector('#max-range').value;
  document.querySelector('.range-begin').innerText = start;
  document.querySelector('.range-end').innerText = stop;
});

submitClick.addEventListener("click", function( ) {
  guessedNum = document.querySelector('#guess').value;
  verifyValues(guessedNum);
  document.querySelector('.last-guess').innerText = guessedNum;
});

clearClick.addEventListener("click", function ( ) {
  clearInput();
});

resetClick.addEventListener("click", function ( ) {
  clearInput();
  document.querySelector('.range-begin').innerText = 1;
  document.querySelector('.range-end').innerText = 100;
  document.querySelector('.last-guess').innerText = 25;
});

function clearInput() {
  document.querySelector('#min-range').value = "";
  document.querySelector('#max-range').value = "";
  document.querySelector('#guess').value = "";
};

function verifyValues(givenNum) {
  if(givenNum === 0) {
    alert("hi");
  } else {
    alert("no");
  }
}