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
	//2.MEDIAN - call + display output
	const median = getMedian(filteredNumArrArray);
	document.querySelector('#median').textContent = median;
	//3.MODE - call + display output
	const mode = getMode(filteredNumArrArray);
	document.querySelector('#mode').textContent = mode;
	//4.RANGE - call + display output
	const range = getRange(filteredNumArrArray);
	document.querySelector('#range').textContent = range;
	//5.VARIANCE - call + display output
	const variance = getVariance(filteredNumArrArray);
	document.querySelector('#variance').textContent = variance;
	//6.STANDARD DEVIATION - call + display output
	const standardDeviation = getStandardDeviation(filteredNumArrArray);
	document.querySelector('#standardDeviation').textContent = standardDeviation;
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
	//sort in ascending order; .slice to create shallow copy so original array is not mutated (sort in place method)
	const sorted = array.slice().sort((a, b) => {
		return a - b;
	});
	//find mid-point number - if odd dataset then middle = median. If even data set then average of two middle numbers = meidan
	const median =
		array.length % 2 === 0
			? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
			: sorted[Math.floor(array.length / 2)];
	return median;
};
//
// 3. MODE - the number that appears most often in the list
//**!caveat case - if every value appears same # of times there is no mean. Use a Set data structure (new Set() -constructor) (only allows unique values) to remove duplicate values and check. If Set.size === 1 each value appears same # of times.
const getMode = (array) => {
	//counts object to track # times each number appears in the dataset
	const counts = {};
	array.forEach((num) => {
		counts[num] = (counts[num] || 0) + 1;
	});
	//**!
	if (new Set(Object.values(counts)).size === 1) {
		return null;
	}
	//find value with highest frequency + ...
	const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
	//check if multiple values have highest frequency (all will be = mode)
	const mode = Object.keys(counts).filter(
		(num) => counts[num] === counts[highest],
	);
	//mode is an array, so return it as a string with the .join() method. Separate the elements with a comma followed by a space.
	return mode.join(', ');
};
//
// 4. RANGE - the difference between the largest and smallest numbers in the list - use Math.min()/max() methods
const getRange = (array) => {
	return Math.max(...array) - Math.min(...array);
};
//
// 5. VARIANCE - the average of the squared differences from the mean
//The variance of a series represents how much the data deviates from the mean, and can be used to determine how spread out the data are.
const getVariance = (array) => {
	const mean = getMean(array);
	//<a> calculate how far each element is from the mean.
	const differences = array.map((num) => num - mean);
	//<b> square each of the differences
	const squaredDifferences = differences.map((num) => num ** 2);
	//<c> sum the squared differences
	const sumSquaredDifferences = squaredDifferences.reduce(
		(acc, num) => acc + num,
		0,
	);
	//<d> divide the sum of the squared differences by the count of numbers
	const variance = sumSquaredDifferences / array.length;
	// Refactor - chain methods
	// const variance = array.reduce((acc, el) => {
	// 	const difference = el - mean;
	// 	const squared = difference ** 2;
	// 	return acc + squared;
	// }, 0) / array.length;
	return variance;
};
//
// 6. STANDARD DEVIATION - the square root of the variance
const getStandardDeviation = (array) => {
	const variance = getVariance(array);
	//using Math.pow() with an inverted exponent (x^{1/n}) to calculate a root exponent (sqrt[n]{x})
	const standardDeviation = Math.pow(variance, 1 / 2);
	//OR using Math.sqrt() method
	const standardDeviationV2 = Math.sqrt(variance);
	return standardDeviation;
};
