import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import {
 View,
 Text,
 TouchableOpacity,
 StyleSheet,
 FlatList,
 ScrollView
} from "react-native";

      
const HintMessage = (props) =>{    
   const { id, text} = props.text;
  const sentHintMessage= (id) => {
      props.dispatch({
        type: "HINT_SENT_MESSAGE",
        id
      });
  }
    return (
      <TouchableOpacity
        style={styles.buttonHintMess}
        onPress={() => sentHintMessage(id)}
      >
        <Text style={styles.textSendHintMessage}>{text}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  buttonHintMess: {
    width: "auto",
    borderColor: "white",
    backgroundColor: "#7986CB",
    justifyContent: "center",
    fontSize: 12,
    padding: 8,
    marginRight: 8,
    marginLeft: 8,
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
  },
  textSendHintMessage: {
    color: "white",
    textAlign: "center",
  },
});
export default connect()(HintMessage)