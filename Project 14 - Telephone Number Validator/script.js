// declare/assign variables for DOM elements
const userInput = document.getElementById('user-input');
const results = document.getElementById('results-div');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
//eventListeners
checkBtn.addEventListener('click', () => {
	if (userInput.value === '') {
		alert('Please provide a phone number');
	}
	if (userInput.value)
});
//
clearBtn.addEventListener('click', () => {
	results.textContent = '';
});
//-----------REGEX VARIABLES & ARRAYS-----------
const noSpaces = /^[0-9]{10}$/;
const withSpaceOne = /^1\s\d{3}\s\d{3}\s\d{4}$/;
const withHyphen = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const withHyphenOne = /^1\s\d{3}-\d{3}-\d{4}$/;
const withParenHyphen = /^[0-9]{3}\([0-9]{3}\)-[0-9]{4}$/;
const withParenHyphenOne = /^1\s?(\d{3}\)\s?(\d{3})-(\d{4})$/;
//
const regexArray = [noSpaces, withHyphen, withParenHyphen, withSpaceOne, withHyphenOne, withParenHyphenOne];
