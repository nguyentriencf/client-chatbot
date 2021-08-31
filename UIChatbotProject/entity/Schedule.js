export class Schedule {
    constructor(thu,morning,afternoon,evening){
        this.thu = thu;
        this.morning = morning;
        this.afternoon = afternoon;
        this.evening = evening;
    }
    get thu() {
        return this.thu;
    }
    get morning(){
        return this.morning;
    }
    get afternoon(){
        return this.afternoon;
    }
    get evening(){
        return this.evening;
    }
}


