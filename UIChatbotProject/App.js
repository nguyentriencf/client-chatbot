import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView} from 'react-native'
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import MessageBubble from './components/MessageBubble';
import Input from './components/Input';

class App extends React.Component {
  render() {
    
  return (  
   <>
   <SafeAreaView style= {styles.container}>
    <View style={styles.header} >
    </View>   
     <View style={styles.body}>
       <ScrollView style={styles.scrollView}>
     <MessageBubble
      mine
      text="Hello, Nguyễn Mậu Tuấn"
      />
     <MessageBubble
     not_mine
      text="Hi, Huỳnh Thiên Tâns"
      />
      <MessageBubble
       mine
      text="Hi bottom:10,You can now view UIChatbotProject in the browser"
      />
       <MessageBubble
      mine
      text="Hello, Nguyễn Mậu Tuấn"
      />
     <MessageBubble
     not_mine
      text="Hi, Huỳnh Thiên Tâns"
      />
        <MessageBubble
     not_mine
      text="Hi, Huỳnh Thiên Tâns"
      />
        <MessageBubble
     not_mine
      text="Hi, Huỳnh Thiên Tâns"
      />  <MessageBubble
     not_mine
      text="Hi, Huỳnh Thiên Tâns"
      />
      <MessageBubble
      mine
      text="Hello, Nguyễn Mậu Tuấn"
      />
     <MessageBubble
     not_mine
      text="Hi, Huỳnh Thiên Tâns"
      />
      <MessageBubble
       mine
      text="Hi bottom:10,You can now view UIChatbotProject in the browser"
      />
       <MessageBubble
      mine
      text="Hello, Nguyễn Mậu Tuấn"
      />
      </ScrollView>

       </View>
       <View style={styles.footer}>
         <Input/>
         </View>
      
   </SafeAreaView>
   </>
  )
  }

}
export default App
const styles = StyleSheet.create({
  container:{
   backgroundColor:'#1D1F2C',
    flex: 1,
    resizeMode: 'cover',
    justifyContent:'center'
  },
  footer: {
    flex:1,
    backgroundColor:'#1D1F2C'
  },
  header: {
    flex:1,
    backgroundColor:'#1D1F2C'
  },
  body: {
    flex:10,
    backgroundColor:'#1D1F2C',
  },
   scrollView: {
    marginHorizontal: 20,
    // showsVerticalScrollIndicator:false
  },

})