importJS('../src/repository.js');
importJS('../src/schedule.js');
importJS('../src/week.js');

window.onload = () => {
    const week = new Week;
    const repository = new ScheduleRepository;
    const schedule = new Schedule(repository);

    renderList(week, schedule);
    window.setInterval(() =>
    location.reload(), (1000 * 60 * 60 * 24) - week.now.getMilliseconds());
};

function renderList(week, schedule) {
    week.days.map((day) => {
        let parent = document.getElementById(day);
        if (parent.id === week.today) {
            parent.parentElement.setAttribute('class', 'box today');
        }
        schedule.schedule[day].map((task) => newLi(parent, task, week, schedule));
    });
}

function newLi(parent, task, week, schedule) {
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
        saveChecked(checkbox, week, schedule);
    };
}

function saveChecked(check, week, schedule) {
    week.days.forEach((day) => {
        schedule.schedule[day].forEach((task) => {
            if (check.id == task.id) {
                task.done = !task.done;
            }
        });
    });
    schedule.saveSchedule();
}