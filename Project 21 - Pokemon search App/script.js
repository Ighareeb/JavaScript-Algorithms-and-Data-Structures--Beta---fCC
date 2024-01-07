const userInput = document.getElementById('search-input');
const form = document.getElementById('search-form');
const searchBtn = document.getElementById('search-button');
const pName = document.getElementById('pokemon-name');
const pid = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const sprite = document.getElementById('sprite');
const type = document.querySelector('.type');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defence = document.getElementById('defence');
const spAttack = document.getElementById('special-attack');
const spDefence = document.getElementById('special-defence');
const speed = document.getElementById('speed');

//
const getPokemon = async (query) => {
	try {
		const res = await fetch(
			`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`,
		);
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
		type.textContent = data.types[0].type.name.toUpperCase();
		hp.textContent = `${data.stats[0].base_stat}`;
		attack.textContent = `${data.stats[1].base_stat}`;
		defence.textContent = `${data.stats[2].base_stat}`;
		spAttack.textContent = `${data.stats[3].base_stat}`;
		spDefence.textContent = `${data.stats[4].base_stat}`;
		speed.textContent = `${data.stats[5].base_stat}`;
	} catch (error) {
		console.log('Error:', error);
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const query = userInput.value.toLowerCase();
	console.log(typeof query);
	getPokemon(query);
});
// getPokemon();
