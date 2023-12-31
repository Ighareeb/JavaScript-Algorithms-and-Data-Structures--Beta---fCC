// Declared/Assigned variables for DOM elements
const formEl = document.getElementById('form');
const inputEl = document.getElementById('number');
const outputEl = document.getElementById('output');
const convertBtn = document.getElementById('convert-btn');

//eventListeners
// inputEl.addEventListener('change', (e) => {
// 	console.log(e.target.value);
// });
convertBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (isNaN(inputEl.value)) {
		outputEl.innerText = 'Please enter a valid number';
	} else if (inputEl.value <= 0) {
		outputEl.innerText = 'Please enter a number greater than or equal to 1';
	} else if (inputEl.value >= 4000) {
		outputEl.innerText = 'Please enter a number less than or equal to 3999';
	}
});
formEl.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log(inputEl.value);
});
