window.onload = () => {
	const container = document.getElementById('container');
	const createLabel = (name) => {
		const label = document.createElement('div');
		label.className = 'label';
		label.textContent = name;
		container.appendChild(label);
	};
	//generate letters on top of spreadsheet using createLabel as callback in .map {cols}
	const letters = charRange('A', 'J');
	letters.forEach(createLabel);
	//created range of numbers and again used createLabel inside callback function to generate range of numbers in spreadsheet {rows}
	range(1, 99).forEach((number) => {
		createLabel(number);

		//this adds spread sheet cells (input cells) with id = col-letter + row-number
		letters.forEach((letter) => {
			const input = document.createElement('input');
			input.type = 'text';
			input.id = letter + number;
			input.ariaLabel = letter + number;
			input.onchange = update; //connect to update function to use spreadsheet functions stored in object
			container.appendChild(input);
		});
	});
};

//function to generate an Array of numbers for a given range (start-end)
const range = (start, end) =>
	Array(end - start + 1)
		.fill(start)
		.map((element, index) => element + index);

//use range() to create range of letters as well - range() expects numbers --> get Unicode if char used as arguments with charCodeAt(index) then range creates array of numbers --> convert back to char using String.fromCharCode(code)
const charRange = (start, end) =>
	range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
		String.fromCharCode(code),
	);
//---------------------------------
// SPREAD SHEET FUNCTIONS
//---------------------------------
//1. SUM
const sum = (nums) => nums.reduce((acc, curr) => acc + curr, 0);
//2. CHECK IF NUMBER IS EVEN/ODD
const isEven = (num) => num % 2 === 0;
//3. AVERAGE
const average = (nums) => sum(nums) / nums.length;
//4. MEDIAN
const median = (nums) => {
	//a) create shallow copy so you don't mutate original array, then sort in ascending order
	const sorted = nums.slice().sort((a, b) => a - b);
	//b) declare variable for array length and length at middle
	const length = sorted.length;
	const middle = length / 2 - 1;
	//c) check if length is even or odd and set logic accordingly (odd = middle number, even = average of two middle numbers)
	return isEven(length)
		? average([sorted[middle], sorted[middle + 1]])
		: sorted[Math.ceil(middle)];
};
//---------------------------------
// object to hold spreadsheet functions
const spreadsheetFunctions = {
	sum,
	average,
	median,
};
//start spreadsheet functions declaring new function:
const update = (event) => {
	const element = event.target;
	const value = element.value.replace(/\s/g, ''); //remove white space from input value
	//check if value does NOT include {id} of the element + if first char of value is {=} <value.charAt(0), value.startsWith('=')>
	if (!value.includes(element.id) && value[0] === '=') {
	}
};
//*Spreadsheet software typically uses = at the beginning of a cell to indicate a calculation should be used, and spreadsheet functions should be evaluated.
//
//In order to run your spreadsheet functions, you need to be able to parse and evaluate the input string.
const evalFormula = (x, cells) => {
	//idToText return an input element, add .value to have it return value of that input element that match id passed as argument
	const idToText = (id) => cells.find((cell) => cell.id === id).value;
	//also need to be able to match cell ranges in a formula (eg A1:B12) use regex to match pattern to check //cols regex then row regex then numbers - must have two character classes but the second digit is optional + separate start : end with colon
	const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
	//generate an Array of numbers for a given cell range.
	const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
	//CURRYING - elemValue takes ones argument - returns another function which also takes one argument + returns result of calling idToText with arguments passed from parents. Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take one argument.
	//This is possible because functions have access to all variables declared at their creation. This is called closure.
	//example 1 explicit return of function
	const elemValue = (num) => {
		const inner = (character) => {
			return idToText(character + num);
		};
		return inner;
	};
	//example 1 implicit return of function
	// const elemValue = (num) => (character) => idToText(character + num);
	//
	//example 2 implicit return of function
	//addCharacters function ultimately returns a range of characters. You want it to return an array of cell ids.
	//Because elemValue returns a function (idToText), your addChars function ultimately returns an array of function references. You want the .map() method to run the inner function of your elemValue function, which means you need to call elemValue instead of reference it. Pass num as the argument to your elemValue function.
	const addCharacters = (character1) => (character2) => (num) =>
		charRange(character1, character2).map(elemValue(num));
};
