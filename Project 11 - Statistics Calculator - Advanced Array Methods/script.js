//MAIN FUNCTION - calculate()
const calculate = () => {
	//get value of user input (value of an input element is always a string, even if the input type is number)
	const value = document.querySelector('#numbers').value;
	//split string returns ARRAY of strings {separating the string at each comma - followed by zero or more spaces \s*}
	const arrayStr = value.split(/,\s*/g);
	// //convert string elements of the array in numbers
	// const numberArr = arrayStr.map((str) => Number(str));
	// //Number() constructor return NaN if value cannot be converted to number. Use to verify/check that you are only working with user input that are numbers
	// const filteredNumArr = numberArr.filter(num => !Number.isNaN(num));
	//refactored by chaining array methods
	const filteredNumArr = arrayStr
		.map((str) => Number(str))
		.filter((num) => !Number.isNaN(num));
};
//-------------------------STATISTICS FUNCTIONS------------------
