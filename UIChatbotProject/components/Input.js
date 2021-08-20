import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { connect } from "react-redux";

class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  OnInputText = (TextInputValue) => {
    if (TextInputValue.trim() != 0) {
      this.props.dispatch({ type: "SHOW" }); 
    } else {
      this.props.dispatch({ type: "NONE" }); 
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Aa"
          style={styles.input}
          onChangeText={(TextInputValue) => {
            this.OnInputText(TextInputValue);
            console.log(TextInputValue);
          }}
          // value={this.props.myMessage.text}
        ></TextInput>

        <IconButton
          style={styles.micro}
          icon="microphone-outline"
          color={Colors.white}
          size={23}
          onPress={() => alert("Pressed")}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    myMessage: state.sendMessageReducer
  };
}
export default connect(mapStateToProps)(Input);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    maxWidth: "70%",
    position: "absolute",
    bottom: 8,
    paddingVertical: 6,
    borderRadius: 60,
    backgroundColor: "#30384B",
    justifyContent: "center",
    marginHorizontal: 40,
  },
  input: {
    // fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    maxWidth: "100%",
    width: "90%",
    color: "white",
    borderColor: "transparent",
    marginRight: 40,
  },
  micro: {
    flexDirection: "row",
    position: "absolute",
    right: -5,
    borderRadius: 60,
    backgroundColor: "#434959",
  },
});



