// import React
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

//import react native Component
import { StyleSheet, View, Text, Image ,Animated } from "react-native";
// Import react-native-size-matters
import { moderateScale } from "react-native-size-matters";

// Props info list
// 1. mine (bool) => render blue bubble on right
// 2. text (string) => renders text message
// 3. image (file image) => render image inside bubble

// Declare component
class MessageBubble extends React.Component {

  state = {
    animatedValue: new Animated.Value(0)
  };

  startAnimation() {
   return Animated.timing(this.state.animatedValue,
    {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
    });
  };
  componentDidMount(){
    this.startAnimation().start();
   };
  render() {
   
 //   this.animatedValue.setValue(0);
   
    const AnimationValue = this.state.animatedValue.interpolate(
      {
          inputRange: [ 0, 1 ],
          outputRange: [ -59, 0 ]
      });
    return (
      <Animated.View 
       style={[  styles.message,
        this.props.mine ? styles.mine : styles.not_mine, 
        {opacity: this.state.animatedValue, transform: [{ translateY: AnimationValue }] }]}>
        <LinearGradient
          start={[0.5, 0.7, 0.9]}
          colors={
            this.props.mine
              ? ["#1F2430", "#1E232F", "#272C3A"]
              : ["#6C64D6", "#7169E2", "#5E56BD"]
          }
          style={[this.props.mine ? styles.cloudMine : styles.cloudNotMine]}
        >
          {this.props.text ? (
            <Text style={[styles.text]}>{this.props.text}</Text>
          ) : null}
        </LinearGradient>
      </Animated.View>
    );
  }
}

export default MessageBubble;
const styles = StyleSheet.create({
  message: {
    flexDirection: "row",
    marginVertical: moderateScale(7, 2),
  },
  mine: {
    marginLeft: 5,
  },
  not_mine: {
    alignSelf: "flex-end",
    marginRight: 5,
  },
  cloudMine: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: (7, 2),
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    
  },
  cloudNotMine: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: (7, 2),
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: "flex-end",
    fontSize: 15,
    lineHeight: 35,
  },
  arrow_container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrow_left_container: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  arrow_right_container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    right: moderateScale(-6, 0.5),
  },
});
