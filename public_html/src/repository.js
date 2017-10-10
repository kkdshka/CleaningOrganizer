class ScheduleRepository {
    load() {
        if (!localStorage.hasOwnProperty('schedule')) {
            throw new Error("Repository doesn't have schedule");
        } else {
            return JSON.parse(localStorage.getItem("schedule"));
        }
    }

    save(schedule) {
        let data = JSON.stringify(schedule);
        localStorage.setItem('schedule', data);
    }
    
    getNextId() {
        let id;
        if (!localStorage.hasOwnProperty('id-for-task')) {
            id = 0;
        } else {
            id = localStorage.getItem('id-for-task');
        }
        id++;
        localStorage.setItem('id-for-task', id);
        return id;
    }
}