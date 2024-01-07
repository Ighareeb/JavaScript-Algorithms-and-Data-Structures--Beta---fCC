const userInput = document.getElementById('search-input');
const form = document.getElementById('search-form');
const searchBtn = document.getElementById('search-button');
const pName = document.getElementById('pokemon-name');
const pid = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const sprite = document.getElementById('sprite');
const type = document.getElementById('type');
//
const url = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/pikachu';
//

//
const getPokemon = async (query) => {
	try {
		const res = await fetch(`${url}`);
		const data = await res.json();
		console.log(data);

		if (data.detail === 'Not found.') {
			alert('Pokémon not found');
			return;
		}
		pName.textContent = data.name.toUpperCase();
		pid.textContent = `#${data.id}`;
		weight.textContent = `Weight: ${data.weight}`;
		height.textContent = `Height: ${data.height}`;
		sprite.src = data.sprites.front_default;
		type.textContent = data.types[0].type.name;
	} catch (error) {
		console.log('Error:', error);
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const query = userInput.value.toLowerCase();
	console.log(typeof query);
	// getPokemon(query);
});
getPokemon();
