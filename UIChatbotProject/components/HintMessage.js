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
   const { id, text } = this.props.dataHintMessage;
   
    return (
      <View>
        <TouchableOpacity>
          <Text>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  textItem: {
    color: "black",
    height: 50,
    width: 100,
    borderColor: "white",
    borderRadius:30,
    backgroundColor:'white',
    justifyContent:'center'
    
  },
});
export default connect()(HintMessage)
