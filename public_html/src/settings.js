const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const defaultSchedule = {
    monday: [
        {name: "раковины", done: false, id: 1},
        {name: "унитаз", done: false, id: 2},
        {name: "ванная", done: false, id: 3}
    ],
    tuesday: [
        {name: "плита", done: false, id: 4},
        {name: "микроволновка", done: false, id: 5},
        {name: "поверхности", done: false, id: 6}
    ],
    wednesday: [
        {name: "мусор", done: false, id: 7}
    ],
    thursday: [
        {name: "полы", done: false, id: 8}
    ],
    friday: [
        {name: "полотенца", done: false, id: 9},
        {name: "постельное", done: false, id: 10}
    ],
    saturday: [],
    sunday: []
};

window.onload = () => loadSchedule();

function loadSchedule() {
    if (!localStorage.hasOwnProperty('schedule')) {
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

document.getElementById('save').onclick = () => saveSchedule();

function saveSchedule() {
    let id = 0;
    const schedule = {};
    days.map((day) => {
        let dayly = [];
        let tasks = document.getElementById(day).value.split(", ");
        if (tasks.length > 0 && tasks[0].length > 0) {
            tasks.map((task) => {
                dayly.push({name: task, done: false, id: ++id});
            });
        }
        schedule[day] = dayly;
    });
    let data = JSON.stringify(schedule);
    localStorage.setItem('schedule', data);
}