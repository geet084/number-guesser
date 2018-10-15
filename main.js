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

initializeForm();

function initializeForm() {
  updateWinCard();
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
  // document.querySelector('h4').innerText = "";
  document.querySelector('.range-begin').innerText = 1;
  document.querySelector('.range-end').innerText = 100;
  document.querySelector('.last-guess').innerText = "";
  // document.querySelector('h2').innerText = "";
  // document.querySelector('.right-side h1').innerText = "Make a Guess";
  hideError('.error-message-range');
  hideError('.error-message-guess');
}

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
  // document.querySelector('.winning-number').innerText = randomNumber;
  return randomNumber;
}

function getGuessValue () {
  guessedNum = document.querySelector('#guess').value;

  validateInteger(guessedNum);
  // guessCounter();
}

function guessCounter() {
  if (document.querySelector('.error-message-guess').classList.contains('hidden')) {
    numGuessTries += 1;
    document.querySelector('h4').innerText = "Number of Guesses: " + numGuessTries;
  }
}

function validateInteger(userNum) {
  if (!Number.isInteger(parseFloat(userNum))) {
    throwError('.error-message-guess', 'Enter an integer');
  } else if (!(rangeBegin <= userNum && userNum <= rangeEnd)) {
    throwError('.error-message-guess', `Enter a number between ${rangeBegin} and ${rangeEnd}`);
  } else if (checkIfZero(document.querySelector('#guess').value)) {
    throwError('.error-message-guess', 'Remove unneccesary zeros');
  } else {
    hideError('.error-message-guess');
    checkGuess(userNum);
    document.querySelector('.last-guess').innerText = userNum;
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
  rangeBegin = parseFloat(document.querySelector('#min-range').value);
  rangeEnd = parseFloat(document.querySelector('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
}

function validateRange() {
  if (!Number.isInteger(rangeBegin) || !Number.isInteger(rangeEnd)) {
    throwError('.error-message-range', 'Enter integers');
    changeButton(submitButton);
  } else if (rangeBegin > rangeEnd) {
    throwError('.error-message-range', `Max range must be greater than ${rangeBegin}`);
    changeButton(submitButton);
  } else if (checkIfZero(document.querySelector('#min-range').value) || checkIfZero(document.querySelector('#max-range').value)) {
    throwError('.error-message-range', 'Remove unneccesary zeros');
    changeButton(submitButton);
  } else {
    hideError('.error-message-range');
    if (submitButton.disabled == true) {
      changeButton(submitButton);
    }
    document.querySelector('.range-begin').innerText = document.querySelector('#min-range').value;
    document.querySelector('.range-end').innerText = document.querySelector('#max-range').value;
    winningNumber = generateRandom();
  }
}

function checkIfZero(inputValue) {
  if (inputValue[0] === '0' && inputValue.length > 1) {
    return true;
  } else {
    return false;
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
  var pTagSelector = field + ' p';
  document.querySelector(field).classList.remove('hidden');
  document.querySelector(pTagSelector).innerText = message;
}

function hideError(field) {
  if (!document.querySelector(field).classList.contains('hidden')) {
      document.querySelector(field).classList.add('hidden');
  }
}

/* change all of doc.query to function called SELECT*/ 
/* add prevent default, should be for whole page? */ 


function addWinCard () {
  document.querySelector('.user-1-name').innerText = "sponge bob";
  document.querySelector('.user-2-name').innerText = "leroy";
  document.querySelector('.user-winner').innerText = "someone";
  document.querySelector('.win-guesses').innerText = numGuessTries;
  document.querySelector('.win-elapsed-time').innerText = getElapsedTime;
}

function getElapsedTime () {
  var start = new Date();
  var elapsed = new Date() - start;
  /* return ((elapsed / 1000) / 60).toFixed(1);  */ 

}
