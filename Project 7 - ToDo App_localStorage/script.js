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
const taskData = [];
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
	if (formInputsContainValues) {
		confirmCloseDialog.showModal();
	} else {
		reset();
	}
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
	//check if task exists or not to decide whether to add or update task (findIndex()returns index if exists or -1)
	const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
	//ID = titleInput value --> lowercase --> split str into array on space between words --> hyphenate when joining back into str + Date.now() to make id more unique
	const taskObj = {
		id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
		title: titleInput.value,
		date: dateInput.value,
		description: descriptionInput.value,
	};
	//
	if (dataArrIndex === -1) {
		taskData.unshift(taskObj);
	}
	//display taskData in tasksContainer + added delete & edit button for each task
	taskData.forEach(
		({ id, title, date, description }) =>
			(tasksContainer.innerHTML += `
    <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button type="button" class="btn">Edit</button>
        <button type="button" class="btn">Delete</button>
    </div>
    `),
	);
	reset();
});
//function to reset all input fields
const reset = () => {
	titleInput.value = '';
	dateInput.value = '';
	descriptionInput.value = '';
	taskForm.classList.toggle('hidden');
	currentTask = {};
};
