
import React from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

class Send extends React.Component {
  constructor(props) {
    super(props);
    
  }
  sendMess(){
    this.props.dispatch({ type: "SEND_MESSAGE" });  
  }
  
  render() {
   const state = {
      animation: new Animated.Value(0)
     
    };
  
  function startAnimation() {
     Animated.timing(state.animation, {
      toValue:1 ,
      duration: 500,
      useNativeDriver: true
    }).start();
  }
   
    const rotateInterpolate = state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
      
    });

    const animationStyle = {
      transform: [{ rotate: rotateInterpolate }],
    };
    

    if (this.props.myValue.display === "flex") {     
        startAnimation();
    }
   
    return (
      <TouchableOpacity
        style={styles.send}
      >
        <Animated.View
          style={[animationStyle, { display: this.props.myValue.display }]}
        >
          <Ionicons name="send" color='white' size={24} onPress={this.sendMess.bind(this)} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return {
    myValue: state.displaysReducer
  };
}
export default connect(mapStateToProps)(Send);

const styles = StyleSheet.create({
  send: {
    flexDirection: "row",
    marginHorizontal: 20,
    position: "absolute",
    right:0,
    bottom:15,
  },
  box: {
    width: 150,
    height: 150,
  },
});
