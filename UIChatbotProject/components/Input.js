import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { connect } from "react-redux";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputValue: "",
    };
  }
  OnInputText = (TextInputValue) => {
    if (TextInputValue.trim() != 0) {
      this.props.dispatch({ type: "SHOW" });
      this.setState({ TextInputValue: TextInputValue });
    } else {
      this.props.dispatch({ type: "NONE" });
      this.setState({ TextInputValue: TextInputValue });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Some text"
          style={styles.input}
          onChangeText={(TextInputValue) => {
            this.OnInputText(TextInputValue);
          }}
        ></TextInput>

        <IconButton
          style={styles.micro}
          icon="microphone-outline"
          color={Colors.white}
          size={25}
          onPress={() => alert("Pressed")}
        />
      </View>
    );
  }
}
export default connect()(Input);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignSelf: "right",
    alignItems: "center",
    width: "70%",
    maxWidth: "70%",
    position: "absolute",
    bottom: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 60,
    backgroundColor: "#30384B",
    justifyContent: "center",
    marginHorizontal: 40,
  },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    maxWidth: "100%",
    width: "90%",
    color: "white",
    borderColor: "transparent",
    marginRight: 40,
  },
  micro: {
    flexDirection: "row",
    top: -3,
    position: "absolute",
    right: 0,
    borderRadius: 50,
    backgroundColor: "#434959",
  },
});
