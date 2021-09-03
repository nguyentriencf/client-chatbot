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
import {renderSchedule} from "./module/ScheduleModule";
import {getDataStorage,setDataStorage,removeDataStorage,
        getMSSVDataStorage,setMSSVDataStorage,checkExistMssv} from "./Storage/dataStorage";
// socket-client
const io = require("socket.io-client/dist/socket.io.js");
const YES = "có";
const NO ="không";
const CANCEL ="hủy";
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state =
     { 
      arrMessage: [], 
      data:[],
      deleteMessage:false,
      scheduleMessage:false,
      updateMSSV:false,
      confirmUpdate: NO
     };
     
    this.socket = io("https://chatbot-dlu.herokuapp.com", {
      transports: ["websocket", "polling", "flashsocket"],
      jsonp: false,
    });
    
    this.socket.on("connect", () => {
      console.log("socket connected from server chatbot-dlu");
    });

    this.socket.on("send-schedule", (data) => {
      if(Array.isArray(data)){
        const messageBots= renderSchedule(data);
        messageBots.forEach(e=>{
          this.renderFromBot(e.text);
        })
      }else{
       this.renderFromBot(data);
      }
    });
 
     getDataStorage().then(stores =>{
      stores.map( (result,i,store)=>{   
      if (store[i][1] !== null){
       let items = JSON.parse(store[i][1]);  
       items.forEach(el =>{
         this.state.arrMessage.push(el);
        this.add_view();
       })      
      }
   })
     })
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
     addMessage = async (message) =>{
      this.state.arrMessage.push(message);
      await setDataStorage(this.state.arrMessage);
    }

    add_view() {
      this.setState({ arrMessage: this.state.arrMessage });
    };
 
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

    isDeleleMessageBot(){  
      this.setState({ deleteMessage: true });    
      this.renderFromBot("Bạn có chắc xóa tin nhắn không?(có/không)");

    }
    confrimIsDeleteMessageBot(confirm){
             if(confirm === YES){
              this.setState({ deleteMessage: false });   
              this.renderFromBot("Đang xử lý...!");
              setTimeout(() => {
                removeDataStorage();
                this.state.arrMessage =[];
                this.add_view();   
              }, 2000);
             }else{
              this.setState({ deleteMessage: true });   
             }
    }

    isUpdateMessageBot(){
     
      this.renderFromBot("Bạn có chắc cập nhật lại mssv không?(có/không)");
    }

    isMssvUpdateBot(){
      this.renderFromBot("Mã số bạn muốn cập nhật là gì?");
    }
    updateMSSVBot(mssv){
      this.setState({ updateMSSV: false }); 
      getMSSVDataStorage().then(kq =>{
      
       const existMssv  = checkExistMssv(kq,true);//clear storage mssv ;return null;
       if(existMssv === null){
        this.renderFromBot("Đang xử lý...!");      
        setTimeout(() => {
          setMSSVDataStorage(mssv);
          }, 1000);   
        setTimeout(() => {
        this.renderFromBot("Cập nhật thành công!");
        this.renderFromBot("Bạn đã có thể xem lại thời khóa biểu mới cập nhật!");
        this.state.confirmUpdate = NO;
        }, 2000);
       }
       
      })  
            
    }
    confrimIsUpdateMessageBot(confirm){
      if(confirm === YES){
        this.state.confirmUpdate = YES
        this.isMssvUpdateBot();
      }
      else{
       this.setState({ updateMSSV: true });   
      }
}


  render() {
    const message = { mine: true, text: "" };

    const show = {
      display: "none",
    };
    const sendMessageReducer =  (state = message, action) => {
      if (action.type === "SEND_MESSAGE") {
        const mesageUser =state.text.trim();
        this.renderFromUser(mesageUser,state.text);

        if(mesageUser === ""){
          return { mine: state.mine, text: mesageUser };
        }
        //DeleteMessageBot
        if(this.state.deleteMessage){
           if(mesageUser === YES)
           {this.confrimIsDeleteMessageBot(mesageUser);}
           else if(mesageUser === NO){ this.setState({ deleteMessage: false });}
           else{this.isDeleleMessageBot()}
        }else if(this.state.updateMSSV){ 
          const isMssv =  this.TryParseInt(mesageUser,0);

          if(isMssv !== 0 && isMssv !== null && this.state.confirmUpdate === YES){
              if(isMssv.toString().length === 7){
                this.updateMSSVBot(isMssv);
              }
              else{
                this.renderFromBot("MSSV phải 7 chữ số!");
               }
          }else{
            if(mesageUser === YES){  
              this.confrimIsUpdateMessageBot(mesageUser);
            }
            else if(mesageUser === NO){
               this.setState({ updateMSSV: false });
              }
            else{
              this.isUpdateMessageBot()
            }
          }
        
        }
        else{
            if(mesageUser.includes("xóa")){
              this.isDeleleMessageBot();
              this.confrimIsDeleteMessageBot(mesageUser);
             return { mine: state.mine, text: mesageUser };
          }

          if(mesageUser.includes("cập nhật")){
              this.isUpdateMessageBot();
              this.confrimIsUpdateMessageBot(mesageUser);
            return { mine: state.mine, text: mesageUser };
          
          }
   

   const isMssv =  this.TryParseInt(mesageUser,0);

   if(isMssv !== 0 && isMssv !== null){
      if(isMssv.toString().length === 7)
 {
   getMSSVDataStorage().then(kq =>{
     let existMssv =null;
    const messageBot = this.state.arrMessage.filter(e =>{
            return e.mine === false;
     })

     if(messageBot.length !==0 ){
      
       if (messageBot[messageBot.length -1].text.includes("cập nhật")){
     
     
         return { mine: state.mine, text: state.text };
     }
     }
       existMssv = checkExistMssv(kq,false);
      
     if(existMssv !== null){
            this.renderFromBot("tôi không hiểu ý bạn!" );
     }else{
           setMSSVDataStorage(isMssv);
            this.renderFromBot("Xin chào\nBạn đã có thể xem được thời khóa biểu!");
     }
   });
  
 }else{
     this.renderFromBot("MSSV phải 7 chữ số!");
   }
   return { mine: state.mine, text: state.text };
 }
  // check input
  getMSSVDataStorage().then(kq =>{
   const existMssv = checkExistMssv(kq);
   if(existMssv === null){
     this.renderFromBot("Bạn phải cung cấp MSSV trước khi xem thời khóa biểu(vd:1812866)!");
}else{ 
    this.renderFromBot("Đang xử lý bạn đợi tí!");
      this.socket.emit("scheduleWeek", {mssv:existMssv , message:state.text.trim()});  
} 
 });
        }
        
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
