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
submitButton.addEventListener("click", setGuesses);
clearButton.addEventListener("click", clearGuesses);
resetButton.addEventListener("click", initializeForm);

window.onload = initializeForm();


function select(field) {
  return document.querySelector(field);
}

function addWinCard() {
  select('.user1').innerText = select('#challenger-1-name').value;
  select('.user2').innerText = select('#challenger-2-name').value;
  select('.user-winner').innerText = "someone";
  select('.win-guesses').innerText = numGuessTries;
  // select('.win-elapsed-time').innerText = getElapsedTime;
}

function checkRange0s() {
  if (extra0(select('#min-range').value) || extra0(select('#max-range').value)) {
    throwError('.error-message-range', 'Remove unneccesary zeros');
    return true;
  } 
}

function checkSmallMax() {
  if (rangeBegin > rangeEnd) {
    throwError('.error-message-range', `Max range must be greater than ${rangeBegin}`);
    return true;
  }
}

function checkRangeFloat() {
  if (!Number.isInteger(rangeBegin) || !Number.isInteger(rangeEnd)) {
    throwError('.error-message-range', 'Enter integers');
    return true;
  } 
}

function checkGuess(userGuess, player) {
  if (userGuess == winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "BOOM!";
  } else if (userGuess > winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "that is too high";
  } else if (userGuess < winningNumber) {
    select(`.guess-feedback-${player + 1}`).innerText = "that is too low";
  }
}

function winGameIncreaseRange() {
  rangeBegin -= 10;
  rangeEnd += 10;
  clearGuesses();
  rangeDifference += 20;
  winningNumber = generateRandom();
  select('.range-begin').innerText = rangeBegin;
  select('.range-end').innerText = rangeEnd;
}

function checkGuessFloat(guess, i) {
  if (!Number.isInteger(guess)) {
      throwError(`.error-message-guess-${i + 1}`, 'Enter an integer');
      return true;
  }
}

function checkOutOfRange(guess, i) {
  if (guess < rangeBegin || guess > rangeEnd) {
    throwError(`.error-message-guess-${i + 1}`, `Enter a number between ${rangeBegin} and ${rangeEnd}`);
    return true;
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

function clearGuesses() {
  resetInputField(['#guess1', '#guess2']);
  changeButton(clearButton);
}

function disableButton(button) {
  button.disabled = true;
  button.classList.remove("hover");
}

function enableButton(button) {
  button.disabled = false;
  button.classList.add("hover");
}

function getRange() {
  rangeBegin = parseFloat(select('#min-range').value);
  rangeEnd = parseFloat(select('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
}

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
  return randomNumber;
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

function initializeForm() {
  resetInputField(['#challenger-1-name', '#challenger-2-name']);
  resetInputField(['#min-range', '#max-range']);
  clearGuesses();
  setDefaultGameValues();
  resetDisplay();
  resetTheButtons();
}

function resetDisplay() {
  select('.range-begin').innerText = 1;
  select('.range-end').innerText = 100;
  resetInputField(['#min-range', '#max-range']);
  select('.user-1-last-guess').innerText = "";
  select('.user-2-last-guess').innerText = "";
  hideError('.error-message-range');
  hideError('.error-message-guess-1');
  hideError('.error-message-guess-2');
}

function resetTheButtons() {
  disableButton(resetButton);
  disableButton(clearButton);
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

function setGuesses (event) {
  event.preventDefault();
  user1Guess = parseFloat(select('#guess1').value);
  user2Guess = parseFloat(select('#guess2').value);
  var user1Name = select('#challenger-1-name').value;
  var user2Name = select('#challenger-2-name').value;
  validateGuess([user1Guess, user2Guess], [user1Name, user2Name]);
// guessCounter();
}

function setRange(event) {
  event.preventDefault(); 
  getRange();
  validateRange();
  enableButton(resetButton);
  enableButton(clearButton);
}

function throwError(field, message) {
  var pTagSelector = field + ' p';
  select(field).classList.remove('hidden');
  select(pTagSelector).innerText = message;
}

function validateGuess(guesses, names) {
  var errorCount = 0;
  for(var i = 0; i < 2; i++) {
    if (checkGuessFloat(guesses[i], i) || checkOutOfRange(guesses[i], i)) {
      errorCount += 1;
    }
  }
  if (errorCount === 0) {
    for(var i = 0; i < 2; i++) {
      hideError(`.error-message-guess-${i + 1}`);
      select(`.name-${i + 1}`).innerText = names[i];
      select(`.user-${i + 1}-last-guess`).innerText = guesses[i];
      checkGuess(guesses[i], i);
      enableButton(clearButton);
      enableButton(resetButton);
    }
  }
  if(select('.guess-feedback-1').innerText == "BOOM!" || select('.guess-feedback-2').innerText == "BOOM!") {
    addWinCard();
    winGameIncreaseRange();
    alert('BOOM, the difficulty has increased!');
  }
}

function validateRange () {
  if(checkRangeFloat() || checkSmallMax()) {
    disableButton(submitButton);
  } else {
    hideError('.error-message-range');
    enableButton(submitButton);
    select('.range-begin').innerText = rangeBegin;
    select('.range-end').innerText = rangeEnd;
    winningNumber = generateRandom();
  }
}