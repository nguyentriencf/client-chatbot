import React,{useState} from "react";
import { View, StyleSheet, TextInput} from "react-native";
import { MaterialCommunityIcons,MaterialIcons  } from "@expo/vector-icons";
import { connect } from "react-redux";
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state={ countShow :0}
  }
  pressIn = ()=>{
    this.props.dispatch({ type: "PRESS_IN" });
  }
  pressOut=()=>{
    this.props.dispatch({ type: "PRESS_OUT" });
  }

  OnInputText = (TextInputValue) => {
    
    if(this.props.myMessage.text ===''){
         this.state.countShow =0;  
       }
      this.state.countShow +=1;
    if (TextInputValue.trim() != '') {
      this.props.myMessage.text = TextInputValue;
      this.props.myMessage.mine =true;
      if( this.state.countShow === 1  ){
      this.props.dispatch({ type: "SHOW" });
      }
      this.props.dispatch({ type: "NOT" });
    }else {
      this.state.countShow =0;
      this.props.myMessage.text = TextInputValue;
      this.props.dispatch({ type: "NONE" });      
    }

  };
  render() {
   
    return (
      <View style={styles.container}>
         <MaterialIcons style={{display:this.props.init.display}} onPress={()=>this.pressOut()} name="cancel" size={24} color="white" />
        <TextInput
          placeholder="Type..."
          style={styles.input}
          onChangeText={(TextInputValue) => {
            this.OnInputText(TextInputValue);
          }}
         value={this.props.myMessage.text}
         keyboardAppearance="dark"
         onFocus={() => this.pressIn()}
        />

        <MaterialCommunityIcons
          style={styles.micro}
          name="microphone-outline"
          color="white"
          size={30}
        />
      </View>
    );
  }
}

  function mapStateToProps(state) {
    return {
      myMessage: state.sendMessageReducer,
      init: state.initHintMessageReducer,
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
    right: 3,
    borderRadius: 60,
    backgroundColor: "#434959",
  },
  hintMess:{
    color:"white"
  }
});



