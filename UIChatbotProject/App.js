import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView} from 'react-native'
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import MessageBubble from './components/MessageBubble';

class App extends React.Component {
  render() {
    
  return (
    
   <>
   <View style={styles.backGround}>
   <SafeAreaView>
     <MessageBubble
      mine
      text="Hello"
      />
     <MessageBubble
     not_mine
      text="Hi"
      />
      <MessageBubble
       mine
      text="Hi"
      />
   </SafeAreaView>
   </View>
   </>
  )
  }

}

export default App
const styles = StyleSheet.create({
  backGround:{
    backgroundColor:'#1D1F2C',
    flex: 1,
    resizeMode: 'cover'
  }
})