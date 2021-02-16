import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';  
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
//import Camera from 'react-native-camera';
var { width } = Dimensions.get("window")
class ServicesScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [
                {
                    name: 'Privilege Card',
                     icon: 'idcard'
                },
                {
                    name: 'Barcode Scanner',
                    icon: 'barcode'
                },
                {
                    name: 'Store Finder',
                    icon: 'find'
                },
            ]
        }
    }
    renderItem = ({item}) => {
      if(item.icon == 'barcode'){
        return(
          <TouchableOpacity style={styles.item} onPress={()=>this.props.navigation.navigate('BarcodeScreen')}>
              <Icon name="barcode" size={45} color="darkorange"
              />
              <Text numberOfLines={1} style={styles.name}>Barcode Scanner</Text>
              
          </TouchableOpacity>
          

        )
      }
        return(
         
          <TouchableOpacity style={styles.item} onPress={this.createTwoButtonAlert}>
              <Icon name={item.icon} size={45} color="darkorange"
              />
              <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
              
          </TouchableOpacity>
          
        )
      }
    


    createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    render(){
        return (
            <View style={styles.container}>
    <StatusBar backgroundColor='darkorange' barStyle="light-content"/>

                <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item,index)=>index.toString()}
                numColumns={3}
                />
        </View>
        );
    }
}
export default ServicesScreen;





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: width,
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    button: {
        justifyContent:'center',
        alignItems:'center',
        width:'20%',
        height:'33%',
        marginTop:30,
        marginLeft: 30,
        borderRadius: 40,
        borderWidth: 1,
        backgroundColor:'white'
      },
      item: {
         // marginLeft: 20,
         width: width/3,
          marginTop: 20,
        flex:1,
        alignItems:'center'
      },
      name: {
        
          marginTop: 15,
        color:'black',
        //fontWeight:'bold'
      },
      
  });