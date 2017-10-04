importJS('../src/repository.js');
importJS('../src/schedule.js');
importJS('../src/week.js');

window.onload = () => {
    const week = new Week;
    const repository = new ScheduleRepository;
    const schedule = new Schedule(repository);

    renderSchedule(week, schedule);
    const addButtons = [...document.querySelectorAll('input.add-task')];

    addButtons.map((node) => {
        node.onclick = (event) => {
            addField(node.parentNode, node);
            event.preventDefault();
        };
    });
    
    const deleteButtons = [...document.querySelectorAll('input.delete-task')];
    
    deleteButtons.map((node) => {
        node.onclick = (event) => {
            node.parentNode.remove();
            event.preventDefault();
        };
    });
};

function renderSchedule(week, schedule) {
    week.days.map((day) => {
        const parent = document.getElementById(day);
        const add = parent.getElementsByClassName("add-task")[0];
        schedule.schedule[day].map((value) => {
            addField(parent, add, value.name);
        });
    });
}

document.getElementById('save').onclick = () => {
    const week = new Week;
    const repository = new ScheduleRepository;
    const schedule = new Schedule(repository);

    saveSchedule(week, schedule);
};

function saveSchedule(week, schedule) {
    const scheduleToSave = {};
    let id = 0;
    week.days.map((day) => {
        const dayly = [];
        const tasks = [...document.querySelectorAll(`#${day} .task`)];
        tasks.map((task) => {
            dayly.push({name: task.value, done: false, id: ++id});
        });
        scheduleToSave[day] = dayly;
    });
    schedule.saveSchedule(scheduleToSave);
}

function addField(parentElement, referenceElement, value = '') {
    const box = document.createElement('div');
    box.className = 'field-box';
    parentElement.insertBefore(box, referenceElement);
    
    const field = createField(value);
    box.appendChild(field);
    
    const del = createDeleteButton();
    box.appendChild(del);
}

function createField(value = '') {
    const field = document.createElement('input');
    field.type = 'text';
    field.value = value;
    field.className = 'task';
    return field;
}

function createDeleteButton() {
    const button = document.createElement('input');
    button.type = 'image';
    button.alt = 'Del';
    button.src = '../img/delete.png';
    button.className = 'delete-task';
    return button;
}