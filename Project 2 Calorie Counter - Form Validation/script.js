//Variables assigned to DOM elements
const mainTitleElement = document.getElementById('title');
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
//
let isError = false;
//
// Even though you set an input element to be a number, JavaScript receives a string value. You need to write a function to clean the string value and ensure you have a number.
function cleanInputString(str) {
	// Note that you need to use the \ to escape the +
	// \s will match any whitespace character.
	// without [] patterns looks for regex in order
	// to match characters individually turn into char class using []
	// you no longer need to escape the + character, because you are using a character class.
	// g flag, which stands for "global", will tell the pattern to continue looking after it has found a match
	const regex = /[+-\s]/g;
	return str.replace(regex, '');
}
//
// In HTML, number inputs allow for exponential notation (such as 1e10). You need to filter those out. (note: e for exponential which can only appear between two numbers)
// The + modifier matches pattern that occurs one or more times.
function isInvalidInput(str) {
	const regex = /\d+e\d+/i;
	return str.match(regex);
}
//
function addEntry() {
	// assigned targetId = '#' + entryDropdown.value to determine which category the entry needs to be added to (use to search for #id)
	let targetId = '#' + entryDropdown.value;
	// match targetId with input-container el
	//  === (`#${entryDropdown.value} .input-container`);
	const targetInputContainer = document.querySelector(
		`${targetId} .input-container`,
	);
	//number entries a user adds (qSA returns nodelist -  length property of NodeList === number entries)
	const entryNumber =
		// 	when adding entries  you may notice some bugs. the first entry should have a count of 1, not 0.
		// This bug occurs because you are querying for input[type="text"] elements BEFORE adding the new entry to the page. To fix this, update your entryNumber variable to be the value of the length of the query plus 1

		targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
	// build dynamic HTML string to add //template literal also allows me to start on a new line for each HTML tag/el being created
	const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" placeholder="Calories" min="0"/>`;
	//changed .innerHTML to .insertAdjacentHTML(str-position, str-html-to-add)
	targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

//get calorie counts from user entries
function getCaloriesFromInputs(list) {
	let calories = 0;
	// The NodeList values you will pass to ${list} will consist of input elements -> use value attribute of each element. Also use clearInputString function on list.value + validate with isInvalidInput() [returns String.match, which is an array of matches or null if no matches are found.]
	for (let i = 0; i < list.length; i++) {
		const currVal = cleanInputString(list[i].value);
		const invalidInputMatch = isInvalidInput(currVal);
		if (invalidInputMatch) {
			alert(`Invalid Input: ${invalidInputMatch[0]}`);
			isError = true;
			return null;
		}
		calories += Number(currVal);
	}
	return calories;
}
//calculate calories function which will be attached to form submit event
function calculateCalories(event) {
	event.preventDefault();
	isError = false;
	//get values from entries user has added
	const breakfastNumberInputs = document.querySelectorAll(
		'#breakfast input[type=number]',
	);
	const lunchNumberInputs = document.querySelectorAll(
		'#lunch input[type=number]',
	);
	const dinnerNumberInputs = document.querySelectorAll(
		'#dinner input[type=number]',
	);
	const snacksNumberInputs = document.querySelectorAll(
		'#snacks input[type=number]',
	);
	const exerciseNumberInputs = document.querySelectorAll(
		'#exercise input[type=number]',
	);
	// pass elements to getCaloriesFromInputs() function
	const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
	const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
	const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
	const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
	const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
	//get value of daily calorie budget - NOTE since you used getById it is an El not a node list so place inside [] to make it an array when passing it to getCaloriesFromInputs() function
	const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
	//add conditional to return/stop function if invalid input detected
	if (isError) {
		return;
	}
	//CALCULATIONS
	const consumedCalories =
		breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
	const remainingCalories =
		budgetCalories - consumedCalories + exerciseCalories;
	const surplusOrDeficit = remainingCalories >= 0 ? 'Surplus' : 'Deficit';
	//construct output to display to user
	output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
		remainingCalories,
	)} Calorie ${surplusOrDeficit}</span>
	<hr />
	<p>${budgetCalories} Calories Budgeted</p>
	<p>${consumedCalories} Calories Consumed</p>
	<p>${exerciseCalories} Calories Burned</p>`;
	output.classList.remove('hide');
}
//clear form input fields + budget input + output el
function clearForm() {
	//qSA return nodelist so change to array to use array methods
	const inputContainers = Array.from(
		document.querySelectorAll('.input-container'),
	);
	for (let i = 0; i < inputContainers.length; i++) {
		inputContainers[i].innerHTML = '';
	}
	budgetNumberInput.value = '';
	output.innerText = '';
	output.classList.add('hide');
}
//EventListener for addEntry
addEntryButton.addEventListener('click', addEntry);
//Submit form EventListener using calculateCalories as callback
calorieCounter.addEventListener('submit', calculateCalories);
//EventListener for clearForm
clearButton.addEventListener('click', clearForm);
