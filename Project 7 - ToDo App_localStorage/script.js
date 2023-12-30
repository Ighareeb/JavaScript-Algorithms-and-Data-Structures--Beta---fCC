//declare/assign variables for DOM elements
const taskForm = document.getElementById('task-form');
const confirmCloseDialog = document.getElementById('confirm-close-dialog');
const tasksContainer = document.getElementById('tasks-container');
//user input
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');
//Btns
const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById('close-task-form-btn');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const cancelBtn = document.getElementById('cancel-btn');
const discardBtn = document.getElementById('discard-btn');

//task data array with task objects (store/manage task objects & save to local storage)
const taskData = JSON.parse(localStorage.getItem('data')) || [];
// NOTE: needed to add if statement to fix issue of loading taskData when page first starts, not after a task is added IF there are tasks saved in localStorage
if (taskData.length) {
	updateTaskContainer();
}
//currentTask object to track/manage state
let currentTask = {};

//EVENT LISTENERS:
//1. eventListeners to open/close form (modal) + cancelBtn + discardBtn
openTaskFormBtn.addEventListener('click', () =>
	taskForm.classList.toggle('hidden'),
);
// showModal() is a method associated with the HTML dialog element. It is used to display a modal dialog box on a web page. This will display a modal with the Discard and Cancel buttons.
closeTaskFormBtn.addEventListener('click', () => {
	confirmCloseDialog.showModal();
	//show cancel/discard buttons only if text is present in input fields
	const formInputsContainValues =
		titleInput.value || dateInput.value || descriptionInput.value;
	if (formInputsContainValues && formInputValuesUpdated) {
		confirmCloseDialog.showModal();
	} else {
		reset();
	}
	// when edits the user decides not to submit so prevent display modal with Discard/CancelBtns
	const formInputValuesUpdated =
		titleInput.value !== currentTask.title ||
		dateInput.value !== currentTask.date ||
		descriptionInput.value !== currentTask.description;
});
// close() is a method of the window object you can use to close the current window, or a modal you create with the dialog element.
cancelBtn.addEventListener('click', () => confirmCloseDialog.close());
discardBtn.addEventListener('click', () => {
	confirmCloseDialog.close();
	reset();
});
//2. eventListeners for submitting user form data
taskForm.addEventListener('submit', (e) => {
	e.preventDefault();
	// // 1.check if task exists or not to decide whether to add or update task (findIndex()returns index if exists or -1)
	// const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
	// //ID = titleInput value --> lowercase --> split str into array on space between words --> hyphenate when joining back into str + Date.now() to make id more unique
	// const taskObj = {
	// 	id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
	// 	title: titleInput.value,
	// 	date: dateInput.value,
	// 	description: descriptionInput.value,
	// };
	// if (dataArrIndex === -1) {
	// 	taskData.unshift(taskObj);
	// }
	//REFACTORED INTO 2 SEPARATE FUNCTION add to array, add to DOM
	// // 2. display taskData in tasksContainer + added delete & edit button for each task
	// taskData.forEach(
	// 	({ id, title, date, description }) =>
	// 		(tasksContainer.innerHTML += `
	// <div class="task" id="${id}">
	//     <p><strong>Title:</strong> ${title}</p>
	//     <p><strong>Date:</strong> ${date}</p>
	//     <p><strong>Description:</strong> ${description}</p>
	//     <button type="button" class="btn">Edit</button>
	//     <button type="button" class="btn">Delete</button>
	// </div>
	// `),
	// );
	// reset(); removed as added to addOrUpdateTask() function
	addOrUpdateTask();
});
//function to reset all input fields
const reset = () => {
	titleInput.value = '';
	dateInput.value = '';
	descriptionInput.value = '';
	taskForm.classList.toggle('hidden');
	currentTask = {};
};
//REFACTORED taskForm eventListener logic into two separate functions
// 1.add to array
const addOrUpdateTask = () => {
	const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
	const taskObj = {
		id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
		title: titleInput.value,
		date: dateInput.value,
		description: descriptionInput.value,
	};
	if (dataArrIndex === -1) {
		taskData.unshift(taskObj);
	} else {
		taskData[dataArrIndex] = taskObj;
	}
	updateTaskContainer();
	reset();
	localStorage.setItem('data', JSON.stringify(taskData));
};
//2. add to DOM
const updateTaskContainer = () => {
	// fix bug to clear out prev task when adding a new one so it isn't duplicated
	tasksContainer.innerHTML = '';
	taskData.forEach(
		({ id, title, date, description }) =>
			(tasksContainer.innerHTML += `
    <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
    </div>
    `),
	);
	// enable editing and deleting for each task, add an onclick attribute to both buttons. 'this' points to the element that triggers the event – the buttons.
};
//functions for onclick events Edit/DeleteBtns
const deleteTask = (buttonEl) => {
	//find the index of the task you want to delete first
	//check if the id of item is equal to the id of the parentElement (taskObj id) of buttonEl
	const dataArrIndex = taskData.findIndex(
		(item) => item.id === buttonEl.parentElement.id,
	);
	//remove task from DOM and from array
	buttonEl.parentElement.remove();
	taskData.splice(dataArrIndex, 1);
	//since you spliced task you don't use .removeItem just set localStorage to taskData again
	localStorage.setItem('data', JSON.stringify(taskData));
};
const editTask = (buttonEl) => {
	// find index (same as deleteTask step)
	const dataArrIndex = taskData.findIndex(
		(item) => item.id === buttonEl.parentElement.id,
	);
	currentTask = taskData[dataArrIndex];
	titleInput.value = currentTask.title;
	dateInput.value = currentTask.date;
	descriptionInput.value = currentTask.description;
	addOrUpdateTaskBtn.innerText = 'Update Task';
	addOrUpdateTaskBtn.ariaLabel = 'Update Task';
	taskForm.classList.toggle('hidden');
	//make editTask functional (actually reflect when task is edited/submitted) by adding to addOrUpdateTask function in the else statement
};
//LOCAL STORAGE TESTING
// const myTaskArr = [
// 	{ task: 'Walk the Dog', date: '22-04-2022' },
// 	{ task: 'Read some books', date: '02-11-2023' },
// 	{ task: 'Watch football', date: '10-08-2021' },
// ];
//Using localStorage
//localStorage.setItem("key", value);
// localStorage.setItem('data', JSON.stringify(myTaskArr));
// const getTaskArrObj = JSON.parse(localStorage.getItem('data'));
// localStorage.removeItem('key');
// localStorage.clear(); clear all items in the local storage.
