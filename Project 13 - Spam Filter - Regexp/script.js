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
const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i;
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:\s|$)/i;
const stockRegex = /(?:\s|^)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:\s|$)/i;
const dearRegex = /(?:\s|^)d[e3][a@4]r fr[i1|][e3]nd(?:\s|$)/i;
//
//------------------------------------REGULAR EXPRESSION VARIABLES ARRAY--------
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];
//------------------------------------NOTES REGEX-------------------------------
//String.match() method accepts a regular expression as an argument and determines if the string matches that expression. -->[Used to retrieve the matches - Returns an array with the matches or null if there are none.]
//
//regexp.test(str) method tests if a string matches the pattern. Unlike .match(), .test() returns a boolean value indicating whether or not the string matches the pattern. -->[T/F]
//---------------
//CHARACTER CLASS - defined by square brackets, and matches any character within the brackets (eg.[aeiou] [a-z] [0-9])
//CAPTURE GROUP - way to define a part of the expression that should be captured and saved for later reference. You can define a capture group by wrapping a part of your expression in parentheses eg. /h(i|ey) camper/ would match either hi camper or hey camper, and would capture i or ey in a group.
//NON-CAPTURE GROUP - way to group parts of a regular expression pattern without storing those parts as a captured result {i.e. matches without capturing}. (?:pattern)
//QUANTIFIERS
//  + quantifier can be used - this matches one or more consecutive occurrence (eg./a+/ matches one or more consecutive a characters.)
// ? quantifier matches zero or one occurrence of the preceding character or group.
//META CHARACTERS + ANCHORS
// \s - match spaces, tabs, and line breaks.
// ^ anchor asserts that your pattern match starts at the beginning of the full string.
// $ anchor to match the end of the string.
