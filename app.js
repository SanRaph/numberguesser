/*
NUMBER GUESSER
@AUTHOR: San Raph
@VERSION: 1.0.0
@DATE: Thursday, August 29, 2019

GAME FUNCTION OR LOGIC:
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if loose
- Let player choose to play again
*/

//Game values define with let
let min = 1,
    max = 10,
    //make winning num a random number
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
    
//UI Element
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

 //Assign UI min and max
 //this values reflect without hard coding
 minNum.textContent = min;
 maxNum.textContent = max;

 //play again event listener
 //the whole thing is wrapped in a div of game
 //listening for click dint let us see
 //it clicks on playagain automatically
 //play again so listen for mouse down, lets us mousedown on element a 2nd time
 game.addEventListener('mousedown', function(e) {
     //let the target be btn play again
     //we use e object to target elements
     if(e.target.className === 'play-again'){
        //reload the page
        window.location.reload(); 
     }
    // console.log(1);
 })

 //Listen for guess submit
 guessBtn.addEventListener('click', function() {
     //notice we get a string
     //we want a num so parseInt
     //check for NaN since parseInt
    let guess = parseInt(guessInput.value);
    //console.log(guess);
    //validate input, check if not blank
    //less than min or higher than max
    //use isNaN func
    if(isNaN(guess) === NaN || guess < min || guess > max){
        setMessage(`Enter number between ${min} and ${max}`, 'red')
    }

    //check if won
    if(guess === winningNum){
        //disable the input
        // guessInput.disabled = true;
        // //show they won with border green
        // guessInput.style.borderColor = 'green';
        // //let the user know they won via setMessage
        // //game over won
        // setMessage(`${winningNum} is correct! YOU WIN`, 'green');
        gameOver(true, `${winningNum} is correct! YOU WIN`);

    } else {
        //if loosed, subtract from guessLeft
        //wrong number
        guessesLeft -= 1;

        // //check to see if guess left
        if(guessesLeft === 0){
        //     //Game over - lost
        //          //disable the input
        // guessInput.disabled = true;
        // //show they lost with border red
        // guessInput.style.borderColor = 'red';
        // //let the user know they lost via setMessage
        // //game over won
        // setMessage(`Game Over, you lost, The correct number is ${winningNum}`, 'red');

        gameOver(false, `Game Over, you lost, The correct number is ${winningNum}`);

        } else {
            //Game coninues - answer wrong

            //change border color to red
            guessInput.style.borderColor = 'red';

            //clear input
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guess(es) left`, 'red');
        }
    }

 });

 //Game over function
 function gameOver(won, msg) {
    //border color depend on if they won or not
    //we can do a conditioner
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
        //show they won with border green
        guessInput.style.borderColor = color;
        //set text color
        message.style.color = color; 
        //let the user know they won via setMessage
        //game over won
        setMessage(msg);
        //we want the option to play again
        //change the btn value
        guessBtn.value = 'Play Again';
        //we need a class so we can add by appending, to add
        //e handler to this new version of btn
        guessBtn.className += 'play-again';
        //since the class is added after page loads
        //we need to use delegation - putting e on parent
        //and search for target which is play again
        //put event at the UI section
 }

 //get winningNum function
 function getRandomNum(min, max) {
    //hoisting  means calling a method b4 defining
    //at the bottom in JS when the context runs the functions are put to the top - 
    //so we can call func b4 declare them not same with other languages
    //JS is strange lang relative to other lang

    //we want to generate btwn min & max
    //lets parse them into this func
    //max takes away min which is like 10 - 1 which is 9
    //plus 1 which is 0 - 9, so add min which might not be 1, our
    //min is dynamic so you wanna use whatever that value is
    //now floor it to get away the decimals
    return Math.floor(Math.random()*(max-min+1)+min);
 }

 //set message function
 function setMessage(msg, color) {
     //we can set the color

     //message.style.color = 'red';

     //but we also want this function 
     //to show regular msges that are not
     //errors which shdn't be red
     //so we need a 2nd parameter of color
     message.style.color = color;

    message.textContent = msg;

 }