import { Schedule } from "../entities/Schedule";
import { ScheduleComponent } from "../entities/ScheduleComponent";

   const HAS_SCHEDULE=  1 ;
   const NO_SCHEDULE=  0 ;
   const MONRING = "sáng";
   const AFTERNOON ="chiều";
   const EVENING ="Tối";
   const NO_CLASS ="không có tiết";
   
export function renderSchedule(data) {

        const [, ...filterData] = [...data];
        const arrMessage = [];
        let messageBot =""; 

        for (const [key, value] of Object.entries(filterData)) {
        
        const { 0: thu, ...rest } = value;
        const schedule = new Schedule();
        
        for (const [key, value] of Object.entries(rest)) {
        
        const noon = key.toLocaleLowerCase();
        const scheduleComponent  = filterTitle(value);
        const isSchedule = hasShedule(scheduleComponent); 
        initNoon(schedule, isSchedule , thu, scheduleComponent, noon);        
        }
           
        const messageMonning = schedule.thu +":\n"+
                                         "Sáng:";
        const scheduleMorning = schedule.morning !== "không có tiết" ? 
                                "\n-Môn: " + schedule.morning.mon+"\n"+
                                "-Nhóm: "+ schedule.morning.nhom+"\n"+
                                "-Tiết: "+ schedule.morning.tiet+"\n"+
                                "-Phòng: "+ schedule.morning.phong+"\n"+
                                "-GV: "+ schedule.morning.gv+"\n"+
                                "-Đã học: "+ schedule.morning.dahoc+"\n"
                                : " không có tiết\n";
            messageMonning += scheduleMorning;

        const messageBotAfternoon = "Chiều:";
        const scheduleAfterNoon = schedule.afternoon !== "không có tiết" ? 
                                  "\n-Môn: " + schedule.afternoon.mon+"\n"+
                                  "-Nhóm: "+ schedule.afternoon.nhom+"\n"+
                                  "-Tiết: "+ schedule.afternoon.tiet+"\n"+
                                  "-Phòng: "+ schedule.afternoon.phong+"\n"+
                                  "-GV: "+ schedule.afternoon.gv+"\n"+
                                  "-Đã học: "+ schedule.afternoon.dahoc+"\n"
                                  : " không có tiết\n";  
            messageBotAfternoon += scheduleAfterNoon;

        const messageBotEvening = "Tối:";
        const scheduleEvening = schedule.evening !== "không có tiết" ? 
                                "\n-Môn: " + schedule.evening.mon+"\n"+
                                "-Nhóm: "+ schedule.evening.nhom+"\n"+
                                "-Tiết: "+ schedule.evening.tiet+"\n"+
                                "-Phòng: "+ schedule.evening.phong+"\n"+
                                "-GV: "+ schedule.evening.gv+"\n"+
                                "-Đã học: "+ schedule.evening.dahoc+"\n"
                                : " không có tiết\n";  
            messageBotEvening += scheduleEvening;
  
            messageBot = messageMonning + messageBotAfternoon + messageBotEvening;
    
        const scheduleMess = { mine: false, text: messageBot };  
        arrMessage.push(scheduleMess);
        }
        return arrMessage;
      }
      
     function hasShedule(schedule){
        if (typeof schedule !== String) {
                  return HAS_SCHEDULE;
        }else{
          return NO_SCHEDULE;
        }
         
     }

      function initNoon(schedule, flag, thu, scheduleComponent, noon) {
        switch (flag) {
          case NO_SCHEDULE: {
              schedule.setThu(thu);
            if (noon === MONRING) {
              schedule.displayMorningNoon(scheduleComponent);
            } else if (noon === AFTERNOON) {
              schedule.displayAfternoonNoon(scheduleComponent);
            } else {
              schedule.displayEveningNoon(scheduleComponent);
            }
            break;
          }
          case HAS_SCHEDULE: {
              schedule.setThu(thu);
            if (noon === MONRING) {
              schedule.setMorning(scheduleComponent);
            } else if (noon === AFTERNOON) {
              schedule.setAfternoon(scheduleComponent);
            } else {
              schedule.setEvening(scheduleComponent);
            }
            break;
          }
        }
      }
      
      function repalceTitleToComma(value){

        const filter = /-Môn: |-Nhóm: |-Lớp: |-Tiết: |-Phòng: |-GV: |-Đã học: /gi;
        const strFilter = value.replace(filter, function (x) {
            return (x = ",");

          });
         return strFilter; 
      }
      function filterTitle(value) {
        let strFilter;
        let scheduleComponent;
        if (value !== "") {    
        
            if (value.includes("-Nhóm: ")) {
               strFilter = repalceTitleToComma(value);
               scheduleComponent= initSchedule(strFilter);
            }
            else {
               strFilter = repalceTitleToComma(value);
               scheduleComponent= initSchedule(strFilter);
             }
             return scheduleComponent;
            }
            else{
                strFilter = NO_CLASS;
            }
            return strFilter;
        }
   

     function initSchedule(scheduleFilter) {
     
        const items = scheduleFilter.split(",");
        console.log(scheduleFilter);
        // ScheduleComponent(mon,lop,tiet,phong,gv,dahoc,nhom = "");
        if (items.length >= 8) {
          
          const scheduleComponent = new ScheduleComponent(
            items[1],
            items[3],
            items[4],
            items[5],
            items[6],
            items[7],
            items[2]
          );
          return scheduleComponent;
        } else {
          const scheduleComponent = new ScheduleComponent(
            items[1],
            items[2],
            items[3],
            items[4],
            items[5],
            items[6]
          );
          return scheduleComponent;
        }
      }