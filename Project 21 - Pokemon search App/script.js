const userInput = document.getElementById('search-input');
const form = document.getElementById('search-form');
const searchBtn = document.getElementById('search-button');
const pName = document.getElementById('pokemon-name');
const pid = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defence = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefence = document.getElementById('special-defense');
const speed = document.getElementById('speed');

//
const getPokemon = async (query) => {
	try {
		const res = await fetch(
			`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query}`,
		);
		if (!res.ok) {
			alert('Pokémon not found');
			return;
		}
		const data = await res.json();
		console.log(data);

		pName.textContent = data.name.toUpperCase();
		pid.textContent = `#${data.id}`;
		weight.textContent = `Weight: ${data.weight}`;
		height.textContent = `Height: ${data.height}`;
		hp.textContent = `${data.stats[0].base_stat}`;
		attack.textContent = `${data.stats[1].base_stat}`;
		defence.textContent = `${data.stats[2].base_stat}`;
		spAttack.textContent = `${data.stats[3].base_stat}`;
		spDefence.textContent = `${data.stats[4].base_stat}`;
		speed.textContent = `${data.stats[5].base_stat}`;
		const types = document.getElementById('types');
		types.innerHTML = '';
		data.types.forEach((type) => {
			const typeElement = document.createElement('div');
			typeElement.textContent = type.type.name.toUpperCase();
			types.appendChild(typeElement);
		});
		const spriteContainer = document.querySelector('.sprite-container');
		let sprite = document.getElementById('sprite');
		if (sprite) {
			sprite.src = data.sprites.front_default;
		} else {
			sprite = document.createElement('img');
			sprite.id = 'sprite';
			sprite.src = data.sprites.front_default;
			spriteContainer.appendChild(sprite);
		}
	} catch (error) {
		console.log('Error:', error);
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const query = userInput.value.toLowerCase().replace(/[^a-z0-9]/g, '-');
	console.log(typeof query);
	getPokemon(query);
});
// getPokemon();
