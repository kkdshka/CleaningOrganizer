const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const schedule = JSON.parse(localStorage.getItem("schedule"));

window.onload = () => renderList();

function renderList() {
    days.map((day) => {
        let parent = document.getElementById(day);
        schedule[day].map((task) => newLi(parent, task));
    });
}

function newLi(parent, task) {
    let newLi = document.createElement('li');
    newLi.innerHTML = task.name;
    parent.appendChild(newLi);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `${task.id}`);
    if (task.done) {
        checkbox.checked = true;
    }
    newLi.appendChild(checkbox);
    checkbox.onchange = () =>
            {
                saveChecked(checkbox);
            };
}

function saveChecked(check) {
    days.forEach((day) => {
        schedule[day].forEach((task) => {
            console.log(check.id + ' ' + task.id);
            if (check.id == task.id) {
                task.done = !task.done;
            }
        });
    });
    let data = JSON.stringify(schedule);
    localStorage.setItem('schedule', data);
    console.log(data);
}
