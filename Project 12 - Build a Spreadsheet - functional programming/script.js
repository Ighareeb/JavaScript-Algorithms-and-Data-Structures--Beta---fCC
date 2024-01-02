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
//UPDATE & EVALFORMULA FUNCTIONS(+helper functions: idToText, rangeFromString, elemValue, addCharacters)
//start spreadsheet functions declaring new function:
const update = (event) => {
	const element = event.target;
	const value = element.value.replace(/\s/g, ''); //remove white space from input value
	//check if value does NOT include {id} of the element + if first char of value is {=} <value.charAt(0), value.startsWith('=')>
	if (!value.includes(element.id) && value[0] === '=') {
		//The first argument for your evalFormula call needs to be the contents of the cell (which you stored in value). However, the contents start with an = character to trigger the function, so you need to pass the substring of value starting at index 1. + get all cells from #container element by accessing children prop (needs to be converted from HTMLcollection to an array)
		element.value = evalFormula(
			value.slice(1),
			Array.from(document.getElementById('container').children),
		);
	}
};
//*Spreadsheet software typically uses = at the beginning of a cell to indicate a calculation should be used, and spreadsheet functions should be evaluated.
//
//In order to run your spreadsheet functions, you need to be able to parse and evaluate the input string.
//{x} = string representing a formula to be evaluated, {cells} = array of cell objects, each with an id and value property.
const evalFormula = (x, cells) => {
	//idToText return an input element, add .value to have it return value of that input element that match id passed as argument
	const idToText = (id) => cells.find((cell) => cell.id === id).value;
	//
	//also need to be able to match cell ranges in a formula (eg A1:B12) use regex to match pattern to check //cols regex then row regex then numbers - must have two character classes but the second digit is optional + separate start : end with colon
	const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
	//generate an Array of numbers for a given cell range.
	const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
	//
	//CURRYING - elemValue takes ones argument - returns another function which also takes one argument + returns result of calling idToText with arguments passed from parents. Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take one argument.
	//This is possible because functions have access to all variables declared at their creation = *CLOSURE*.
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
	//
	//MAIN RESULT VARIABLES USING HELPER FUNCTION DECLARED above
	//note1: Your addCharacters(char1) returns a function, which returns another function. You need to make another function call to access that innermost function reference for the .map() callbackby chaining directly after the first addCharacters(char1)(char2) -- so it will iterate over the elements and pass each to the .map()
	//note2it is common convention to prefix an unused parameter with an underscore {_match}
	// rangeExpanded = for each cellrange string in x, this code generates an array of cellvalues corresponding to the range, and replaces the cell range string with these cell values.
	const rangeExpanded = x.replace(
		rangeRegex,
		(_match, char1, num1, char2, num2) =>
			rangeFromString(num1, num2).map(addCharacters(char1)(char2)),
	);
	//
	//Declare a variable cellRegex to match cell references
	const cellRegex = /[A-J][1-9][0-9]?/gi;
	const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
		idToText(match.toUpperCase()),
	);
	//start applying your function parser to your evalFormula logic
	const functionExpanded = applyFunction(cellExpanded); //(ensure it has evaluated and replaced everything.)
	return functionExpanded === x
		? functionExpanded
		: evalFormula(functionExpanded, cells);
};
//----------
//infix = mathematical operator that appears between its two operands eg. 1 + 2 infix expression.
//to parse the expressions map the symbols to their corresponding functions
const infixToFunction = {
	'+': (x, y) => x + y,
	'-': (x, y) => x - y,
	'*': (x, y) => x * y,
	'/': (x, y) => x / y,
};
//Using infix functions declared you need to evaluate them:
// note - The regex needs to match two numbers with an operator between them.
// note - infixToFunction[operator] returns a function. Call function directly, passing arg1, arg2 !* they are string so you need to convert (parseFloat()) them to numbers
const infixEval = (str, regex) =>
	str.replace(regex, (_match, arg1, operator, arg2) =>
		infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)),
	);
//you need to account for order of operations.
const highPrecedence = (str) => {
	const regex = /([\d.]+)([*\/])([\d.]+)/;
	const str2 = infixEval(str, regex);
	//Your infixEval function will only evaluate the first * / operation, because regex isn't global.need to use a recursive approach to evaluate the entire string.
	// If infixEval does not find any matches, it will return the str value as-is. Use ternary to  check if str2 === str. If it is, return str, otherwise return the result of calling highPrecedence() on str2.
	return str === str2 ? str : highPrecedence(str2);
};
//-------------
//start applying your function parsing logic to a string.
const applyFunction = (str) => {
	//1) handle the higher precedence operators.
	const noHigh = highPrecedence(str);
	//2)parse and evaluate + - like with * / previously
	const infix = /([\d.]+)([+-])([\d.]+)/;
	const str2 = infixEval(noHigh, infix);
	const functionCall = /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i; //This expression will look for function calls like sum(1, 4)
	const toNumberList = (args) => args.split(',').map(parseFloat); //takes a string of comma-separated values as an argument and converts it into an array of numbers.
	const apply = (fn, args) =>
		spreadsheetFunctions[fn.toLowerCase()](toNumberList(args)); //The fn parameter == name of a function, such as SUM -returns the function found at the fn property of your spreadsheetFunctions object + calls it with the args number list created from toNumberList() function
	//(applyFunction returns)
	return str2.replace(functionCall, (match, fn, args) =>
		spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
			? apply(fn, args)
			: match,
	);
};
