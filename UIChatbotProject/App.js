import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView} from 'react-native'
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import MessageBubble from './components/MessageBubble';

class App extends React.Component {
  render() {
    
  return (
    
   <>
   
   <SafeAreaView style={{flex:1}}>
     <View style= {styles.container}>
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
       mine
      text="Hi bottom:10,You can now view UIChatbotProject in the browser"
      />
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
    resizeMode: 'cover'
  }

})