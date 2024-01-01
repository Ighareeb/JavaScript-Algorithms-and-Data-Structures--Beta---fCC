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
	//------------------defined statistics functions nested in calculate()-------------------
	//1.MEAN - call + display output
	const mean = getMean(filteredNumArrArray);
	document.querySelector('#mean').textContent = mean;
};
//
//-------------------------STATISTICS FUNCTIONS------------------
//1. MEAN - using .reduce(accumlator, currentValue =>{}, initialValue) method takes an array and applies a callback function to condense the array into a single value. (MEAN = [sum of all values] / [# values])
const getMean = (array) => {
	const sum = array.reduce((acc, el) => {
		acc + el;
	}, 0);
	const mean = sum / array.length;
	return mean;
};
// //refactored
// const getMean = (array) =>
// 	array.reduce((acc, el) => acc + el, 0) / array.length;
