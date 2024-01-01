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
	//------------------calling defined statistics functions in calculate()-------------------
	//1.MEAN - call + display output
	const mean = getMean(filteredNumArrArray);
	document.querySelector('#mean').textContent = mean;
	//1.MEDIAN - call + display output
	const median = getMedian(filteredNumArrArray);
	document.querySelector('#median').textContent = median;
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
//
//2. MEDIAN - midpoint of a set of numbers. IMP! - numbers must be sorted in ascending order
const getMedian = (array) => {
	//sort in ascending order
	const sorted = array.sort((a, b) => {
		return a - b;
	});
	//find mid-point number - if odd dataset then middle = median. If even data set then average of two middle numbers = meidan
	const median =
		array.length % 2 === 0
			? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
			: sorted[Math.floor(array.length / 2)];
	return median;
};
