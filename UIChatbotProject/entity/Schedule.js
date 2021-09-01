export class Schedule {
  thu() {
    return this.thu;
  }
  morning() {
    return this.morning;
  }
  afternoon() {
    return this.afternoon;
  }
  evening() {
    return this.evening;
  }
  setThu(thu) {
    this.thu = thu;
  }
  setMorning(morning) {
    this.morning = morning;
  }
  setAfternoon(afternoon) {
    this.afternoon = afternoon;
  }
  setEvening(evening) {
    this.evening = evening;
  }
  displayMorningNoon(text) {
    this.emptyMorning = text;
  }
  displayAfternoonNoon(text) {
    this.emptyAfternoon = text;
  }
  displayEveningNoon(text) {
    this.emptyEveningNoon = text;
  }

}


