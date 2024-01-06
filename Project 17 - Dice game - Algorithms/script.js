// declare/assign variables for DOM elements
const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelectorAll('#score-options input');
const scoreSpans = document.querySelectorAll('#score-options span');
const currentRoundText = document.getElementById('current-round');
const currentRoundRollsText = document.getElementById('current-round-rolls');
const totalScoreText = document.getElementById('total-score');
const scoreHistory = document.getElementById('score-history');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const keepScoreBtn = document.getElementById('keep-score-btn');
const rulesContainer = document.querySelector('.rules-container');
const rulesBtn = document.getElementById('rules-btn');
//---------------GAME VARIABLES--------------------
let isModalShowing = false; //toggle rules modal
let diceValuesArr = []; //track dice values
//track current & total scores + track # of rolls & which round player is on
let score = 0;
let totalScore = 0;
let rolls = 0;
let round = 1;
//---------------eventListeners--------------------
rulesBtn.addEventListener('click', () => {
	isModalShowing = !isModalShowing;
	if (isModalShowing) {
		rulesBtn.textContent = 'Hide Rules';
		rulesContainer.style.display = 'block';
	} else {
		rulesBtn.textContent = 'Show Rules';
		rulesContainer.style.display = 'none';
	}
});
//
rollDiceBtn.addEventListener('click', () => {
	if (rolls === 3) {
		alert('You have made three rolls this round. Please select a score.');
	} else {
		rolls++;
		rollDice();
		updateStats();
	}
});
//-------------------ROLL DICE FUNCTION/LOGIC(*notes)----------------
const rollDice = () => {
	//generate 5 dice numbers (value = 1-6) and push to array
	diceValuesArr = [];
	for (let i = 0; i < 5; i++) {
		const randomDice = Math.floor(Math.random() * 6) + 1;
		diceValuesArr.push(randomDice);
	}
	//display dice values generated
	listOfAllDice.forEach((dice, index) => {
		dice.textContent = diceValuesArr[index];
	});
};
//update rolls, round text content
const updateStats = () => {
	currentRoundRollsText.textContent = rolls;
	currentRoundText.textContent = round;
};
//---------------------NOTES-----------------------------------
//There are a total of 6 rounds - for each round the player can roll the dice max 3 times and collect a score.
//(*)When the user clicks on the Roll the dice button, five random die numbers should be generated and displayed on the screen. Each time the user rolls the dice, the list of previous dice values should be reset. When the user rolls the dice, you will need to generate 5 random numbers (1-6) representing each die value.
