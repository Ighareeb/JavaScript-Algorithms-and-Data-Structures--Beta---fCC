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
    	<td>${timeAgo(bumped_at)}</td>
    </tr>`;
		})
		.join('');
};
//function to display data in Activity column - use the {bumped_at} prop of each topic = timestamp in the ISO 8601 format. You need to process this data before you can show how much time has passed since a topic had any activity. {bumped_at} variable also used as argument when calling in <td> to display time since last post
const timeAgo = (time) => {
	const currentTime = new Date();
	const lastPost = new Date(time);

	const timeDifference = currentTime - lastPost;
	const msPerMinute = 1000 * 60;

	const minutesAgo = Math.floor(timeDifference / msPerMinute);
	const hoursAgo = Math.floor(minutesAgo / 60);
	const daysAgo = Math.floor(hoursAgo / 24);

	if (minutesAgo < 60) {
		return `${minutesAgo}m ago`;
	}

	if (hoursAgo < 24) {
		return `${hoursAgo}h ago`;
	}

	return `${daysAgo}d ago`;
};
