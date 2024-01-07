// declare/assign variables for DOM
const postsContainer = document.getElementById('posts-container');
//variables for URLs
const forumLatest = 'https://forum-proxy.freecodecamp.rocks/latest';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://sea1.discourse-cdn.com/freecodecamp';
//function to fetch data from API to populate forum leaderboard
const fetchData = async () => {
	try {
		const res = await fetch(forumLatest);
		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

fetchData();
