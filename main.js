// Selectors
const todayTodoList = document.getElementById('todayTodoList');
const allTodoList = document.getElementById('allTodoList');
const importantTodoList = document.getElementById('importantTodoList');
const completedTodoList = document.getElementById('completedTodoList'); 
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const notesInput = document.getElementById('notes');
const priorityInput = document.getElementsByName('priority');
const addTaskBtns = document.querySelectorAll('.addTaskBtn');
const dialog = document.querySelector('dialog');
const cancelBtn = document.querySelector('.cancelBtn');
const submitBtn = document.querySelector('.submitBtn');

// State
let todoList = [
    {
        task: 'Loving HER',
        priority: 'important',
        date: '2025-05-14',
        notes: "I'll always loving you"
    }
];

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

const createTodoListElements = (todo, todoContainer) => {
    const li = document.createElement('li');
    const leftContainer = document.createElement('div');
    const rightContainer = document.createElement('div');
    const inputCheckbox = document.createElement('input');
    const todoText = document.createElement('p');
    const todoDate = document.createElement('p');
    const editIcon = document.createElement('i');
    const removeIcon = document.createElement('i');

    leftContainer.classList.add('left');
    rightContainer.classList.add('right');
    todoText.classList.add('todoText');
    todoDate.classList.add('todoDate');
    removeIcon.classList.add('bi', 'bi-x-octagon');

    inputCheckbox.type = 'checkbox';
    inputCheckbox.name = 'todoChecked';

    if(todo.completed) {
        inputCheckbox.checked = true;
    }

    inputCheckbox.addEventListener('change' ,() => {
        todo.completed = inputCheckbox.checked;

        displayTodayTask();
        displayAllTasks();
        displayImportantTask();
        displayCompletedTask();
    });

    todoText.textContent = todo.task;
    todoDate.textContent = todo.date;

    removeIcon.addEventListener('click', () => {
        li.remove();

        const newTodoList = todoList.filter(item => item !== todo);
        todoList = newTodoList;

        displayTodayTask();
        displayAllTasks();
        displayImportantTask();
        displayCompletedTask();
    });

    leftContainer.append(inputCheckbox, todoText, todoDate);
    rightContainer.append(removeIcon);

    li.append(leftContainer, rightContainer);

    todoContainer.append(li);
}

const displayTodayTask = () => {
    const todayDate = new Date().toISOString().split('T')[0];

    // Reset today todo list
    todayTodoList.innerHTML = '';

    todoList.forEach((todo) => {
        if(todo.date === todayDate) {
            createTodoListElements(todo, todayTodoList);
        }
    });
}

displayTodayTask();

const displayAllTasks = () => {
    // Reset all todo list
    allTodoList.innerHTML = '';

    todoList.forEach((todo) => {
        createTodoListElements(todo, allTodoList);
    });
}

displayAllTasks();

const displayImportantTask = () => {
    // Reset important todo list
    importantTodoList.innerHTML = '';

    todoList.forEach((todo) => {
        if(todo.priority === 'important') {
            createTodoListElements(todo, importantTodoList);
        }
    });
}

displayImportantTask();

const displayCompletedTask = () => {
    // Reset completed todo list
    completedTodoList.innerHTML = '';

    todoList.forEach((todo) => {
        if(todo.completed) {
            createTodoListElements(todo, completedTodoList);
        }
    });
}

displayCompletedTask();

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
addTaskBtns.forEach((addTaskBtn) => {
    addTaskBtn.addEventListener('click', () => {
        dialog.showModal();
    });
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    resetDialogInput();

    dialog.close();
});

submitBtn.addEventListener('click', (e) => {
   e.preventDefault();
   
   const priority = getCheckedPriority();

   if(taskInput.value && dateInput.value && priority) {
        addTask();
        displayTodayTask();
        displayAllTasks();
        displayImportantTask();
        resetDialogInput();

        dialog.close();
   }
});