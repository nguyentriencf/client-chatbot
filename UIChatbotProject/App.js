import { StatusBar } from "expo-status-bar";
import React from "react";

import HintMessage from "./components/HintMessage";
import {connect} from 'react-redux'

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity
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
        getMSSVDataStorage,setMSSVDataStorage,removeMSSVStorage,
        checkExistMssv} from "./Storage/dataStorage";
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
     //https://chatbot-dlu.herokuapp.com
    this.socket = io("https://chatbot-dlu.herokuapp.com", {
      transports: ["websocket", "polling", "flashsocket"],
      jsonp: false,
    });
    
    this.socket.on("connect", () => {
      console.log("socket connected from server chatbot-dlu");
     
    });

    this.socket.on("send-schedule", (data) => {
      if(Array.isArray(data)){
        setTimeout(() => {
          const messageBots= renderSchedule(data);
          messageBots.forEach(e=>{
            this.renderFromBot(e.text);
          })
        }, 1000);
      
      }else{
       this.renderFromBot(data)
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
    console.log(newMess);
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
    provideMssv(isMssv){
      getMSSVDataStorage().then(kq =>{
        let existMssv =null;
          existMssv = checkExistMssv(kq,false);
        
        if(existMssv !== null){
              this.setState({ updateMSSV: true }); 
              this.renderFromBot("Bạn đã cung cấp mssv rồi!\nBạn có muốn cập nhật lại không?");
              //prompt //cập nhật lại or không
              
        }else{
              setMSSVDataStorage(isMssv);
              this.renderFromBot("Xin chào\nBạn đã có thể xem được thời khóa biểu!");
        }
      });
   
   }

   SendScheduleBot(mesageUser) {
    getMSSVDataStorage().then(kq =>{
      const existMssv = checkExistMssv(kq);
      if(existMssv === null){
        this.renderFromBot("Bạn phải cung cấp MSSV trước khi xem thời khóa biểu(vd:1812866)!");
    }else{ 
        this.renderFromBot("Bạn đợi tí!");
        this.socket.emit("scheduleWeek", {mssv:existMssv , message:mesageUser});  
    }  
  });
   }


    processText(inputText) {
    const output =  inputText.replace(/\'/g, '').split(/(\d+)/).filter(Boolean); 
    output.forEach(e =>{
       const kq =  this.TryParseInt(e);
       if(kq !== 0 && kq !== null &&  typeof(kq) != 'undefined'){
              if(kq.toString().length === 7 ){
                this.renderFromBot("Đang xử lý bạn đợi tí!");
                this.socket.emit("scheduleWeek",  {mssv:kq , message:inputText});  
               return;
              }else if(kq.toString().length === 1){
                this.SendScheduleBot(inputText);
               return;
              }
              else{ 
                this.renderFromBot("MSSV phải 7 chữ số!");
            return;
              }
       }
    })
    }

  render() {
    const message = { mine: true, text: "" };

    const show = {
      display: "none",
    };
    const dataHintMessage = [
  { id:1,mine:true, text: "TKB hôm nay" },
  { id:2,mine:true, text: "TKB ngày mai" },
  { id:3,mine:true, text: "TKB tuần sau" },
  { id:4,mine:true, text: "TKB Tuần sau nữa" }]

   
    const hintMessageReducer = (state=dataHintMessage, action) =>{
      if (action.type === "HINT_SENT_MESSAGE") {
        return state.map((e) => {
          console.log(e);
          if (e.id === action.id) {
             this.renderFromUser(e.mine, e.text);
             this.socket.emit("scheduleWeek",{message:e.text.trim()});
          }
        });
      } else {
        return state;
      }
    }
     const getListHintMessage = () => {
       const hintMessage = store.getState().hintMessageReducer;
       return hintMessage;
     };
    const sendMessageReducer =  (state = message, action) => {
      if (action.type === "SEND_MESSAGE") {
        const mesageUser =state.text.trim();
        this.renderFromUser(mesageUser,state.text);

        if(mesageUser === ""){
          return { mine: state.mine, text: mesageUser };
        }
        //Delete MessageBot
        if(this.state.deleteMessage){
           if(mesageUser === YES)
           {this.confrimIsDeleteMessageBot(mesageUser);}
           else if(mesageUser === NO){ this.setState({ deleteMessage: false });}
           else{this.isDeleleMessageBot()}
            //Update mssv MessageBot
        }else if(this.state.updateMSSV){ 

          const isMssv =  this.TryParseInt(mesageUser,0);
          if(isMssv !== 0 && isMssv !== null
             && this.state.confirmUpdate === YES ){
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

          if(mesageUser.includes("cập nhật")
             && mesageUser.includes("mssv")){
              this.isUpdateMessageBot();
              this.confrimIsUpdateMessageBot(mesageUser);
            return { mine: state.mine, text: mesageUser }; 
          }
      const isMssv = this.TryParseInt(mesageUser,0);
            
        //check Ismssv exist
        if(isMssv !== 0 && isMssv !== null){
          if(isMssv.toString().length === 7)
          {
            this.provideMssv(isMssv);
          }else{

                this.setMSSVDataStorage(isMssv);
                 this.renderFromBot("Xin chào\nBạn đã có thể xem được thời khóa biểu!");
          }
        });
      }else{
          this.renderFromBot("MSSV phải 7 chữ số!");
        }
        return { mine: state.mine, text: mesageUser };
      }

      // check is mssv contain in string
      const matches = mesageUser.match(/\d+/g);  
      if (matches != null) {
        this.processText(mesageUser);
      }else{
          this.SendScheduleBot(mesageUser);
      }
        }
        return { mine: state.mine, text: mesageUser };
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
      hintMessageReducer,
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
              {/* <HintMessage/> */}
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
              <FlatList

              horizontal={true}
              data={getListHintMessage()}
              renderItem={({item}) =><HintMessage text={item}/>}
              keyExtractor={(item)=> item.id.toString()}/>
              <Input />
              <Send />
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </Provider>
    );
  }
}


export default App
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
    flex: 3,
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
  hintText: {
    color: "#777980",
    fontSize: 14,
  
    position: "relative",
    justifyContent:'center'
  },
});
