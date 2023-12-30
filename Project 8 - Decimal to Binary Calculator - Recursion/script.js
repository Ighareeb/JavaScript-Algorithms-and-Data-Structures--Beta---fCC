//Assign variables for DOM elements
const numberInput = document.getElementById('number-input');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
// function to check user input when it is submitted
const checkUserInput = () => {
	console.log(numberInput.value);
};
//eventListeners for submitting user input
convertBtn.addEventListener('click', checkUserInput);
numberInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		checkUserInput();
	}
});
