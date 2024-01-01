window.onload = () => {
	const container = document.getElementById('container');
	const createLabel = (name) => {
		const label = document.createElement('div');
		label.className = 'label';
		label.textContent = name;
		container.appendChild(label);
	};
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
