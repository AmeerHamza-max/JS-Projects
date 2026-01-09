let taskData = {};
const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const tasks = document.querySelectorAll('.task');
let dragElement = null;

// Create a reusable function to sync DOM state to LocalStorage
const updateLocalStorage = () => {
    [todo, progress, done].forEach(col => {
        const tasksInCol = col.querySelectorAll('.task');
        const count = col.querySelector('.right');
        
        taskData[col.id] = Array.from(tasksInCol).map(t => {
            return {
                title: t.querySelector('h2').innerText,
                desc: t.querySelector('p').innerText
            };
        });

        if (count) count.innerText = tasksInCol.length;
    });
    localStorage.setItem('tasks', JSON.stringify(taskData));
};

if(localStorage.getItem('tasks')){
    const data = JSON.parse(localStorage.getItem('tasks'));
    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            const div = document.createElement('div');
            div.classList.add('task');
            div.setAttribute('draggable', 'true');
            // FIX: Loading directly from saved task object
            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button class="del-btn">Delete</button>
            `;

            column.appendChild(div);
            
            // Drag event for loaded tasks
            div.addEventListener('dragstart', () => {
                dragElement = div;
            });

            // Delete functionality for loaded tasks
            div.querySelector('.del-btn').addEventListener('click', () => {
                div.remove();
                updateLocalStorage();
            });
        })
    }
}

tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
        dragElement = task;
    });
});

const addDrageEventsOnColumn = (column) => {
    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add('hover-over');
    });

    column.addEventListener('dragleave', (e) => {
        e.preventDefault();
        column.classList.remove('hover-over');
    });

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('hover-over');
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        updateLocalStorage();
        column.classList.remove('hover-over');
    });
};

addDrageEventsOnColumn(todo);
addDrageEventsOnColumn(progress);
addDrageEventsOnColumn(done);

const toggleModalButton = document.querySelector('#toggle-modal');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.bg');
const addTaskButton = document.querySelector('.add-task-btn'); // targeted by class to avoid conflict

toggleModalButton.addEventListener('click', () => {
    modal.classList.toggle('active');
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('active');
});

addTaskButton.addEventListener('click', () => {
    let tasktitle = document.querySelector('#task-title-input').value;
    let taskDesc = document.querySelector('#task-desc-input').value;

    // Stop empty tasks
    if(tasktitle.trim() === "") return;

    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('draggable', 'true');

    div.innerHTML = `
        <h2>${tasktitle}</h2>
        <p>${taskDesc}</p>
        <button class="del-btn">Delete</button>
    `;

    todo.appendChild(div);
    updateLocalStorage();

    div.addEventListener('dragstart', () => {
        dragElement = div;
    });

    // Delete functionality for new tasks
    div.querySelector('.del-btn').addEventListener('click', () => {
        div.remove();
        updateLocalStorage();
    });

    document.querySelector('#task-title-input').value = '';
    document.querySelector('#task-desc-input').value = '';
    modal.classList.remove('active');
});