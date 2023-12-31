//Assign variables for DOM elements
const numberInput = document.getElementById('number-input');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
const animationContainer = document.getElementById('animation-container');
// function to check user input when it is submitted
//FUNCTIONS
const checkUserInput = () => {
	// input type="number" element allows special characters like ., +, and e, users can input floats like 2.2, equations like 2e+3, or even just e, which you don't want to allow.
	// parseInt() function, which converts a string into an integer or whole number - returns either an integer or NaN
	const inputInt = parseInt(numberInput.value);
	if (!numberInput.value || isNaN(inputInt)) {
		alert('Please provide a decimal number');
		return;
	}
	if (inputInt === 5) {
		showAnimation();
		return;
	}
	result.textContent = decimalToBinary(inputInt);
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
// Inputs: [6, 3, 1];
// Quotients: [3, 1, 0];
// Remainders: [0, 1, 1]; reversed 1 1 0 --> 6
/////------------------------------
//MORE EFFICIENT NON_RECURSIVE SOLUTION
// const decimalToBinary = (input) => {
// 	let binary = '';
// 	if (input === 0) {
// 		binary = '0';
// 	}
// 	while (input > 0) {
// 		input = Math.floor(input / 2); //quotient
// 		binary = (input % 2) + binary; //remainder + '' i.e converts/concatenates remainder into the binary string
// 	}
// 	result.innerText = binary;
// };
// //
// //eventListeners for submitting user input
// convertBtn.addEventListener('click', checkUserInput);
// numberInput.addEventListener('keydown', (e) => {
// 	if (e.key === 'Enter') {
// 		checkUserInput();
// 	}
// });
//===================================
//RECURSIVE SOLUTION
const decimalToBinary = (input) => {
	//start with base case
	// if (input === 0) {
	// 	return '0';
	// } else if (input === 1) {
	// 	return '1';
	// } ---->refactor
	if (input === 0 || input === 1) {
		return String(input);
	}
	//recursive case - This effectively lowers the input by roughly half each time the decimalToBinary() function is called.
	// However, remember that the binary number string is built by calculating the remainder of input divided by 2 and concatenating that to the end.
	else {
		return decimalToBinary(Math.floor(input / 2)) + (input % 2);
	}
};
//==========================
//ANIMATION - check new conditional in checkUserInput()
const animationData = [
	{
		inputVal: 5,
		marginTop: 300,
		addElDelay: 1000,
		msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
		showMsgDelay: 15000,
		removeElDelay: 20000,
	},
	{
		inputVal: 2,
		marginTop: -200,
		addElDelay: 1500,
		msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
		showMsgDelay: 10000,
		removeElDelay: 15000,
	},
	{
		inputVal: 1,
		marginTop: -200,
		addElDelay: 2000,
		msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
		showMsgDelay: 5000,
		removeElDelay: 10000,
	},
];
const showAnimation = () => {
	result.innerText = 'Call Stack Animation';
	animationData.forEach((obj) => {
		setTimeout(() => {
			animationContainer.innerHTML += `<p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px" class="animation-frame">
			decimalToBinary(${obj.inputVal})
			</p>`;
		}, obj.addElDelay);
		setTimeout(() => {
			document.getElementById(obj.inputVal).textContent = obj.msg;
		}, obj.showMsgDelay);
		setTimeout(() => {
			document.getElementById(obj.inputVal).remove();
		}, obj.removeElDelay);
	});
	setTimeout(() => {
		result.textContent = decimalToBinary(5);
	}, 20000);
};
