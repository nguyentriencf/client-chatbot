import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    ImageBackground
} from 'react-native'
import SkiingImage from '../assets/skiing.png'

export default function CategoryListItem(props) {
    const {category} = props;
    return  <View style={style.container}>
        <Text style={style.title}></Text> 
        <Image style={style.categoryImage} source={SkiingImage} />
    </View>   
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding:16,
        borderRadius: 10,
        backgroundColor:'#FFF',
        shadowColor:'#000',
        shadowOpacity:0.1,
        shadowRadius: 10,
        textShadowOffset:{width:0,height:0},
        marginBottom:16
    },
    categoryImage : {
        width:64,
        height:64
    },
    title :{
        textTransform: 'uppercase',
        marginBottom:8,
        fontWeight: '700' 
    }
});