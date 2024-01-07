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
		showLatestPosts(data);
	} catch (err) {
		console.log(err);
	}
};

fetchData();
//function to display data on page
const showLatestPosts = (data) => {
	const { topic_list, users } = data; //destructure - get topic_list,users props from data object.
	const { topics } = topic_list; //Destructure topics array from the topic_list object.
	postsContainer.innerHTML = topics
		.map((item) => {
			//destructure props from the item (each topic) object:
			const {
				id,
				title,
				views,
				posts_count,
				slug,
				posters,
				category_id,
				bumped_at,
			} = item;
			return `
    <tr>
    	<td>
        	<p class="post-title">${title}</p>
    	</td>
    	<td></td>
    	<td>${posts_count - 1}</td>
    	<td>${views}</td>
    	<td></td>
    </tr>`;
		})
		.join('');
};
