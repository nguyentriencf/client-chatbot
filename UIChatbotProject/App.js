import { StatusBar } from "expo-status-bar";
import React from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform
   
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

const io = require("socket.io-client/dist/socket.io.js");

class App extends React.Component {


  constructor(props) {
    super(props);
    //{ mine:true , text:"hello"} ,{mine:false , text:"hi from bot"}
    this.state={
      arrMessage:[],
      data:[]
    }
      this.getDataStorage();
     this.removeDataStorage();
    //https://chatbot-dlu.herokuapp.com
  
    this.socket = io("http://localhost:5000", {
      transports: ["websocket", "polling", "flashsocket"],
      jsonp: false,
    });
    this.socket.on("connect", () => {
      console.log("socket connected from server chatbot-dlu");   
    });

     this.socket.on("send-schedule", (data) => {
         console.log(data);
         //const newMess = {mine:false , text:data};
       });
  }
   
  removeDataStorage = () =>{
    AsyncStorage.removeItem('data');
  }

  getDataStorage =  ()=>{
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

  render() {
const message = { mine:true, text:''};

const show = {
  display: "none",
};

const addMessage = async (message) =>{
  this.state.arrMessage.push(message);
  await this.setDataStorage(this.state.arrMessage);
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
             text = {item.text}      
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
