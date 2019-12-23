/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice;

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function() {	
	if (gamePlaying) {
		//1. Random numer
		var dice = Math.floor(Math.random()*6)+1; //Generates a random number between 1 and 6
		var dice2 = Math.floor(Math.random()*6)+1; //Generates a random number between 1 and 6

		//2. Display the result
		document.querySelector('.dice').style.display = 'block';
		document.querySelector('.dice-2').style.display = 'block';
		document.querySelector('.dice').src = 'dice-' + dice + '.png';
		document.querySelector('.dice-2').src = 'dice-' + dice2 + '.png';

		console.log("Previous dice: " + previousDice + " Current dice : " + dice + " Dice2: " + dice2);

		//3. Update the round score IF the rolled number was not a 1
		if (dice === 6 && previousDice === 6) {
			//Player looses scores
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		} else if (dice !== 1 && dice2 !== 1) {
			//Add score
			roundScore += dice + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}

		previousDice = dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;
		var winningScore;

		//Undefined, 0, null or "" are COERCED are false
		//Anything else is COERCED to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		//Check if player won the game
		if(scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.final-score').addEventListener('keyup', function(event) {
	if(event.keyCode === 13) { //13 is enter key
		winningScore = scoreInput.value;
	}
});

function nextPlayer() {
	//Next player
	activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	//Reset the DOM elements to 0
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	//Set the active class to the current player
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	//Hides the dice when 1 comes up
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';
}

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	previousDice = 0;
	gamePlaying = true;

	//Resets all back to initial state
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}