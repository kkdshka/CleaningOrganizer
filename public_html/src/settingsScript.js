importJS('../src/repository.js');
importJS('../src/schedule.js');
importJS('../src/week.js');

window.onload = () => {
    const week = new Week;
    const repository = new ScheduleRepository;
    const schedule = new Schedule(repository);

    renderSchedule(week, schedule);
    const addButtons = [...document.querySelectorAll('input.add-task')];

    document.getElementById('save').onclick = () => {
        saveSchedule(week, schedule, repository);
    };
    addButtons.forEach((node) => {
        node.onclick = (event) => {
            addField(node.parentNode, node);
            event.preventDefault();
        };
    });

    const deleteButtons = [...document.querySelectorAll('input.delete-task')];

    deleteButtons.forEach((node) => {
        node.onclick = (event) => {
            node.parentNode.remove();
            event.preventDefault();
        };
    });
};

function renderSchedule(week, schedule) {
    week.days.forEach((day) => {
        const parent = document.getElementById(day);
        const addButton = parent.getElementsByClassName("add-task")[0];
        schedule.schedule[day].forEach((task) => {
            addField(parent, addButton, task.name);
        });
    });
}

function saveSchedule(week, schedule, repo) {
    const scheduleToSave = {};
    week.days.forEach((day) => {
        const dayTasks = [];
        const tasks = [...document.querySelectorAll(`#${day} .task`)];
        tasks.forEach((task) => {
            if (task.value !== '') {
                dayTasks.push({
                    name: task.value,
                    done: findStatus(task.value, day),
                    id: repo.getNextId()
                });
            }
        });
        scheduleToSave[day] = dayTasks;
    });
    schedule.saveSchedule(scheduleToSave);

    function findStatus(taskName, day) {
        const task = schedule.schedule[day].filter(task => taskName === task.name);
        if(task[0].done) {
            return true;
        }
        return false;
    }
}

function addField(parentElement, referenceElement, value = '') {
    const box = document.createElement('div');
    box.className = 'field-box';
    parentElement.insertBefore(box, referenceElement);

    const field = createField(value);
    box.appendChild(field);

    const del = createDeleteButton();
    box.appendChild(del);

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
}