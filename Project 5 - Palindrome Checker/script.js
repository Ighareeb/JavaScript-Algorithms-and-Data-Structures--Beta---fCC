//Variables for DOM Elements
const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const resultEl = document.getElementById('result');

//EventListener for check-btn
checkBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const userInput = textInput.value;
	// console.log(userInput.length);
	const cleanedInput = userInput.replace(/[^a-zA-Z0-9]/g, '');
	if (userInput === '') {
		alert('Please input a value');
	} else if (userInput.length === 1) {
		resultEl.classList.remove('hidden');
		resultEl.innerHTML = `<p class='user-input'><strong>${userInput}</strong> is a palindrome</p>`;
	} else {
		const reverse = cleanedInput.split('').reverse().join('');
		if (cleanedInput.toLowerCase() === reverse.toLowerCase()) {
			resultEl.classList.remove('hidden');
			resultEl.innerHTML = `<p class='user-input'><strong>${userInput}</strong> is a palindrome</p>`;
		} else {
			resultEl.classList.remove('hidden');
			resultEl.innerHTML = `<p class='user-input'><strong>${userInput}</strong> is not a palindrome</p>`;
		}
	}
});
