import React, { Component } from 'react';
import { View,Text,StyleSheet,ImageBackground,Dimensions,Image,StatusBar,ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';  

export default class Detail extends Component{
    render(){
        return(
        <View style={styles.container}>
        <View style={styles.image_container}>
              <Image 
                source={{uri: this.props.navigation.state.params.imageData}}
                style={styles.image}
              />
              </View>
              <View style={styles.back}>
              <Icon 
                name="leftcircle"
                color="orangered"
                size={35}
                onPress={()=>this.props.navigation.goBack()}
              />
          </View>
          <ScrollView style={styles.footer}>
          
          <Text style={styles.textPrice}>${this.props.navigation.state.params.priceData}</Text>
          <Text numberOfLines={2} style={styles.textName}>{this.props.navigation.state.params.nameData.toUpperCase()}</Text>
          <Text  style={styles.textDetail}>The template details auto text code displays the complete template details, including attribute details and metric details.</Text>
          </ScrollView>
          </View>
        )
    }
}

const height = Dimensions.get("screen").height;
const height_image = height * 0.5 * 0.5;

var styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'white'
    },
    footer: {
      flex:1,
      paddingHorizontal:40
    },
    image_container: {
      width: height_image,
      height: height_image,
      marginTop: height_image/3
    },
    image: {
      width:'200%',
      height:'150%',
      borderWidth:5,
      borderColor:'white',
      marginLeft: 25,
      marginTop: 30,
      //borderRadius: height_image/2
    },
    back:{
      position:'absolute',
      left:0,
      marginTop:20,
      marginLeft:15
    },
    status: {
      width:100,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderRadius:50,
      paddingVertical:3,
      borderColor:'green'
    },
    textPrice: {
      color:'orangered',
      fontWeight:'bold',
      fontSize:30,
      marginTop:50
    },
    textName: {
      color: '#3e3c3e',
      fontWeight:'bold',
      fontSize:30,
      marginTop:25,
      
    },
    textDetail: {
      color:'gray',
      marginTop:10
    },
    button: {
      justifyContent:'center',
      alignItems:'center',
      marginTop:30,
      paddingVertical:10,
      borderRadius:100
    },
    textOrder: {
      color:'white',
      fontWeight:'bold',
      fontSize:18
    }
  });