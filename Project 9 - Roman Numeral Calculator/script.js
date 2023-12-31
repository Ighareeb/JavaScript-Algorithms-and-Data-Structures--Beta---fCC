// // Declared/Assigned variables for DOM elements
// const formEl = document.getElementById('form');
// const inputEl = document.getElementById('number');
// const outputEl = document.getElementById('output');
// const convertBtn = document.getElementById('convert-btn');

// //eventListeners
// // inputEl.addEventListener('change', (e) => {
// // 	console.log(e.target.value);
// // });
// convertBtn.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	const input = parseInt(inputEl.value);
// 	if (isNaN(input)) {
// 		outputEl.textContent = 'Please enter a valid number';
// 	} else if (input <= 0) {
// 		outputEl.textContent = 'Please enter a number greater than or equal to 1';
// 	} else if (input >= 4000) {
// 		outputEl.textContent = 'Please enter a number less than or equal to 3999';
// 	} else {
// 		outputEl.textContent = convertToRoman(input);
// 	}
// });
// // formEl.addEventListener('submit', (e) => {
// // 	e.preventDefault();
// // 	console.log(inputEl.value);
// // });
// function convertToRoman(num) {
// 	const romanNumerals = {
// 		M: 1000,
// 		CM: 900,
// 		D: 500,
// 		CD: 400,
// 		C: 100,
// 		XC: 90,
// 		L: 50,
// 		XL: 40,
// 		X: 10,
// 		IX: 9,
// 		V: 5,
// 		IV: 4,
// 		I: 1,
// 	};
// 	let romanNumeral = '';
// 	for (let key in romanNumerals) {
// 		// console.log(romanNumerals[value]);
// 		let value = romanNumerals[key];
// 		while (num >= value) {
// 			romanNumeral += key;
// 			num -= value;
// 		}
// 	}
// 	return romanNumeral;
// }

// This code passed because I was declaring script at the top of HTML and using defer which fCC didn't like.
// if I use it at the bottom of the HTML then the prev code works
document.addEventListener('DOMContentLoaded', (event) => {
	// Declared/Assigned variables for DOM elements
	const formEl = document.getElementById('form');
	const inputEl = document.getElementById('number');
	const outputEl = document.getElementById('output');
	const convertBtn = document.getElementById('convert-btn');

	// Function to convert a number to a Roman numeral
	function convertToRoman(num) {
		const romanNumerals = {
			M: 1000,
			CM: 900,
			D: 500,
			CD: 400,
			C: 100,
			XC: 90,
			L: 50,
			XL: 40,
			X: 10,
			IX: 9,
			V: 5,
			IV: 4,
			I: 1,
		};
		let romanNumeral = '';
		for (let key in romanNumerals) {
			const value = romanNumerals[key];
			while (num >= value) {
				romanNumeral += key;
				num -= value;
			}
		}
		return romanNumeral;
	}

	// Event listener for button click
	convertBtn.addEventListener('click', (e) => {
		e.preventDefault();
		const input = parseInt(inputEl.value);
		if (isNaN(input)) {
			outputEl.textContent = 'Please enter a valid number';
		} else if (input <= 0) {
			outputEl.textContent = 'Please enter a number greater than or equal to 1';
		} else if (input >= 4000) {
			outputEl.textContent = 'Please enter a number less than or equal to 3999';
		} else {
			outputEl.textContent = convertToRoman(input);
		}
	});
});
