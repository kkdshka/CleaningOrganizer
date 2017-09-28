class Schedule {
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
        this._schedule = {
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
    }

    get schedule() {
        try {
            this.loadSchedule();
        }
        catch(e) {
            console.log('Это стандартный график. Поменяйте параметры и сохраните.');
            return this._schedule;
        }
        return this._schedule;
    }
    
    loadSchedule() {
        this._schedule = this.scheduleRepository.load();
    }

    saveSchedule(schedule) {
        this.scheduleRepository.save(schedule);
    }
} 