import React from "react";
import { render } from "react-dom";
import {
    View,
 Text,
 TouchableOpacity,
 StyleSheet,
 FlatList,
 ScrollView
} from "react-native";

const HintMessage = () =>{  
        const data = [
          { text: "TKB hôm nay" },
          { text: "TKB ngày mai" },
          { text: "TKB tuần sau" },
          { text: "TKB Tuần sau nữa" },
        ];
      
    return (
      <View>
        <FlatList
          data={data}
          renderItem={(item) => {
            <Text>{item.text}</Text>;
          }}
        />
      </View>
      // <FlatList
      // data={data}
      // renderItem={({item})=>{
      //         <Text style={styles.textItem}>
      //             {item.text}
      //         </Text>
      // }}/>
    );
}

const styles = StyleSheet.create({
  textItem: {
    color: "white",
    height: 50,
    width: 100,
    borderColor: "white",
    borderRadius:30
  },
});
export default HintMessage
