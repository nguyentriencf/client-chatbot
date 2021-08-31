export class ScheduleComponent {
    constructor(mon,nhom, tiet,phong,gv, dahoc){
        this.mon = mon;
        this.nhom =nhom;
        this.tiet= tiet;
        this.phong= phong;
        this.gv= gv;
        this.dahoc =dahoc;
    }
    get mon(){
        return this.mon
    }
    get nhom(){
        return this.nhom;
    }
    get tiet(){
        return this.tiet;
    }
    get phong() {
        return this.phong;
    }
    get gv() {
        return this.gv;
    }
    get dahoc() {
        return this.dahoc;
    }
}
