//Assign variables for DOM elements
const numberInput = document.getElementById('number-input');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
// function to check user input when it is submitted
//FUNCTIONS
const checkUserInput = () => {
	decimalToBinary(parseInt(numberInput.value));
	// input type="number" element allows special characters like ., +, and e, users can input floats like 2.2, equations like 2e+3, or even just e, which you don't want to allow.
	// parseInt() function, which converts a string into an integer or whole number - returns either an integer or NaN
	if (!numberInput.value || isNaN(parseInt(numberInput.value))) {
		alert('Please provide a decimal number');
		return;
	}
	numberInput.value = '';
};
const decimalToBinary = (input) => {};
//eventListeners for submitting user input
convertBtn.addEventListener('click', checkUserInput);
numberInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		checkUserInput();
	}
});
