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
