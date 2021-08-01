import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Feather, Ionicons  } from '@expo/vector-icons';

// const Input = ({inputMessage, onSendMessage, setMessage}) => {
//     return(
//         <View style={styles.container}>
//             <TextInput placeholder='Some text' value={inputMessage}
//             onChangeText={setMessage} style={styles.input}>
//             </TextInput>
//         </View>
        
//     )
// }
const pressed = ()=>{
  console.log("Nguyen Trien ");
}
class Input extends React.Component {
  render(){
    return(
        <View>
          <Ionicons />
            <TextInput placeholder='Some text'
           style={styles.input}>
            </TextInput>
            <TouchableOpacity onPress={pressed}>
              <Ionicons color='White' size={20}/>
            </TouchableOpacity>
        </View>
        
    )
}
}
export default Input
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignSelf:'center',
    alignItems:'center',
    width:'85%',
    position:'absolute',
    bottom:10,
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:30,
    borderColor:'#ffffff'
  },
  input: {
      fontFamily:'Montserrat_600SemiBold',
      fontSize:20,
      paddingHorizontal:10,
      color:'white',
      flex:2,
      backgroundColor:'#30384B',
      
  }
})

