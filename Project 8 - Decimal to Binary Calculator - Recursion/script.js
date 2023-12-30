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
//For the binary to decimal conversion, you need to divide input by 2 until the quotient, or the result of dividing two numbers, is 0. Use a while loop to run a block of code as long as input is greater than 0 and can be divided.
//NON_RECURSIVE SOLUTION
// const decimalToBinary = (input) => {
// 	const inputs = [];
// 	const quotients = [];
// 	const remainders = [];
// 	//NOTE because of while condition functiononly works with numbers > 0
// 	// add if statements to accept input of 0
// 	if (input === 0) {
// 		result.innerText = '0';
// 		return;
// 	}
// 	while (input > 0) {
// 		const quotient = Math.floor(input / 2);
// 		const remainder = input % 2;
// 		inputs.push(input);
// 		quotients.push(quotient);
// 		remainders.push(remainder);
// 		input = quotient; //lowers value of input to prevent infinite while loop
// 		console.log(`Inputs: ${inputs}`);
// 		console.log('Quotients: ', quotients);
// 		console.log('Remainders: ', remainders);
// 		//NOTE: the remainders array is reversed order binary representation of the input so we can use it in the following logic
// 		result.innerText = remainders.reverse().join('');
// 	}
// };
//MORE EFFICIENT NON_RECURSIVE SOLUTION
const decimalToBinary = (input) => {
	let binary = '';
	if (input === 0) {
		binary = '0';
	}
	while (input > 0) {
		input = Math.floor(input / 2); //quotient
		binary = (input % 2) + binary; //remainder + '' i.e converts/concatenates remainder into the binary string
	}
	result.innerText = binary;
};
//
//eventListeners for submitting user input
convertBtn.addEventListener('click', checkUserInput);
numberInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		checkUserInput();
	}
});
