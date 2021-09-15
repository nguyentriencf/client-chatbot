import React from "react";
import {View,StyleSheet,FlatList} from 'react-native'
import { connect } from "react-redux";
import HintMessage from "./HintMessage";
 
const FlatListHintMessage=(props) =>{
    return(
     <FlatList
       style={[styles.styleHintMessage, {display:props.init.display}]}
       horizontal={true}
       data={props.data}
       renderItem={({ item }) => <HintMessage text={item} />}
       keyExtractor={(item) => item.id.toString()}
       showsHorizontalScrollIndicator={false}
     />); 
}

const styles = StyleSheet.create({
  styleHintMessage: {
    marginBottom: 1
  },
});

function mapStateToProps(state) {
  return {
    data: state.hintMessageReducer,
    init:state.initHintMessageReducer,
  };
}

export default connect(mapStateToProps)(FlatListHintMessage);