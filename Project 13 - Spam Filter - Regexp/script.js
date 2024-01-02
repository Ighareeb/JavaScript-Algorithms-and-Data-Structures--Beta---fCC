// declared/assigned variables for DOM elements
const messageInput = document.getElementById('message-input');
const checkMessageButton = document.getElementById('check-message-btn');
const result = document.getElementById('result');
//event listener
checkMessageButton.addEventListener('click', () => {
	if (messageInput.value === '') {
		alert('Please enter a message.');
		return;
	}
	result.textContent = isSpam(messageInput.value)
		? 'Oh no! This looks like a spam message.'
		: 'This message does not seem to contain any spam.';
	messageInput.value = '';
});
//-------------------------------------FUNCTIONS--------------------------------
//use regex array with regex variable and .some() to test msg
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
//------------------------------------REGULAR EXPRESSION VARIABLES--------------
const helpRegex = /please help|assist me/i;
const dollarRegex = /dollars/i;
//
//------------------------------------REGULAR EXPRESSION VARIABLES ARRAY--------
const denyList = [helpRegex, dollarRegex];
//------------------------------------NOTES REGEX-------------------------------
//String.match() method accepts a regular expression as an argument and determines if the string matches that expression. -->[Used to retrieve the matches - Returns an array with the matches or null if there are none.]
//
//regexp.test(str) method tests if a string matches the pattern. Unlike .match(), .test() returns a boolean value indicating whether or not the string matches the pattern. -->[T/F]
