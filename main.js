// Selectors
const todayTodoList = document.getElementById('todayTodoList');
const allTodoList = document.getElementById('allTodoList');
const importantTodoList = document.getElementById('importantTodoList');
const completedTodoList = document.getElementById('completedTodoList'); 
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const notesInput = document.getElementById('notes');
const priorityInput = document.getElementsByName('priority');
const addTaskBtn = document.querySelector('.addTaskBtn');
const dialog = document.querySelector('dialog');
const cancelBtn = document.querySelector('.cancelBtn');

// State
let todoList = [];

// On mount


// Constructors
class Todo {
    constructor(task, priority, date, notes) {
        this.task = task;
        this.priority = priority;
        this.date = date;
        this.notes = notes;
        this.completed = false;
    }
}


// Functions


// Event Listeners
addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    dialog.close();
});