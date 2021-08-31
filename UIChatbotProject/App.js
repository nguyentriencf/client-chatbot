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
    this.state={arrMessage:[]}
    //https://chatbot-dlu.herokuapp.com
  
    this.socket = io("http://localhost:5000", {
      transports: ["websocket", "polling", "flashsocket"],
      jsonp: false,
    });
    this.socket.on("connect", () => {
      console.log("socket connected from server chatbot-dlu");   
    });

     this.socket.on("send-schedule", (data) => {
         const newMess = {mine:false , text:data};
       });
        function renderSchedule(data) {
          const [, ...filterData] = [...data];
          for(const[key,value] of Object.entries(filterData)){
            console.log(typeof value);
            const{fir,...last} = value
            for(const[key,value] of Object.entries(last)){
              console.log(value);
            }
          }
        }

        renderSchedule([
          1,
          {
            0: "Thứ 3",
            Sáng: "",
            Chiều:
              "-Môn: Hệ quản trị cơ sở dữ liệu (CT4218D)-Nhóm: 01-Lớp: CTK42-PM-Tiết: 7->10-Phòng: A31.105-GV: Đoàn Minh Khuê-Đã học: 0/30 tiết",
            Tối: "",
          },
        ]);
  }

  render() {
const message = { mine:true, text:''};

const show = {
  display: "none",
};

const addMessage = (message) =>{
  this.state.arrMessage.push(message)
}

const sendMessageReducer = (state=message, action)=>{
  if(action.type === 'SEND_MESSAGE') {
 
    const newMess = {mine:state.mine , text:state.text};
      //input
      this.socket.emit("scheduleWeek", "thời khóa biểu tuần này");
       addMessage(newMess);
       add_view();
   return {mine:state.mine , text:state.text};
  }
  // else{
    
  //   return {mine:state.mine , text:state.text};
  // }
  return   {mine:state.mine , text:state.text};;
}


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
  sendMessageReducer
});

const add_view = () =>{
  this.setState({ arrMessage :this.state.arrMessage});
}

const store = createStore(reducer);


   let renderMessage = 
     this.state.arrMessage.map((item,key) => {
       if(item.mine){
        return (
        <MessageBubble key ={key}
             mine
             text = {"Thứ 2 :\nSáng: không có tiết\n"+
              "Chiều:\n-Môn: Giao tiếp trong kinh doanh (QT2008D)\n"+
                     "-Nhóm: 01-Lớp: QTK43A\n-Tiết: 7->9\n"+
                           "-Phòng: A27.06\n"+
                           "-GV: Hoàng Đức Lâm\n"+
                           "-Đã học: 19/45 tiết\n"+
                      "Tối: không có tiết"}      
          />  
        );
       }
       return (
        <MessageBubble key={key}
           not_mine
           text = {item.text}
        />
      );  
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
              <ScrollView showsVerticalScrollIndicator ={false} style={styles.scrollView}  
               ref={ref => {this.scrollView = ref}}
               onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
               >      
                {renderMessage}  
              </ScrollView>
            </View>
           
            <View style={styles.footer} >
              <Input />
              <Send/>
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
    justifyContent: "center"
  },
  footer: {
    flex: 0.8 ,
    backgroundColor:"#1D1F2C"
   
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
    marginHorizontal: 10
   
  },
  textHeader: {
    color: "white",
    fontSize: 20,
    marginTop: 25,
  },
  ViewOnline: {
    flexDirection: "row",
    alignItems: "center"
  },
  textOnline: {
    color: "#777980",
    fontSize: 14,
    left: -10,
    position:'relative'
  },
});
