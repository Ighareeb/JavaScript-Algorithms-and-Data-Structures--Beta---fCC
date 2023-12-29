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
//eventListeners to open/close form (modal) + cancelBtn + discardBtn
openTaskFormBtn.addEventListener('click', () =>
	taskForm.classList.toggle('hidden'),
);
// showModal() is a method associated with the HTML dialog element. It is used to display a modal dialog box on a web page. This will display a modal with the Discard and Cancel buttons.
closeTaskFormBtn.addEventListener('click', () => {
	confirmCloseDialog.showModal();
});
// close() is a method of the window object you can use to close the current window, or a modal you create with the dialog element.
cancelBtn.addEventListener('click', () => confirmCloseDialog.close());
discardBtn.addEventListener('click', () => {
	confirmCloseDialog.close();
	taskForm.classList.toggle('hidden');
});
