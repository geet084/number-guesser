var rangeBegin = 1;
var rangeEnd = 100;
var rangeDifference = rangeEnd - rangeBegin;
var winningNumber = generateRandom();
var clearButton = document.querySelector('.clear-button');
var resetButton = document.querySelector('.reset-button');
var submitButton = document.querySelector('.submit-button');
var updateButton = document.querySelector('.update-button');
var guessedNum = 0;
var numGuessTries = 0;

/*  Event Listeners  */

updateButton.addEventListener("click", setRange);
submitButton.addEventListener("click", getGuessValue);
clearButton.addEventListener("click", clearInput);
resetButton.addEventListener("click", initializeForm);

/*  Functions  */

initializeForm();

function initializeForm() {
  clearInput();
  rangeBegin = 1;
  rangeEnd = 100;
  numGuessTries = 0;
  rangeDifference = rangeEnd - rangeBegin;
  winningNumber = generateRandom();
  clearButton.disabled = true;
  resetButton.disabled = true;
  clearButton.classList.remove('hover');
  resetButton.classList.remove('hover');
  document.querySelector('h4').innerText = "";
  document.querySelector('.range-begin').innerText = 1;
  document.querySelector('.range-end').innerText = 100;
  document.querySelector('.last-guess').innerText = "";
  document.querySelector('h2').innerText = "";
  document.querySelector('.right-side h1').innerText = "Make a guess";
}

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
  document.querySelector('.winning-number').innerText = randomNumber;
  return randomNumber;
}

function getGuessValue () {
  guessedNum = document.querySelector('#guess').value;
  validateInteger(guessedNum);
  guessCounter();
}

function guessCounter() {
  numGuessTries += 1;
  document.querySelector('h4').innerText = "Number of wrong guesses: " + numGuessTries;
}

function validateInteger(userNum) {
  if (isNaN(userNum)) {
    throwError('.error-message-min', 'Enter positive integers only');
  } else if (!(rangeBegin <= userNum && userNum <= rangeEnd)) {
    throwError('.error-message-min', `Enter a number between ${rangeBegin} and ${rangeEnd}`);
  } else {
    document.querySelector('.last-guess').innerText = userNum;
    checkGuess(userNum);
    document.querySelector('.right-side h1').innerText = "You Guessed:"
  }
  if (clearButton.disabled == true) {
    changeButton(clearButton);
  }
  if (resetButton.disabled == true) {
    changeButton(resetButton);
  }
}

function findRange() {
  rangeBegin = parseInt(document.querySelector('#min-range').value);
  rangeEnd = parseInt(document.querySelector('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
}

function validateRange() {
  if (isNaN(rangeDifference)) {
    throwError('.error-message-min', 'Enter a positive integer');
  } else if (rangeBegin > rangeEnd) {
    throwError('.error-message-min', `Min Range must be less than ${rangeEnd}`);
  } else {
    document.querySelector('.range-begin').innerText = document.querySelector('#min-range').value;
    document.querySelector('.range-end').innerText = document.querySelector('#max-range').value;
    winningNumber = generateRandom();
  }
}

function setRange() {  
  findRange();
  validateRange(rangeDifference);
  if (resetButton.disabled == true) {
    changeButton(resetButton);
  }
  if (clearButton.disabled == true) {
    changeButton(clearButton);
  }
}

function clearInput() {
  document.querySelector('#guess').value = null;
  document.querySelector('#min-range').value = null;
  document.querySelector('#max-range').value = null;
  changeButton(clearButton);
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

function changeButton(button) {
  if (button.disabled == true) {
    button.disabled = false;
    button.classList.add("hover");
  } else if (button.disabled == false) {
    button.disabled = true;
    button.classList.remove("hover");
  }
}

function throwError(field, message) {
  document.querySelector(field).classList.remove('hidden');
// document.querySelector('.error-icon').classList.remove('hidden');
document.querySelector(field).innerText = message;
}