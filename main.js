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
const submitBtn = document.querySelector('.submitBtn');

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
const getCheckedPriority = () => {
    let priority = '';

    for (let i = 0; i < priorityInput.length; i++) {
        if(priorityInput[i].checked) {
            priority = priorityInput[i].value;
        }
    }

    return priority;
}

const addTask = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const notes = notesInput.value;
    const priority = getCheckedPriority();

    if(task !== '' && priority !== '' && date !== '') {
        todoList.push(new Todo(task, priority, date, notes));
    }
}

const resetDialogInput = () => {
    taskInput.value = '';
    dateInput.value = '';
    notesInput.value = '';

    for (let i = 0; i < priorityInput.length; i++) {
        if(priorityInput[i].checked) {
            priorityInput[i].checked = false;
        }
    }
}


// Event Listeners
addTaskBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    resetDialogInput();

    dialog.close();
});

submitBtn.addEventListener('click', (e) => {
   e.preventDefault();
   
   const priority = getCheckedPriority();

   if(taskInput.value && dateInput.value &&
      notesInput.value && priority
    ) {
        addTask();
   }

    resetDialogInput();
});