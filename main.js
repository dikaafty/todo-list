// Selectors
const todayTodoList = document.getElementById('todayTodoList');
const allTodoList = document.getElementById('allTodoList');
const importantTodoList = document.getElementById('importantTodoList');
const completedTodoList = document.getElementById('completedTodoList'); 
const overdueTodoList = document.getElementById('overdueTodoList');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const notesInput = document.getElementById('notes');
const priorityInput = document.getElementsByName('priority');
const todoSections = document.querySelectorAll('.todoSection');
const addTaskBtns = document.querySelectorAll('.addTaskBtn');
const sidebarNavs = document.querySelectorAll('.nav');
const dialog = document.querySelector('dialog');
const cancelBtn = document.querySelector('.cancelBtn');
const submitBtn = document.querySelector('.submitBtn');
const deleteAllTasksBtn = document.querySelector('.deleteAllTasksBtn');
const avatar = document.querySelector('.avatar');
const sidebar = document.querySelector('.sidebar');
const mediaQuery = window.matchMedia('(max-width: 768px)');

// State
let todoList = [
    {
        task: 'Do something...',
        priority: 'important',
        date: '2025-05-15',
        notes: 'You should do something...',
        completed: false
    }
];
let isEditing = false;
let currentTodo = null;

// On mount
    // Get created todo list from local storage when website refreshed or closed
    const storedTodoList = localStorage.getItem('todoList');

if(storedTodoList) {
    todoList = JSON.parse(storedTodoList);
}


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
const saveTodoList = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

const getCheckedPriority = () => {
    let priority = '';

    for (let i = 0; i < priorityInput.length; i++) {
        if(priorityInput[i].checked) {
            priority = priorityInput[i].value;
        }
    }

    return priority;
}

const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];;
}

const addTask = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const notes = notesInput.value;
    const priority = getCheckedPriority();

    if(task !== '' && priority !== '' && date !== '') {
        todoList.unshift(new Todo(task, priority, date, notes));
        saveTodoList(todoList);
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
    editIcon.classList.add('bi', 'bi-pen');
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
        saveTodoList(todoList);
    });

    todoText.textContent = todo.task;
    todoDate.textContent = todo.date;

    editIcon.addEventListener('click', () => {
        dialog.showModal();
        isEditing = true;
        currentTodo = todo;

        toggleSubmitBtnTextContent();

        taskInput.value = todo.task;
        dateInput.value = todo.date;
        notesInput.value = todo.notes;

        for (let i = 0; i < priorityInput.length; i++) {
            if(priorityInput[i].value === todo.priority) {
                priorityInput[i].checked = true;
            } else {
                priorityInput[i].checked = false;
            }
        }
    });

    removeIcon.addEventListener('click', () => {
        li.remove();

        const newTodoList = todoList.filter(item => item !== todo);
        todoList = newTodoList;

        displayTodayTask();
        displayAllTasks();
        displayImportantTask();
        displayCompletedTask();
        saveTodoList(todoList);
    });

    leftContainer.append(inputCheckbox, todoText, todoDate);
    rightContainer.append(editIcon ,removeIcon);

    li.append(leftContainer, rightContainer);

    todoContainer.append(li);
}

const displayTodayTask = () => {
    const todayDate = getTodayDate();

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

const displayOverdueTask = () => {
    const todayDate = getTodayDate();

    // Reset overdue todo list
    overdueTodoList.innerHTML = '';

    todoList.forEach((todo) => {
        if(todo.date < todayDate && todo.completed === false) {
            createTodoListElements(todo, overdueTodoList);
        }
    });
}

displayOverdueTask();

const deleteAllCompletedTasks = () => {
    const uncompletedTodoList = todoList.filter(todo => todo.completed === false);
    todoList = uncompletedTodoList;
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

const toggleSubmitBtnTextContent = () => {
    isEditing ? submitBtn.textContent = 'Save' : submitBtn.textContent = 'Submit';
}

const highlightChosenSidebarNav = (el) => {
    sidebarNavs.forEach((nav) => {
        if(nav === el) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });
}

const toggleTodoSection = (el) => {
    const targetClass = `.${el.dataset.title}Section`;

    todoSections.forEach(section => section.style.display = 'none');

    document.querySelector(targetClass).style.display = 'flex';
}


// Event Listeners
sidebarNavs.forEach((nav) => {
    nav.addEventListener('click', function() {
        highlightChosenSidebarNav(this);
        toggleTodoSection(this);
    });
});

addTaskBtns.forEach((addTaskBtn) => {
    addTaskBtn.addEventListener('click', () => {
        dialog.showModal();
    });
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();

    resetDialogInput();
    isEditing = false;
    currentTodo = null;
    toggleSubmitBtnTextContent();

    dialog.close();
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const task = taskInput.value;
    const date = dateInput.value;
    const notes = notesInput.value;
    const priority = getCheckedPriority();

    if (task && date && priority) {
        if (isEditing && currentTodo) {
            currentTodo.task = task;
            currentTodo.date = date;
            currentTodo.notes = notes;
            currentTodo.priority = priority;
        } else {
            addTask();
        }

        displayTodayTask();
        displayAllTasks();
        displayImportantTask();
        displayCompletedTask();
        saveTodoList(todoList);

        resetDialogInput();
        dialog.close();
        isEditing = false;
        currentTodo = null;
        toggleSubmitBtnTextContent();
    }
});

deleteAllTasksBtn.addEventListener('click', () => {
    deleteAllCompletedTasks();

    displayTodayTask();
    displayAllTasks();
    displayImportantTask();
    displayCompletedTask();

    saveTodoList(todoList);
});

avatar.addEventListener('click', (e) => {
    if(mediaQuery.matches) {
        e.stopPropagation();
        sidebar.style.display = 'flex';
    }
});

document.addEventListener('click', (e) => {
    if(mediaQuery.matches && !sidebar.contains(e.target) && e.target !== avatar) {
        sidebar.style.display = 'none';
    }
});

window.addEventListener('resize', () => {
    if(window.innerWidth > 768) {
        sidebar.style.display = 'flex';
    } else {
        sidebar.style.display = 'none';
    }
});