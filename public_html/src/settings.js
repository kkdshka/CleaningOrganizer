const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const defaultSchedule = {
    monday: "Раковины, унитаз, ванная, кошачьи горшки",
    tuesday: "Плита, микроволновка, поверхности",
    wednesday: "Мусор",
    thursday: "Полы, кошачьи горшки",
    friday: "Полотенца, постельное",
    saturday: "",
    sunday: ""
};

window.onload = () => loadSchedule();

function loadSchedule() {
    if (!localStorage.hasOwnProperty('schedule')) {
        days.map((day) => {
            document.getElementById(day).value = defaultSchedule[day];
        });
    } else {
        let schedule = JSON.parse(localStorage.getItem("schedule"));
        days.map((day) => {
            document.getElementById(day).value = schedule[day];
        });
    }
}

save.onclick = () => saveSchedule();

function saveSchedule() {
    const schedule = {};
    days.map((day) => {
        schedule[day] = document.getElementById(day).value;
    });
    let data = JSON.stringify(schedule);
    localStorage.setItem('schedule', data);
}

