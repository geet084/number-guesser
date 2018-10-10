var rangeBegin = 1;
var rangeEnd = 100;
var rangeDifference = rangeEnd - rangeBegin;
var winningNumber = generateRandom();
var clearButton = document.querySelector('.clear-button');
var resetButton = document.querySelector('.reset-button');
var submitButton = document.querySelector('.submit-button');

var updateClick = document.querySelector('.update-button');
var submitClick = document.querySelector('.submit-button');
var clearClick = document.querySelector('.clear-button');
var resetClick = document.querySelector('.reset-button');
var guessedNum = 0;
var numGuessTries = 0;

initializeForm();

updateClick.addEventListener("click", function( ) {
  rangeBegin = parseInt(document.querySelector('#min-range').value);
  rangeEnd = parseInt(document.querySelector('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
  rangeValidation(rangeDifference);
  resetButton.disabled = false;
  resetButton.classList.add('hover');
});

submitClick.addEventListener("click", function( ) {
  guessedNum = document.querySelector('#guess').value;
  validateInteger(guessedNum);
  guessCounter();
});

clearClick.addEventListener("click", function ( ) {
  clearInput();
});

resetClick.addEventListener("click", function ( ) {
  clearInput();
  initializeForm();
  winningNumber = generateRandom();
});

function initializeForm() {
  clearInput();
  rangeBegin = 1;
  rangeEnd = 100;
  numGuessTries = 0;
  document.querySelector('h4').innerText = "";
  rangeDifference = rangeEnd - rangeBegin;
  clearButton.disabled = true;
  resetButton.disabled = true;
  clearButton.classList.remove('hover');
  resetButton.classList.remove('hover');

  document.querySelector('.range-begin').innerText = 1;
  document.querySelector('.range-end').innerText = 100;
  document.querySelector('.last-guess').innerText = "";
  document.querySelector('h2').innerText = "";
  document.querySelector('.right-side h1').innerText = "Make a guess";
  document.querySelector('#min-range').value = null;
  document.querySelector('#max-range').value = null;
}

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
  document.querySelector('.winning-number').innerText = randomNumber;
  return randomNumber;
}
function guessCounter() {
  numGuessTries += 1;
  document.querySelector('h4').innerText = "Number of wrong guesses: " + numGuessTries;
}

function validateInteger(userNum) {
  if (isNaN(userNum)) {
    alert('Please enter integers only');
  } else if (!(rangeBegin <= userNum && userNum <= rangeEnd)) {
    alert('Please enter integers within the range');
  } else {
    document.querySelector('.last-guess').innerText = userNum;
    checkGuess(userNum);
    document.querySelector('.right-side h1').innerText = "You Guessed:"
    clearButton.disabled = false;
    resetButton.disabled = false;
    clearButton.classList.add('hover');
    resetButton.classList.add('hover');


  }
}

function rangeValidation() {
  if (isNaN(rangeDifference)) {
    alert('Please enter integers only');
  } else if (rangeBegin > rangeEnd) {
    alert('Please ensure Min Range is less than Max Range')
  } else {
    document.querySelector('.range-begin').innerText = document.querySelector('#min-range').value;
    document.querySelector('.range-end').innerText = document.querySelector('#max-range').value;
    winningNumber = generateRandom();
  }
}

function clearInput() {
  document.querySelector('#guess').value = null;
  clearButton.disabled = true;
  clearButton.classList.remove('hover');

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

function changeButton (button) {
  if (button.disabled == true && !button.classList.contains('hover')) {
    button.disabled == false;
    button.classList.add('hover');
  } else if (button.disabled == false && button.classList.contains('hover')) {
    button.disabled == true;
    button.classList.remove  ('hover');
  }
}