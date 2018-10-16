var rangeBegin = 1;
var rangeEnd = 100;
var rangeDifference = rangeEnd - rangeBegin;
var winningNumber = generateRandom();
var clearButton = select('.clear-button');
var resetButton = select('.reset-button');
var submitButton = select('.submit-button');
var updateButton = select('.update-button');
var user1Guess = 0;
var user2Guess = 0;
var numGuessTries = 0;

/*  Event Listeners  */

updateButton.addEventListener("click", setRange);
submitButton.addEventListener("click", getGuessValues);
clearButton.addEventListener("click", clearGuesses);
resetButton.addEventListener("click", initializeForm);

window.onload = initializeForm();

// initializeForm();
/*initialize on page load*/



/* change all of doc.query to function called SELECT*/ 
/* add prevent default, should be for whole page? */ 


function addWinCard() {
  select('.user1').innerText = select('#challenger-1-name').value;
  select('.user2').innerText = select('#challenger-2-name').value;
  select('.user-winner').innerText = "someone";
  select('.win-guesses').innerText = numGuessTries;
  // select('.win-elapsed-time').innerText = getElapsedTime;
}


function checkIfZero(inputValue) {
  if (inputValue[0] === '0' && inputValue.length > 1) {
    return true;
  } else {
    return false;
  }
}

function checkForExtraZeros() {
  if (checkIfZero(select('#min-range').value) || checkIfZero(select('#max-range').value)) {
    throwError('.error-message-range', 'Remove unneccesary zeros');
    return true;
  } 
}

function checkIfOutOfRange() {
  if (rangeBegin > rangeEnd) {
    throwError('.error-message-range', `Max range must be greater than ${rangeBegin}`);
    return true;
  }
}

function checkIfDecimal() {
  if (!Number.isInteger(rangeBegin) || !Number.isInteger(rangeEnd)) {
    throwError('.error-message-range', 'Enter integers');
    return true;
  } 
}

function checkGuess(userGuess, player) {
  if (userGuess == winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "BOOM!";
    addWinCard();
  } else if (userGuess > winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "Sorry, that is too high";
  } else if (userGuess < winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "Sorry, that is too low";
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

function findRange() {
  rangeBegin = parseFloat(select('#min-range').value);
  rangeEnd = parseFloat(select('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
}

function clearGuesses() {
  resetInputField(['#guess1', '#guess2']);
  changeButton(clearButton);
}

function resetInputField(fields) {
  fields.forEach(function(element) {
    select(element).value = null;
  });
}

function setDefaultGameValues() {
  numGuessTries = 0;
  rangeBegin = 1;
  rangeEnd = 100;
  rangeDifference = rangeEnd - rangeBegin;
  winningNumber = generateRandom();
}

function resetDisplay() {
  select('.range-begin').innerText = 1;
  select('.range-end').innerText = 100;
  resetInputField(['#min-range', '#max-range']);
  select('.user-1-last-guess').innerText = "";
  select('.user-2-last-guess').innerText = "";
  hideError('.error-message-range');
  hideError('.error-message-guess');
}

function initializeForm() {
  resetInputField(['#challenger-1-name', '#challenger-2-name']);
  resetInputField(['#min-range', '#max-range']);
  clearGuesses();
  setDefaultGameValues();
  resetDisplay();
  resetTheButtons();
}

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
// select('.winning-number').innerText = randomNumber;
return randomNumber;
}

function getGuessValues () {
  user1Guess = select('#guess1').value;
  user2Guess = select('#guess2').value;
  validateInteger([user1Guess, user2Guess]);
  // guessCounter();
}

function getElapsedTime () {
  var start = new Date();
  var elapsed = new Date() - start;
  /* return ((elapsed / 1000) / 60).toFixed(1);  */ 
}

function guessCounter() {
  if (select('.error-message-guess').classList.contains('hidden')) {
    numGuessTries += 1;
    select('h4').innerText = "Number of Guesses: " + numGuessTries;
  }
}

function hideError(field) {
  if (!select(field).classList.contains('hidden')) {
    select(field).classList.add('hidden');
  }
}

function resetTheButtons() {
  clearButton.disabled = true;
  resetButton.disabled = true;
  clearButton.classList.remove('hover');
  resetButton.classList.remove('hover');
}

function select(field) {
  return document.querySelector(field);
}

function setRange() {  
  findRange();
  validateRange();
  if (resetButton.disabled == true) {
    changeButton(resetButton);
  }
  if (clearButton.disabled == true) {
    changeButton(clearButton);
  }
}

function throwError(field, message) {
  var pTagSelector = field + ' p';
  select(field).classList.remove('hidden');
  select(pTagSelector).innerText = message;
}

function validateInteger(userNum) {
  for(var i = 0; i < 2; i++) {

    if (!Number.isInteger(parseFloat(userNum[i]))) {
      throwError('.error-message-guess', 'Enter an integer');
    } else if (!(rangeBegin <= userNum[i] && userNum[i] <= rangeEnd)) {
      throwError('.error-message-guess', `Enter a number between ${rangeBegin} and ${rangeEnd}`);
    } else if (checkIfZero(userNum[i])) {
      throwError('.error-message-guess', 'Remove unneccesary zeros');
    } else {
      hideError('.error-message-guess');
      checkGuess(userNum[i], i);
      select(`.user-${i+1}-last-guess`).innerText = userNum[i];
  // select('.user-2-last-guess').innerText = user2Guess;
  // select('.right-side h1').innerText = "You Guessed:"
    }
    if (clearButton.disabled == true) {
      changeButton(clearButton);
    }
    if (resetButton.disabled == true) {
      changeButton(resetButton);
    }
  }
}

function validateRange () {
  if(checkIfDecimal() || checkIfOutOfRange() || checkForExtraZeros()) {
    changeButton(submitButton);
  } else {
    hideError('.error-message-range');
    select('.range-begin').innerText = select('#min-range').value;
    select('.range-end').innerText = select('#max-range').value;
    winningNumber = generateRandom();
    if (submitButton.disabled) {
      changeButton(submitButton);
    }
  }
}