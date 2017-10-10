importJS('../src/repository.js');
importJS('../src/schedule.js');
importJS('../src/week.js');

window.onload = () => {
    const week = new Week;
    const repository = new ScheduleRepository;
    const schedule = new Schedule(repository);

    renderBlocks(week);
    renderTasks(week, schedule);
    window.setInterval(
        location.reload, 
        (1000 * 60 * 60 * 24) - week.now.getMilliseconds()
    );
};

function renderBlocks(week) {
    const parent = document.getElementById('box-wrapper');
    week.daysToRender.forEach((day) => {
       if (day === week.today) {
           createBlock(parent, week.ruDays[week.ukDays.indexOf(day)], day, true);
       }
       else {
           createBlock(parent, week.ruDays[week.ukDays.indexOf(day)], day,  false);
       }
    });
}

function createBlock(parent, ruDay, ukDay, isToday) {
    const div = document.createElement('div');
    div.className = 'box';
    if(isToday) {
        div.className += ' today';
    }
    parent.appendChild(div);
    const h3 = document.createElement('h3');
    h3.textContent = ruDay;
    div.appendChild(h3);
    const ol = document.createElement('ol');
    ol.id = ukDay;
    ol.className = 'tasks';
    div.appendChild(ol);
}

function renderTasks(week, schedule) {
    week.daysToRender.forEach((day) => {
        let parent = document.getElementById(day);
        schedule.schedule[day].map((task) => newTask(parent, task, week, schedule));
    });
}

function newTask(parent, task, week, schedule) {
    let li = document.createElement('li');
    li.textContent = task.name;
    parent.appendChild(li);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `${task.id}`);
    if (task.done) {
        checkbox.checked = true;
    }
    li.appendChild(checkbox);
    checkbox.onchange = () =>
    {
        toggleTaskState(checkbox, week, schedule);
    };
}

function toggleTaskState(check, week, schedule) {
    const newSchedule = {};
    week.days.forEach((day) => {
        const dayTasks = [];
            schedule.schedule[day].forEach((task) => {
            if (check.id == task.id) {
                task.done = !task.done;
            }
            dayTasks.push({name: task.name, done: task.done, id: task.id});
        });
        newSchedule[day] = dayTasks;
    });
    schedule.saveSchedule(newSchedule);
}
