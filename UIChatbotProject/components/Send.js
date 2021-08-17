
import React from "react";
import { StyleSheet, Animated } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { connect } from "react-redux";

class Send extends React.Component {
  state = {
    animation: new Animated.Value(0),
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
    return (
      <Animated.View
        style={[styles.send, animationStyle, { display: this.props.myValue }]}
      >
        <IconButton icon="send" color={Colors.white} size={30}/>
      </Animated.View>
    );
  }
}

function mapStateToProps(state) {
  return { myValue: state.display };
}
export default connect(mapStateToProps)(Send);

const styles = StyleSheet.create({
  send: {
    flexDirection: "row",
    // marginTop: ,
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
