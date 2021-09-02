import { StatusBar } from "expo-status-bar";
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import MessageBubble from "./components/MessageBubble";
import { BlurView } from "expo-blur";
import { Entypo } from "@expo/vector-icons";
import Input from "./components/Input";
import Send from "./components/Send";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { combineReducers } from "redux";
import { Schedule } from "./entity/Schedule";
import { ScheduleComponent } from "./entity/ScheduleComponent";

// socket-client
const io = require("socket.io-client/dist/socket.io.js");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      arrMessage: [], 
      data:[]
       };
   // this.getDataStorage();
       this.removeDataStorage();
       AsyncStorage.removeItem('mssv');
    //https://chatbot-dlu.herokuapp.com

    this.socket = io("http://localhost:5000", {
      transports: ["websocket", "polling", "flashsocket"],
      jsonp: false,
    });
    this.socket.on("connect", () => {
      console.log("socket connected from server chatbot-dlu");
    });

    this.socket.on("send-schedule", (data) => {
      if(Array.isArray(data)){
         console.log("Fdf");
        const messageBots= this.renderSchedule(data);
        messageBots.forEach(e=>{
          this.renderFromBot(e.text);
        })
      }else{
       this.renderFromBot(data);
      }
     
    });
  }
    removeDataStorage = () =>{
      AsyncStorage.removeItem('data');
    }
    getDataStorage = ()=>{
      AsyncStorage.multiGet(['data'],(err, stores)=>{ 
          if(stores !== null){  
             
           stores.map((result,i,store)=>{   
              if (store[i][1] !== null){
               let items = JSON.parse(store[i][1]);  
               items.forEach(el =>{
                 this.state.arrMessage.push(el);
                 this.setState({ arrMessage :this.state.arrMessage});
               })      
              }
           })
          }else{
           console.log("empty");
          }  
          if(err){
            console.log(err.message);
          } 
       }
       );
   }
   setDataStorage = async (arrMessage)=>{
      let item = ['data',JSON.stringify(arrMessage)];
             await AsyncStorage.multiSet([item]);
   }
   setMSSVDataStorage = async (mssv)=>{
    let value = ['mssv',JSON.stringify(mssv)];
           await AsyncStorage.multiSet([value]);
 }
 getMSSVDataStorage = ()=>{
   const mssv = AsyncStorage.multiGet(['mssv']);
    return mssv;
}
 TryParseInt(str,defaultValue) {
  var retValue = defaultValue;
  if(str !== null) {
      if(str.length > 0) {
          if (!isNaN(str)) {
              retValue = parseInt(str);
          }
      }
  }
  return retValue;
}
     renderSchedule(data) {
      const [, ...filterData] = [...data];
      const arrMessage = [];
      for (const [key, value] of Object.entries(filterData)) {
        const { 0: thu, ...rest } = value;

        const schedule = new Schedule();
        for (const [key, value] of Object.entries(rest)) {
          const noon = key.toLocaleLowerCase();
          const scheduleComponent = this.initSche(key, value);
          if (typeof scheduleComponent !== String) {
            this.checkNoon(schedule, 0, thu, scheduleComponent, noon);
          } else {
            this.checkNoon(schedule, 1, thu, scheduleComponent, noon);
          }
        }
      
      const messageBot =""; 
      const messageMonning = schedule.thu +":\n"+
                                       "Sáng:";
      const scheduleDetailMorning = schedule.morning !== "không có tiết" ? 
                                     "\n-Môn: " + schedule.morning.mon+"\n"+
                                     "-Nhóm: "+ schedule.morning.nhom+"\n"+
                                     "-Tiết: "+ schedule.morning.tiet+"\n"+
                                     "-Phòng: "+ schedule.morning.phong+"\n"+
                                     "-GV: "+ schedule.morning.gv+"\n"+
                                     "-Đã học: "+ schedule.morning.dahoc+"\n"
                                                        : " không có tiết\n";
          messageMonning += scheduleDetailMorning;
     const messageBotAfternoon = "Chiều:";
     const scheduleDetailAfterNoon = schedule.afternoon !== "không có tiết" ? 
                                "\n-Môn: " + schedule.afternoon.mon+"\n"+
                                "-Nhóm: "+ schedule.afternoon.nhom+"\n"+
                                "-Tiết: "+ schedule.afternoon.tiet+"\n"+
                                "-Phòng: "+ schedule.afternoon.phong+"\n"+
                                "-GV: "+ schedule.afternoon.gv+"\n"+
                                "-Đã học: "+ schedule.afternoon.dahoc+"\n"
                             : " không có tiết\n";  
          messageBotAfternoon += scheduleDetailAfterNoon;
    const messageBotEvening = "Tối:";
    const scheduleDetailEvening = schedule.evening !== "không có tiết" ? 
                             "\n-Môn: " + schedule.evening.mon+"\n"+
                             "-Nhóm: "+ schedule.evening.nhom+"\n"+
                             "-Tiết: "+ schedule.evening.tiet+"\n"+
                             "-Phòng: "+ schedule.evening.phong+"\n"+
                             "-GV: "+ schedule.evening.gv+"\n"+
                             "-Đã học: "+ schedule.evening.dahoc+"\n"
                              : " không có tiết\n";  
          messageBotEvening += scheduleDetailEvening;

          messageBot = messageMonning + messageBotAfternoon + messageBotEvening;
  
      const newMess = { mine: false, text: messageBot };  
      arrMessage.push(newMess);
      }
      return arrMessage;
    }

     checkNoon(schedule, flag, thu, scheduleComponent, noon) {
      switch (flag) {
        case 0: {
          schedule.setThu(thu);
          if (noon === "sáng") {
            schedule.setMorning(scheduleComponent);
          } else if (noon === "chiều") {
            schedule.setAfternoon(scheduleComponent);
          } else {
            schedule.setEvening(scheduleComponent);
          }
          break;
        }
        case 1: {
          schedule.setThu(thu);
          if (noon === "sáng") {
            schedule.displayMorningNoon(scheduleComponent);
          } else if (noon === "chiều") {
            schedule.displayAfternoonNoon(scheduleComponent);
          } else {
            schedule.displayEveningNoon(scheduleComponent);
          }
          break;
        }
      }
    }
   
     initSche(key, value) {
      const filter = /-Môn: |-Nhóm: |-Lớp: |-Tiết: |-Phòng: |-GV: |-Đã học: /gi;

      if (value !== "") {
        if (value.includes("-Nhóm: ")) {
          const strFilter = value.replace(filter, function (x) {
            return (x = ",");
          });
          const scheduleComponent = this.initClass(strFilter);
          return scheduleComponent;
        } else {
          const strFilter = value.replace(filter, function (x) {
            return (x = ",");
          });
          const scheduleComponent = this.initClass(strFilter);
          return scheduleComponent;
        }
      } else return "không có tiết";
    }

     initClass(strFilter) {
      const arrScheComp = strFilter.split(",");
      if (arrScheComp.length >= 8) {
        const scheduleComponent = new ScheduleComponent(
          arrScheComp[1],
          arrScheComp[3],
          arrScheComp[4],
          arrScheComp[5],
          arrScheComp[6],
          arrScheComp[7],
          arrScheComp[2]
        );
        return scheduleComponent;
      } else {
        const scheduleComponent = new ScheduleComponent(
          arrScheComp[1],
          arrScheComp[2],
          arrScheComp[3],
          arrScheComp[4],
          arrScheComp[5],
          arrScheComp[6]
        );
        return scheduleComponent;
      }
    }
    
     addMessage = async (message) =>{
      this.state.arrMessage.push(message);
      await this.setDataStorage(this.state.arrMessage);
    }
    add_view() {
      this.setState({ arrMessage: this.state.arrMessage });
    };
   checkExistMssv(mssv){
    if(mssv !== null){
       console.log(mssv);
       let value =null;
      mssv.map((result,i,store)=>{   
         if (store[i][1] !== null){
           console.log("io");
         value =store[i][1];   
         }
      })
      return value;
     }
      return null;       
     
   }
   renderFromUser(isMine, text){
    const newMess = { mine: isMine, text: text };
    this.addMessage(newMess);
    this.add_view();
   }

   renderFromBot(text){
    const newMess = { mine: false, text: text };
    this.addMessage(newMess);
    this.add_view();
   }
  render() {
    const message = { mine: true, text: "" };

    const show = {
      display: "none",
    };
    const sendMessageReducer =  (state = message, action) => {
      if (action.type === "SEND_MESSAGE") {
        if(state.text.trim() === ""){
          return;
        }
        const isMssv =  this.TryParseInt(state.text.trim(),0);

        this.renderFromUser(state.mine,state.text);

        if(isMssv !== 0 && isMssv !== null){
           if(isMssv.toString().length === 7)
      {
        this.getMSSVDataStorage().then(kq =>{
          const existMssv = this.checkExistMssv(kq);
          
          if(existMssv !== null){
                 this.renderFromBot("tôi không hiểu ý bạn!" );
          }else{
                this.setMSSVDataStorage(isMssv);
                 this.renderFromBot("Xin chào\nBạn đã có thể xem được thời khóa biểu!");
          }
        });
       
      }else{
          this.renderFromBot("MSSV phải 7 chữ số!");
        }
        return { mine: state.mine, text: state.text };
      }
       // check input
       this.getMSSVDataStorage().then(kq =>{
        const existMssv = this.checkExistMssv(kq);
        if(existMssv === null){
          this.renderFromBot("Bạn phải cung cấp MSSV trước khi xem thời khóa biểu(vd:1812866)!");
   }else{ 
           this.socket.emit("scheduleWeek", {mssv:existMssv , message:state.text.trim()});  
   } 
      });

       
        return { mine: state.mine, text: state.text };
      }
      return { mine: state.mine, text: state.text };
    };

    const displaysReducer = (state = show, action) => {
      if (action.type === "SHOW") {
        return { display: (state.display = "flex") };
      }
      if (action.type === "NONE") {
        return { display: (state.display = "none") };
      }
      return state;
    };
    const reducer = combineReducers({
      displaysReducer,
      sendMessageReducer,
    });

    
    const store = createStore(reducer);

    let renderMessage = this.state.arrMessage.map((item, key) => {
      if (item.mine) {
        return (
          <MessageBubble
            key={key}
            mine
            text={
              item.text
            }
          />
        );
      }
      return <MessageBubble key={key} not_mine text={item.text} />;
    });

    return (
      <Provider store={store}>
        <LinearGradient
          style={styles.container}
          colors={["#1E222D", "#1E212C", "#1C1F2A"]}
        >
          <KeyboardAvoidingView
            style={styles.voidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.header}>
              <Text style={styles.textHeader}>Dlu bot</Text>
              <View style={styles.ViewOnline}>
                <Entypo name="dot-single" size={34} color="#A0DEAC" />
                <Text style={styles.textOnline}>Online</Text>
              </View>
            </View>
            <View style={styles.body}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                ref={(ref) => {
                  this.scrollView = ref;
                }}
                onContentSizeChange={() =>
                  this.scrollView.scrollToEnd({ animated: true })
                }
              >
                {renderMessage}
              </ScrollView>
            </View>

            <View style={styles.footer}>
              <Input />
              <Send />
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </Provider>
    );
  }
}


export default App;
const styles = StyleSheet.create({
  voidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  footer: {
    flex: 0.8,
    backgroundColor: "#1D1F2C",
  },
  header: {
    flex: 1.8,
    backgroundColor: "#1D1F2C",
    alignItems: "center",
  },
  body: {
    flex: 7.7,
    backgroundColor: "#1D1F2C",
  },
  scrollView: {
    marginHorizontal: 10,
  },
  textHeader: {
    color: "white",
    fontSize: 20,
    marginTop: 25,
  },
  ViewOnline: {
    flexDirection: "row",
    alignItems: "center",
  },
  textOnline: {
    color: "#777980",
    fontSize: 14,
    left: -10,
    position: "relative",
  },
});
