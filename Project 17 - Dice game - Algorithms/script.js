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
		resetRadioOption();
		rollDice();
		updateStats();
		getHighestDuplicates(diceValuesArr);
		detectFullHouse(diceValuesArr);
		checkForStraights(diceValuesArr);
	}
});
keepScoreBtn.addEventListener('click', () => {
	let selectedValue;
	let achieved;
	//iterate to see which radio button has the checked attribute and get its value/id
	for (const radioButton of scoreInputs) {
		if (radioButton.checked) {
			selectedValue = radioButton.value;
			achieved = radioButton.id;
			break;
		}
	} //when user makes selection update rounds, rolls and scores
	if (selectedValue) {
		rolls = 0;
		round++;
		updateStats();
		resetRadioOption();
		updateScore(selectedValue, achieved);
		//set game to have 6 rounds
		if (round > 6) {
			setTimeout(() => {
				alert(`Game Over! Your total score is ${totalScore}`);
				resetGame();
			}, 500);
		}
	} else {
		alert('Please select an option or roll the dice');
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
//choose score and add points based on player number combo selection (input radio buttons)
const updateRadioOption = (optionNode, score) => {
	scoreInputs[optionNode].disabled = false;
	scoreInputs[optionNode].value = score;
	scoreSpans[optionNode].textContent = `, score = ${score}`;
};
//algorithm that tracks any duplicates found in the diceValuesArr and displays a score next to the first two ('3-4 of a kind') radio buttons.
const getHighestDuplicates = (arr) => {
	const counts = {};

	for (const num of arr) {
		if (counts[num]) {
			counts[num]++;
		} else {
			counts[num] = 1;
		}
	}

	let highestCount = 0;

	for (const num of arr) {
		const count = counts[num];
		if (count >= 3 && count > highestCount) {
			highestCount = count;
		}
		if (count >= 4 && count > highestCount) {
			highestCount = count;
		}
	}
	const sumOfAllDice = diceValuesArr.reduce((a, b) => a + b, 0);
	if (highestCount >= 4) {
		updateRadioOption(1, sumOfAllDice);
	}

	if (highestCount >= 3) {
		updateRadioOption(0, sumOfAllDice);
	}
	//If the user does not get a "Three of a kind" or "Four of kind", then they will not receive any points for that round.
	updateRadioOption(5, 0);
};
//function to check for (full house) i.e. both a "Three of a kind"(25points) and a pair and display that option on the screen.
const detectFullHouse = (arr) => {
	const counts = {};
	for (const num of arr) {
		counts[num] = counts[num] ? counts[num] + 1 : 1;
	}
	const hasThreeOfAKind = Object.values(counts).includes(3);
	const hasPair = Object.values(counts).includes(2);
	if (hasThreeOfAKind && hasPair) {
		updateRadioOption(2, 25);
	}
	updateRadioOption(5, 0);
};
//function that checks for a straight i.e.dice have consecutive values small - 4 consec(30points), 5 consec is long straigth(40points)
const checkForStraights = (arr) => {
	const sortedNumbersArr = arr.sort((a, b) => a - b);
	const uniqueNumbersArr = [...new Set(sortedNumbersArr)];
	const uniqueNumbersStr = uniqueNumbersArr.join('');
	const smallStraightsArr = ['1234', '2345', '3456'];
	const largeStraightsArr = ['12345', '23456'];
	if (smallStraightsArr.includes(uniqueNumbersStr)) {
		updateRadioOption(3, 30);
	}
	if (largeStraightsArr.includes(uniqueNumbersStr)) {
		updateRadioOption(4, 40);
	}
	updateRadioOption(5, 0);
};
//function to reset values for the score inputs and spans so a new value can be displayed.
const resetRadioOption = () => {
	scoreInputs.forEach((input) => {
		input.disabled = true;
		input.checked = false;
	});

	scoreSpans.forEach((span) => {
		span.textContent = '';
	});
};
//function that keeps track of and displays each score for all six rounds of the game. (selectedValue is the option chosen by user)
const updateScore = (selectedValue, achieved) => {
	totalScore += parseInt(selectedValue);
	totalScoreText.textContent = totalScore;
	scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};
//function needed to implement 6 round game limitconst resetGame = () => {
const resetGame = () => {
	diceValuesArr = [0, 0, 0, 0, 0];
	score = 0;
	totalScore = 0;
	rolls = 0;
	round = 1;
	//reset each dice value
	listOfAllDice.forEach((dice, index) => {
		dice.textContent = diceValuesArr[index];
	});
	//update score history, total, rounds and rolls text.
	totalScoreText.textContent = totalScore;
	scoreHistory.innerHTML = '';
	currentRoundRollsText.textContent = rolls;
	currentRoundText.textContent = round;
	//reset all of the radio buttons.
	resetRadioOption();
};
