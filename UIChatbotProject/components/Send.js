
import React from "react";
import { StyleSheet, Animated, TouchableOpacity } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { connect } from "react-redux";

class Send extends React.Component {
  constructor(props) {
    super(props);
  
  }
  state = {
    animation: new Animated.Value(0)
  };

  startAnimation() {
    return Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
  }

  render() {
    const rotateInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const animationStyle = {
      transform: [{ rotate: rotateInterpolate }],
    };
    if (this.props.myValue === "flex") {
      this.startAnimation().start();
    } else {
      this.startAnimation().reset();
    }
    function sendMess(){
      this.props.dispatch({ type: "SEND_MESSAGE" });  
    }
    return (
      <TouchableOpacity
        style={styles.send}
      >
        <Animated.View
          style={[animationStyle, { display: this.props.myValue }]}
        >
          <IconButton icon="send" color={Colors.white} size={30} onPress={sendMess.bind(this)} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return {
    myValue: state.displaysReducer.display
  };
}
export default connect(mapStateToProps)(Send);

const styles = StyleSheet.create({
  send: {
    flexDirection: "row",
    marginHorizontal: 20,
    position: "absolute",
    right: 0,
    bottom:1,
  },
  box: {
    width: 150,
    height: 150,
  },
});
