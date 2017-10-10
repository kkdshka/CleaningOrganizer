class Week {
    constructor() {
        this._days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        this._ukDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        this._ruDays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    }

    get ruDays() {
        return this._ruDays;
    }
    
    get ukDays() {
        return this._ukDays;
    }

    get today() {
        return this._ukDays[this.now.getDay()];
    }

    get days() {
        return this._days;
    }

    get now() {
        return new Date();
    }

    getDateBefore(date) {
        return new Date((date.setDate(date.getDate() - 1)));
    }

    getDateAfter(date) {
        return new Date((date.setDate(date.getDate() + 1)));
    }

    getDateName(date) {
        return this._ukDays[date.getDay()];
    }

    get daysToRender() {
        return [
            this.getDateName(this.getDateBefore(this.getDateBefore(this.now))),
            this.getDateName((this.getDateBefore(this.now))),
            this.today,
            this.getDateName((this.getDateAfter(this.now))),
            this.getDateName(this.getDateAfter(this.getDateAfter(this.now)))
        ];
    }
}