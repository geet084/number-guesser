var rangeBegin = 1;
var rangeEnd = 100;
var rangeDifference = rangeEnd - rangeBegin;
var winningNumber = generateRandom();

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
  document.querySelector('.winning-number').innerText = randomNumber;
  return randomNumber;
}

var updateClick = document.querySelector('.update-button');
var submitClick = document.querySelector('.submit-button');
var clearClick = document.querySelector('.clear-button');
var resetClick = document.querySelector('.reset-button');
var guessedNum = 0;

updateClick.addEventListener("click", function( ) {
  document.querySelector('.range-begin').innerText = document.querySelector('#min-range').value;
  document.querySelector('.range-end').innerText = document.querySelector('#max-range').value;
  rangeBegin = parseInt(document.querySelector('#min-range').value);
  rangeEnd = parseInt(document.querySelector('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
  winningNumber = generateRandom();
});

submitClick.addEventListener("click", function( ) {
  guessedNum = document.querySelector('#guess').value;
  document.querySelector('.last-guess').innerText = guessedNum;
  checkGuess(guessedNum);
  document.querySelector('.right-side h1').innerText = "You Guessed:"
});

clearClick.addEventListener("click", function ( ) {
  clearInput();
});

resetClick.addEventListener("click", function ( ) {
  clearInput();
  rangeBegin = 1;
  rangeEnd = 100;
  rangeDifference = rangeEnd - rangeBegin;
  document.querySelector('.range-begin').innerText = 1;
  document.querySelector('.range-end').innerText = 100;
  document.querySelector('.last-guess').innerText = "";
  winningNumber = generateRandom();
  document.querySelector('h2').innerText = "";
  document.querySelector('.right-side h1').innerText = "Make a guess";

});

function clearInput() {
  document.querySelector('#min-range').value = "";
  document.querySelector('#max-range').value = "";
  document.querySelector('#guess').value = "";
};

function checkGuess(userGuess) {
  if (userGuess == winningNumber) {
    document.querySelector('h2').innerText = "BOOM!";
  } else if (userGuess > winningNumber) {
    document.querySelector('h2').innerText = "Sorry, that is too high";
  } else if (userGuess < winningNumber) {
    document.querySelector('h2').innerText = "Sorry, that is too low";
  }
}