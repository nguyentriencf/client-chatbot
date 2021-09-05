import React,{useState} from "react";
import { View, StyleSheet, TextInput, ScrollView, FlatList, TouchableOpacity,  } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import { connect } from "react-redux";

class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  OnInputText = (TextInputValue) => {
    if (TextInputValue.trim() != 0) {
      this.props.myMessage.text = TextInputValue;
      this.props.myMessage.mine =true;
      this.props.dispatch({ type: "SHOW" }); 
     
    } else {
      this.props.myMessage.text = TextInputValue;
      this.props.dispatch({ type: "NONE" });      
    }

  };

  
  render() {
   
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Type..."
          style={styles.input}
          onChangeText={(TextInputValue) => {
            this.OnInputText(TextInputValue);
          }}
          value={this.props.myMessage.text}
        
        />

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
    width: "80%",
    maxWidth: "70%",
    position: "absolute",
    bottom: 8,
    paddingVertical: 6,
    borderRadius: 60,
    backgroundColor: "#30384B",
    justifyContent: "center",
    marginHorizontal: 50,
  },
  input: {
    // fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    maxWidth: "100%",
    width: "90%",
    color: "white",
    borderColor: "transparent"
  },
  micro: {
    flexDirection: "row",
    position: "absolute",
    right: -3,
    borderRadius: 60,
    backgroundColor: "#434959",
  },
  hintMess:{
    color:"white"
  }
});



