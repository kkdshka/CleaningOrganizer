class Week {
    constructor() {
        this._days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        this.ukDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    }

    get today() {
        return this.ukDays[this.now.getDay()];
    }

    get days() {
        return this._days;
    }
    
    get now() {
        return new Date();
    }
}