import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Easing,
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

const show = {
  display: "none",
};

const reducer = (state = show, action) => {
  if (action.type === "SHOW") {
    return { display: (state.display = "flex") };
  }
  if (action.type === "NONE") {
    return { display: (state.display = "none") };
  }
  return state;
};

const store = createStore(reducer);

const io = require("socket.io-client/dist/socket.io.js");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={viewArray:[], disableButton:false};
    this.animatedValue = new Animated.Value(0);
    this.arrayValueIndex =0;

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

  addNewViewFunction = () => {
    this.animatedValue.setValue(0);
    let newAddedViewValue = {arrayValueIndex:this.arrayValueIndex}
    this.setState({disableButton:true,
      viewArray:[...this.state.viewArray,newAddedViewValue]},
      () =>{
        Animated.timing(
          this.animatedValue,
          {
            toValue:1,
            duration:400,
            useNativeDriver:true
          }
        ).start(() =>
        {
          this.arrayValueIndex +=1;
          this.setState({disableButton:false})
        })
      })
  }

  render() {
    const AnimationValue = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-59, 0],
    });
    let renderAnimateView = this.state.viewArray.map((value,key)=>
    {
        return (
          <Animated.View key={key}>
            <MessageBubble mine text="hello"/>
          </Animated.View>
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
              <ScrollView showsHorizontalScrollIndicator={false}>
                {renderAnimateView}
              </ScrollView>
            </View>

            <BlurView style={styles.footer} tint={"dark"}>
              <Input />
              <Send
                {...this.props}
                disabledBtn={this.state.disableButton}
                addView={this.addNewViewFunction()}
              />
            </BlurView>
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
    overflow: "hidden",
  },
  footer: {
    flex: 0.8,
    backgroundColor: "#1D1F2C",
  },
  header: {
    flex: 1.5,
    backgroundColor: "#1D1F2C",
    alignItems: "center",
  },
  body: {
    flex: 7.7,
    backgroundColor: "#1D1F2C",
    padding:10
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
    left: 0,
  },
});
