//declare/assign variables for DOM elements
const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');
//variables to choose/store authors from fetch req
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

//function to display data in UI (will be used in fetch req)
const displayAuthors = (authors) => {
	authors.forEach(({ author, image, url, bio }, index) => {
		authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
    <h2 class="author-name">${author}</h2>
    <img class="user-img" src="${image}" alt="${author} avatar" />
    <p class="bio">${bio}</p>
    <a class="author-link" href="${url}" target="_blank">${author}'s author page</a>
    </div>`;
	});
};

//function to load more authors & eventListener for loadMore(Authors)Btn
const fetchMoreAuthors = () => {
	startingIndex += 8;
	endingIndex += 8;

	displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
};

loadMoreBtn.addEventListener('click', fetchMoreAuthors);

//fetch request
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
	.then((res) => res.json())
	.then((data) => {
		authorDataArr = data;
		displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
	})
	.catch((err) => {
		console.error(`There was an error: ${err}`);
	});
