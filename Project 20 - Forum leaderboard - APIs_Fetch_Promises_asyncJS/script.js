// declare/assign variables for DOM
const postsContainer = document.getElementById('posts-container');
//category object which holds all of the forum categories and classNames for the styling.
const allCategories = {
	299: { category: 'Career Advice', className: 'career' },
	409: { category: 'Project Feedback', className: 'feedback' },
	417: { category: 'freeCodeCamp Support', className: 'support' },
	421: { category: 'JavaScript', className: 'javascript' },
	423: { category: 'HTML - CSS', className: 'html-css' },
	424: { category: 'Python', className: 'python' },
	432: { category: 'You Can Do This!', className: 'motivation' },
	560: { category: 'Backend Development', className: 'backend' },
};
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
        	<a class="post-title" target="_blank" href='${forumTopicUrl}${slug}/${id}'>${title}</a>
			${forumCategory(category_id)}
    	</td>
    	<td>
			<div class="avatar-container">
				${avatars(posters, users)}
			</div>
		</td>
    	<td>${posts_count - 1}</td>
    	<td>${viewCount(views)}</td>
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
//function to convert view counts to a more readable format
const viewCount = (views) => {
	const thousands = Math.floor(views / 1000);

	if (views >= 1000) {
		return `${thousands}k`;
	}

	return views; //for less than 1000 views
};
//function to retrieve category names from allCategories object
const forumCategory = (id) => {
	let selectedCategory = {};

	if (allCategories.hasOwnProperty(id)) {
		const { className, category } = allCategories[id];

		selectedCategory.className = className;
		selectedCategory.category = category;
	} else {
		selectedCategory.className = 'general';
		selectedCategory.category = 'General';
		selectedCategory.id = 1;
	}
	const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
	const linkText = selectedCategory.category; //display the name of the category in the anchor element.
	const linkClass = `category ${selectedCategory.className}`; //apply styles for the anchor element.
	return `<a href="${url}" class='${linkClass}' target='_blank'>${linkText}</a>`;
};
//function to include list of user avatar images that are participating in coversation for a topic
const avatars = (posters, users) => {
	return posters
		.map((poster) => {
			const user = users.find((user) => user.id === poster.user_id);
			if (user) {
				const avatar = user.avatar_template.replace(/{size}/, 30);
				const userAvatarUrl = avatar.startsWith('/user_avatar/')
					? avatarUrl.concat(avatar)
					: avatar;
				return `<img src="${userAvatarUrl}" alt="${user.name}" />`;
			}
		})
		.join('');
};
