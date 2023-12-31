const calculate = () => {
	//get value of user input
	const value = document.querySelector('#numbers').value;
	//split string (value from input is a number string) returns ARRAY of strings {separating the string at each comma - followed by zero or more spaces \s*}
	const array = value.split(/,\s*/g);
};
