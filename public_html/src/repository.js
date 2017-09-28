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
}