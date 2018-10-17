var rangeBegin = 1;
var rangeEnd = 100;
var rangeDifference = rangeEnd - rangeBegin;
var winningNumber = generateRandom();
var user1Guess = 0;
var user2Guess = 0;
var guessCount = 0;
var newGame = true;
var gameStartTime = 0;
var cardNum = 0;

/*  Event Listeners  */

select('.update-button').addEventListener("click", setRange);
select('.submit-button').addEventListener("click", setGuesses);
select('.clear-button').addEventListener("click", clearGuesses);
select('.reset-button').addEventListener("click", initializeForm);
select('.right-side').addEventListener("click", removeCard);

window.onload = initializeForm();


function select(field) {
  return document.querySelector(field);
}

function addWinCard() {
  cardNum++;
  for (var i = 1; i < 3; i++) {
    if (select(`.guess-feedback-${i}`).innerText === "BOOM!" ) {
      var winnerName = select(`.name-${i}`).innerText.toUpperCase();
    }
  }
  var elem = document.createElement('div');
  elem.innerHTML = 
  `<article class="white-box card card${cardNum}">
    <div class="user-name-area">
      <div>
        <p class="user1 bold-text">${select('.name-1').innerText}</p>
      </div>
      <div class="versus">
        <p>  VS  </p>
      </div>
      <div>
        <p class="user2 bold-text">${select('.name-2').innerText}</p>
      </div>
    </div>
    <div class="user-winner">
      <p class="bold-text">${winnerName}</p>
      <p>WINNER</p>
    </div>
    <div class="result-bottom">
      <div class="win-guesses">
        <p><span class="bold-text">${guessCount}</span> GUESSES</p>
      </div>
      <div class="win-elapsed-time">
        <p><span class="bold-text">${getElapsedTime()}</span> MINUTES</p>
      </div>
      <div class="delete-icon">
        <p><img src="images/delete.svg" target="delete button" class="card${cardNum}"></p>  
      </div>
    </div>
  </article>`
  select('.right-side').prepend(elem)
  guessCount = 0;
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

function checkRangeFloat() {
  if (!Number.isInteger(rangeBegin) || !Number.isInteger(rangeEnd)) {
    throwError('.error-message-range', 'Enter integers');
    return true;
  } 
}

function checkSmallMax() {
  if (rangeBegin > rangeEnd) {
    throwError('.error-message-range', `Max range must be greater than ${rangeBegin}`);
    return true;
  }
}

function checkValidGuessEntered(errors, guesses) {
    for(var i = 0; i < 2; i++) {
    if (checkGuessFloat(guesses[i], i) || checkOutOfRange(guesses[i], i)) {
      errors += 1;
    }
  }
    return errors;
}

function checkWinConditions() {
    if (select('.guess-feedback-1').innerText === "BOOM!" || select('.guess-feedback-2').innerText === "BOOM!") {
    addWinCard();
    winGameIncreaseRange();
    select('.increase-notification').classList.remove('hidden');
  }
}

function clearGuesses() {
  resetInputField(['#guess1', '#guess2']);
  disableButton(clearButton);
}

function disableButton(button) {
  button.disabled = true;
  button.classList.remove("hover");
}

function enableButton(button) {
  button.disabled = false;
  button.classList.add("hover");
}

function generateRandom() {
  var randomNumber = Math.floor(Math.random() * (rangeDifference + 1)) + rangeBegin;
  return randomNumber;
}

function getElapsedTime () {
  newGame = true;
  var gameStopTime = new Date().getTime() / 1000;
  var rawSeconds = parseInt(gameStopTime - gameStartTime);
  return (rawSeconds / 60).toFixed(2);
}

function getRange() {
  rangeBegin = parseFloat(select('#min-range').value);
  rangeEnd = parseFloat(select('#max-range').value);
  rangeDifference = rangeEnd - rangeBegin;
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

function removeCard(selectedCard) {
  if(event.target.tagName === 'IMG') { 
    var deletedCard = select(`.${event.target.classList.value}`);
    deletedCard.remove();
  }
}

function resetDisplay() {
  select('.range-begin').innerText = 1;
  select('.range-end').innerText = 100;
  resetInputField(['#min-range', '#max-range']);
  select('.user-1-last-guess').innerText = "??";
  select('.user-2-last-guess').innerText = "??";
  hideError('.error-message-range');
  hideError('.error-message-guess-1');
  hideError('.error-message-guess-2');
  select('.guess-feedback-1').innerText = '';
  select('.guess-feedback-2').innerText = '';
  select('.increase-notification').classList.add('hidden');
}

function resetInputField(fields) {
  fields.forEach(function(element) {
    select(element).value = null;
  });
}

function resetTheButtons() {
  disableButton(resetButton);
  disableButton(clearButton);
}

function setDefaultGameValues() {
  newGame = true;
  guessCount = 0;
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
}

function setRange(event) {
  event.preventDefault(); 
  getRange();
  validateRange();
  enableButton(resetButton);
  enableButton(clearButton);
  select('.increase-notification').classList.add('hidden');
}

function setStartTime() {
  if (newGame) {
    gameStartTime = new Date().getTime() / 1000;
    select('.increase-notification').classList.add('hidden');
    newGame = false;
  }
}

function throwError(field, message) {
  var pTagSelector = field + ' p';
  select(field).classList.remove('hidden');
  select(pTagSelector).innerText = message;
}

function updateValidGuess(errors, guesses, names) {
  if (errors === 0) {
    for(var i = 0; i < 2; i++) {
        hideError(`.error-message-guess-${i + 1}`);
        select(`.name-${i + 1}`).innerText = names[i];
        select(`.user-${i + 1}-last-guess`).innerText = guesses[i];
        checkGuess(guesses[i], i);
        enableButton(clearButton);
        enableButton(resetButton);
        setStartTime();
    }
    guessCount += 1;
    checkWinConditions();
  }
}

function validateGuess(userGuesses, userNames) {
  var errorCount = 0;
  errorCount = checkValidGuessEntered(errorCount, userGuesses);
  updateValidGuess(errorCount, userGuesses, userNames);
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

function winGameIncreaseRange() {
  rangeBegin -= 10;
  rangeEnd += 10;
  clearGuesses();
  rangeDifference += 20;
  winningNumber = generateRandom();
  select('.range-begin').innerText = rangeBegin;
  select('.range-end').innerText = rangeEnd;
}