// declare/assign variables for DOM elements
const userInput = document.getElementById('user-input');
const results = document.getElementById('results-div');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
//eventListeners

checkBtn.addEventListener('click', () => {
	const number = userInput.value;
	if (number === '') {
		alert('Please provide a phone number');
		return;
	}
	results.textContent = numberValidator(number)
		? `Valid US number: ${number}`
		: `Invalid US number: ${number}`;
});
//
clearBtn.addEventListener('click', () => {
	results.textContent = '';
});
//----------------FUNCTIONS--------------------------------
//use regex array with regex variable and .some() to test msg
const numberValidator = (num) => {
	// Check if the country code is provided and if it's not 1
	if (num.startsWith('1') && num.length === 11) {
		return false;
	}
	// Check if the area code is provided

	return regexArray.some((regex) => regex.test(num));
};
//-----------REGEX VARIABLES & ARRAYS-----------
const noSpaces = /^[0-9]{10}$/;
const withSpaceOne = /^1\s\d{3}\s\d{3}\s\d{4}$/;
const withHyphen = /^\d{3}-\d{3}-\d{4}$/;
const withHyphenOne = /^1\s\d{3}-\d{3}-\d{4}$/;
const withParenHyphen = /^\(\d{3}\)\d{3}\-\d{4}$/;
const withParenHyphenOne = /^1\s?\(\d{3}\)\s?\d{3}-\d{4}$/;
//
const regexArray = [
	noSpaces,
	withHyphen,
	withParenHyphen,
	withSpaceOne,
	withHyphenOne,
	withParenHyphenOne,
];

//note:you don't need to parse the string to a number when using regular expressions. Regular expressions in JavaScript work with strings.the test() method checks if the string userInputValue matches the pattern described by the regular expression regex. It doesn't matter if userInputValue contains numeric characters or not, it's treated as a string by the test() method.
