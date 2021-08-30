
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
    this.state={arrMessage:[]}
    this.socket = io("https://chatbot-dlu.herokuapp.com", {
      transports: ["websocket", "polling", "flashsocket"],
      jsonp: false,
    });
    this.socket.on("connect", () => {
      console.log("socket connected");
      //input
      this.socket.emit("scheduleWeek", "ngày mai");
    });
    this.socket.on("send-schedule", (data) => {
      console.log(data);
    });
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
    const newMess ={mine:state.mine , text:state.text};
       addMessage(newMess);
       add_view();
      return state;
  }
  else{
    return  {mine:state.mine, text:state.text};
  } 
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
    flex: 1,
    backgroundColor:"#1D1F2C"
   
  },
  header: {
    flex: 1.5,
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
