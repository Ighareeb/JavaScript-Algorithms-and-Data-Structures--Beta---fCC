// declare/assign variables for DOM elements
const sortButton = document.getElementById('sort');
const sortInputArray = (event) => {
	event.preventDefault();
	//get values from <select> Els + convert HTML list to array with ...spread operator
	//NOTE: values are stored as strings in <select> so need to convert to numbers
	const inputValues = [
		...document.getElementsByClassName('values-dropdown'),
	].map((dropdown) => Number(dropdown.value));
};
//test code while writing
sortButton.addEventListener('click', sortInputArray);
