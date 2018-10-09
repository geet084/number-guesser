# Number Guesser
## Build a game where a user can guess a number between 1 and 100, with the ability for the user to add custom ranges for increased difficulty of play
## Built With
* HTML
* CSS

## Contributors
* Jeo D
* Travis Gee

## Requirements
* Two inputs to set a custom range for the random number to fall within
* A button to update the custom range
* An input field for guessing the number
* A button for submitting a guess
* A button for clearing the input field, which does not reset the random number
* A button that resets the game and generates a new random number
* Display the user’s most recent guess
* Display results and feedback:
    * If their guess is too high, it should display the error message: “Sorry, that is too high”
    * If their guess is too low, it should display the error message: “Sorry, that is too low”
    * If the guess is correct, it should display the success message: “BOOM!”
* All input fields should only accept numerical entries
* The Guess field should only accept values that fall within the defined min and max range.
* The application should display an error message if the value entered in the Max Range input is less than the value in the Min Range input
* The application should display an error message if the value entered in the Min Range input is greater than the value in the Max Range input
* The application should display an error message if the guess is not a number (e.g. parseInt() returns NaN).
* The application should display an error if the guess is outside of the range of possible answers.
* The application should display an error if the Update or Submit Guess buttons are clicked then their associated input fields do not have a value entered
* The clear button should be disabled if there is nothing to clear.
* The reset button should be disabled if there is nothing to reset.
* Upon successful win, user’s range is updated:
    * Every time the user wins a round increase the maximum number by 10.
    * Every time the user wins a round decrease the minimum number by 10.
* Incorporate a scoring system based on how quickly user guesses correct number (NOTE: this may take some UI tweaks to incorporate – make sure you’re honoring the comp and visual patterns that already exist!)
