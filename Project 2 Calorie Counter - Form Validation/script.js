const mainTitleElement = document.getElementById('title');
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
//
let isError = false;
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
