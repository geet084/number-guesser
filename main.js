var rangeBegin = 1;
var rangeEnd = 100;
var rangeDifference = rangeEnd - rangeBegin;
var winningNumber = generateRandom();
var clearButton = document.querySelector('.clear-button');
var resetButton = document.querySelector('.reset-button');
var submitButton = document.querySelector('.submit-button');
clearButton.disabled = true;
resetButton.disabled = true;

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
  rangeBegin = parseInt(document.querySelector('#min-range').value);
  rangeEnd = parseInt(document.querySelector('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
  if (isNaN(rangeDifference)) {
    alert('Please enter integers only');
  } else if (rangeBegin > rangeEnd) {
    alert('Please ensure Min Range is less than Max Range')
  } else {
    document.querySelector('.range-begin').innerText = document.querySelector('#min-range').value;
    document.querySelector('.range-end').innerText = document.querySelector('#max-range').value;
    winningNumber = generateRandom();
  }
});

submitClick.addEventListener("click", function( ) {
  guessedNum = document.querySelector('#guess').value;
  if (isNaN(guessedNum)) {
    alert('Please enter integers only');
  } else if (!(rangeBegin <= guessedNum && guessedNum <= rangeEnd)) {
    alert('Please enter integers within the range');
  } else {
  document.querySelector('.last-guess').innerText = guessedNum;
  checkGuess(guessedNum);
  document.querySelector('.right-side h1').innerText = "You Guessed:"
  clearButton.disabled = false;
  resetButton.disabled = false;
  }
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
  resetButton.disabled = true;
});

function clearInput() {
  document.querySelector('#min-range').value = "";
  document.querySelector('#max-range').value = "";
  document.querySelector('#guess').value = "";
  clearButton.disabled = true;
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