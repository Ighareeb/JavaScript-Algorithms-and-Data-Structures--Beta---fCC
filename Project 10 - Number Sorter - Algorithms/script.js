// declare/assign variables for DOM elements
const sortButton = document.getElementById('sort');
//MAIN APP FUNCTION
const sortInputArray = (event) => {
	event.preventDefault();
	//get values from <select> Els + convert HTML list to array with ...spread operator
	//NOTE: values are stored as strings in <select> so need to convert to numbers
	const inputValues = [
		...document.getElementsByClassName('values-dropdown'),
	].map((dropdown) => Number(dropdown.value));
	// TYPES OF SORTING
	// const sortedValues = bubbleSort(inputValues);
	// const sortedValues = selectionSort(inputValues);
	// const sortedValues = insertionSort(inputValues);
	const sortedValues = inputValues.sort((a, b) => {
		return a - b;
	});
	// call function to display output using sortedValues array as argument
	updateUI(sortedValues);
};
//OUTPUT FUNCTION - function to display output using inputValues array as argument
const updateUI = (array = []) => {
	array.forEach((num, i) => {
		//for each number in mapped array (user input) match to i-index of output node and set value of output node
		const outputValueNode = document.getElementById(`output-value-${i}`);
		outputValueNode.innerText = num;
	});
};
//==============================SORT FUNCTIONS================================
// 1. BUBBLE SORT
// const bubbleSort = (array) => {
// 	for (let i = 0; i < array.length; i++) {
// 		for (let j = 0; j < array.length - 1; j++) {
// 			//!!*console.log for debugging + shows how bubble sort works*!!
// 			console.log(array, array[j], array[j + 1]);
// 			//check if the current element is larger than the next element. You can do this by accessing the array at j and j+1. Need to create a temp variable to swap the position of the elements (think of swapping liquids between two glasses, you need a third to store one temporarily while doing so)
// 			if (array[j] > array[j + 1]) {
// 				const temp = array[j];
// 				array[j] = array[j + 1];
// 				array[j + 1] = temp;
// 			}
// 		}
// 	}
// 	return array;
// };
//---------------------------------------------------
// 2. SELECTION SORT
// const selectionSort = (array) => {
// 	for (let i = 0; i < array.length; i++) {
// 		let minIndex = i;
// 		for (let j = i + 1; j < array.length; j++) {
// 			//!!*console.log for debugging + shows how selection sort works*!!
// 			console.log(array, array[j], array[minIndex]);
// 			if (array[j] < array[minIndex]) {
// 				minIndex = j;
// 			}
// 		}
// 		const temp = array[i];
// 		array[i] = array[minIndex];
// 		array[minIndex] = temp;
// 	}
// 	return array;
// };
//---------------------------------------------------
// 3. INSERTION SORT
const insertionSort = (array) => {
	for (let i = 1; i < array.length; i++) {
		const currValue = array[i];
		let j = i - 1;
		while (j >= 0 && array[j] > currValue) {
			array[j + 1] = array[j];
			console.log(array, array[j], currValue);
			j--; //so trails behind i which starts at index 1 and i++s
		}
		array[j + 1] = currValue;
	}
	return array;
};
//test code while writing
sortButton.addEventListener('click', sortInputArray);
