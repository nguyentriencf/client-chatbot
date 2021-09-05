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
  //  console.log(typeof key);
    return (
      <View>
        <TouchableOpacity onPress={()=>sentHintMessage(id)}>
          <Text style={styles.textItem}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  textItem: {
    color: "black",
    width: 'auto',
    borderColor: "white",
    borderRadius: 30,
    backgroundColor: "#5E56BD",
    justifyContent: "center",
    borderWidth:2,
    fontSize:12,
    padding:8,
    
  },
});
export default connect()(HintMessage)
