/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


var scores, roundScore, activePlayer,gamePlaying;

init();

//1) rolls 6 twice
var lastDice;

// by calling anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(gamePlaying){
        // 3) Challenge Exercise - START
    
        //1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        //var diceDOM = document.querySelector('.dice');
        
        
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        //diceDOM.style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        // 3) Challenge Exercise - END
        
        /*//1) rolls 6 twice
        if(dice === 6 && lastDice ===6){
            //player looses game
            scores[activePlayer] = 0;
            //update the DOM
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
            
        } else*/
        
        //3. Update the round score IF the rolled number was NOT a 1
         if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScore += dice1 + dice2;
            //setting the value;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        
        lastDice = dice;
    } 
   
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 2) Challenge exercise - START
        var input = document.querySelector('.final-score').value;
        // console.log(input);
        var winningScore;
        
        
        //check if input field is not empty
        // undefined, null, 0, or "" are COERCED to false else TRUE
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // 2) Challenge exercise - END
        
        // Check is player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            
            // 3) Challenge Exercise - START
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none'; 
            // 3) Challenge Exercise - END
            
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    // 3) Challenge Exercise - START
    document.getElementById('dice-1').style.display = 'none';       document.getElementById('dice-2').style.display = 'none'; 
    // 3) Challenge Exercise - END
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0]; // since we hold only one score at a time
    roundScore = 0; // this only needs one value, since we can only have one roundscore at a time
    activePlayer = 0; // which is the current active player, 0 will be the first player and 1 will be second player. We are doing it this way, so that we can LATER read the values from array. Since Array is zero based, we need 0 for the first element in array and 1 for the second element in array
    
    gamePlaying = true;

    //document.querySelector('.dice').style.display = 'none';
    
    // 3) Challenge Exercise - START
    document.getElementById('dice-1').style.display = 'none';       document.getElementById('dice-2').style.display = 'none'; 
    // 3) Challenge Exercise - END

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1!';
    document.getElementById('name-1').textContent = 'Player 2!';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}