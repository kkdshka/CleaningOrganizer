const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const schedule = JSON.parse(localStorage.getItem("schedule"));

window.onload = () => renderList();

function renderList() {
    days.map((day) => {
        let parent = document.getElementById(day);
        schedule[day].map((value) => newLi(parent, value.name));
    });
}

function newLi(parent, text) {
    let newLi = document.createElement('li');
    newLi.innerHTML = text;
    parent.appendChild(newLi);
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    newLi.appendChild(checkbox);
}