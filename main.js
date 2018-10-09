var updateClick = document.querySelector('#updateButton');
var submitClick = document.querySelector('#updateSubmit');
var clearClick = document.querySelector('#clearButton');
var resetClick = document.querySelector('#resetButton');
var guessedNum = 0;
var start;
var stop;

updateClick.addEventListener("click", function( ) {
  start = document.querySelector('#min-range').value;
  stop = document.querySelector('#max-range').value;
  document.querySelector('#rangeBegin').innerText = start;
  document.querySelector('#rangeEnd').innerText = stop;
});

submitClick.addEventListener("click", function( ) {
  guessedNum = document.querySelector('#guess').value;
  verifyValues(guessedNum);
  document.querySelector('#result').innerText = guessedNum;
});

clearClick.addEventListener("click", function ( ) {
  clearInput();
});

resetClick.addEventListener("click", function ( ) {
  clearInput();
  document.querySelector('#rangeBegin').innerText = 1;
  document.querySelector('#rangeEnd').innerText = 100;
  document.querySelector('#result').innerText = 25;
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