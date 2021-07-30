// import React 
import React, { useState } from 'react'

//import react native Component
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native'
// Import react-native-size-matters
import { moderateScale } from 'react-native-size-matters';

// Props info list 
// 1. mine (bool) => render blue bubble on right 
// 2. text (string) => renders text message
// 3. image (file image) => render image inside bubble

// Declare component
class MessageBubble extends React.Component {
    render(){
        return(
            
            <ScrollView  vertical={true} showsVerticalScrollIndicator={false} style={[
                styles.message,
                 this.props.mine ? styles.mine : styles.not_mine]}>    
                <View 
                style={[
                    this.props.mine ? styles.cloudMine : styles.cloudNotMine,
                    {
                        backgroundColor: this.props.mine ? '#2A2A37':'#8961D8'
                    }
                ]}
                >
                    {
                        this.props.image
                        ?
                        <Image 
                        style={{alignSelf: this.props.mine? 'flex-start' : 'flex-end'}}
                        borderRadius={10}
                        source= {this.props.image}
                        />
                        :
                        null
                    }
                      {
                        this.props.text
                        ?
                        <Text 
                            style = {[
                             styles.text
                        ]}
                        >
                            {this.props.text}
                        </Text>
                        :
                        null
                    }
                    <View
                    style={[
                        styles.arrow_container,
                        this.props.mine ? styles.arrow_left_container: styles.arrow_right_container
                    ]}>
                    </View>
                </View>    
            </ScrollView>
        )
    }
}

export default  MessageBubble

const styles = StyleSheet.create({
    
    message: {
        flexDirection: 'row',
        marginVertical: moderateScale(7,2),
    },
    mine: {
        marginLeft: 20,
    },
    not_mine: {
        alignSelf:'flex-end',
        marginRight:20
    },
    cloudMine: {
        top:5,
        bottom:5,
        maxWidth: moderateScale(250,2),
        paddingHorizontal: moderateScale(10,2),
        paddingTop:moderateScale(5,2),
        paddingBottom: (7,2),
        borderTopRightRadius:30,
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
    },
    cloudNotMine: {
        maxWidth: moderateScale(250,2),
        paddingHorizontal: moderateScale(10,2),
        paddingTop:moderateScale(5,2),
        paddingBottom: (7,2),
        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        borderTopRightRadius:30
    },
    text: { 
       color: 'white',
        fontWeight:'bold',
        paddingBottom: 15,
        fontSize: 20,
        lineHeight:22
       
    },
    arrow_container: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:-1,
        flex:1,
    },
    arrow_left_container: {
        justifyContent:'flex-end',
        alignItems:'flex-start'
    },
    arrow_right_container: {
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    arrow_left: {
        left: moderateScale(-6,0.5)
    },
    arrow_right: {
        right: moderateScale(-6,0.5)
    }

})