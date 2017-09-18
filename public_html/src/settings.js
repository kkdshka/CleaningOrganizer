const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const defaultSchedule = {
    monday: [
        {name: "раковины", done: false},
        {name: "унитаз", done: false},
        {name: "ванная", done: false}
    ],
    tuesday: [
        {name: "плита", done: false},
        {name: "микроволновка", done: false},
        {name: "поверхности", done: false}
    ],
    wednesday: [
        {name: "мусор", done: false}
    ],
    thursday: [
        {name: "полы", done: false}
    ],
    friday: [
        {name: "полотенца", done: false},
        {name: "постельное", done: false}
    ],
    saturday: [],
    sunday: []
};

window.onload = () => loadSchedule();

function loadSchedule() {
    if (localStorage.hasOwnProperty('schedule')) {
        setSchedule(defaultSchedule);
    } else {
        let schedule = JSON.parse(localStorage.getItem("schedule"));
        setSchedule(schedule);
    }
}

function setSchedule(schedule) {
    days.map((day) => {
        document.getElementById(day).value = schedule[day].map((value) => value.name).join(", ");
    });
}

save.onclick = () => saveSchedule();

function saveSchedule() {
    const schedule = {};
    days.map((day) => {
        let dayly = [];
        let tasks = document.getElementById(day).value.split(", ");
        if (tasks.length > 0 && tasks[0].length > 0) {
            tasks.map((task) => {
                dayly.push({name: task, done: false});
            });
        }
        schedule[day] = dayly;
    });
    let data = JSON.stringify(schedule);
    localStorage.setItem('schedule', data);
}