import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Easing,
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
    return (
      <Provider store={store}>
        <>
          <LinearGradient
            colors={["#1E222D", "#1E212C", "#1C1F2A"]}
            style={styles.container}
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
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
              >
                <MessageBubble mine text="Hello, Nguyễn Mậu Tuấn" />
                <MessageBubble not_mine text="Hi, Huỳnh Thiên Tâns" />
                <MessageBubble
                  mine
                  text="Hi bottom:10,You can now view UIChatbotProject in the browser"
                />
                <MessageBubble mine text="Hello, Nguyễn Mậu Tuấn" />
                <MessageBubble not_mine text="Hi, Huỳnh Thiên Tâns" />
                <MessageBubble not_mine text="Hi, Huỳnh Thiên Tâns" />
                <MessageBubble not_mine text="Hi, Huỳnh Thiên Tâns" />
                <MessageBubble not_mine text="Hi, Huỳnh Thiên Tâns" />
                <MessageBubble mine text="Hello, Nguyễn Mậu Tuấn" />

                <MessageBubble not_mine text="Hi, Huỳnh Thiên Tâns" />
                <MessageBubble mine text="Hello, Nguyễn Mậu Tuấn" />
              </ScrollView>
            </View>

            <BlurView style={styles.footer} tint={"dark"}>
              <Input />
              <Send />
            </BlurView>
          </LinearGradient>
        </>
      </Provider>
    );
  }
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    overflow: "hidden",
  },
  footer: {
    flex: 1,
    backgroundColor: "#1D1F2C",
  },
  header: {
    flex: 1.5,
    backgroundColor: "#1D1F2C",
    alignItems: "center",
  },
  body: {
    flex: 11,
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
    left: 0,
  },
});
