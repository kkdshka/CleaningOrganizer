importJS('../src/repository.js');
importJS('../src/schedule.js');
importJS('../src/week.js');

window.onload = () => {
    const week = new Week;
    const repository = new ScheduleRepository;
    const schedule = new Schedule(repository);

    renderSchedule(week, schedule);
}

function renderSchedule(week, schedule) {
    week.days.map((day) => {
        document.getElementById(day).value = schedule.schedule[day].map((value) => value.name).join(", ");
    });
}

document.getElementById('save').onclick = () => {
    const week = new Week;
    const repository = new ScheduleRepository;
    const schedule = new Schedule(repository);

    saveSchedule(week, schedule);
};

function saveSchedule(week, schedule) {
    let id = 0;
    const scheduleToSave = {};
    week.days.map((day) => {
        let dayly = [];
        let tasks = document.getElementById(day).value.split(", ");
        if (tasks.length > 0 && tasks[0].length > 0) {
            tasks.map((task) => {
                dayly.push({name: task, done: false, id: ++id});
            });
        }
        scheduleToSave[day] = dayly;
    });
    schedule.saveSchedule();
}