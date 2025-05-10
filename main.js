// Selectors
const todayTodoList = document.getElementById('todayTodoList');
const allTodoList = document.getElementById('allTodoList');
const importantTodoList = document.getElementById('importantTodoList');
const completedTodoList = document.getElementById('completedTodoList'); 
const addTaskBtn = document.querySelector('.addTaskBtn');
const dialog = document.querySelector('dialog');
const cancelBtn = document.querySelector('.cancelBtn');

// State
let todoList = [];

// On mount


// Constructors


// Functions


// Event Listeners
addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    dialog.close();
});