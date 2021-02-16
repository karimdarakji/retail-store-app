import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions,StatusBar } from 'react-native';
import firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SignInScreen from './SignInScreen';
var { width } = Dimensions.get("window")
class ProfileScreen extends Component{
    constructor() {
        super();
        this.state = { 
            displayName: firebase.auth().currentUser.displayName,
        }
      }
      signou(){
        
         //   firebase.auth().signOut().then(() => {this.props.navigation.navigate('SignIn'); })
         firebase.auth().signOut()
      }

    render(){
        return (
            <View style={styles.container}>
    <StatusBar backgroundColor='darkorange' barStyle="light-content"/>

                <Text style={{fontSize:25, marginTop:10,fontWeight:"bold"}}> {this.state.displayName}'s Profile </Text>
                <TouchableOpacity style={{backgroundColor:"darkorange",borderRadius:5,marginTop:20,justifyContent:'center',}} onPress={()=>this.signou()}>
           <Text style={{textAlign:"center",color:"white",fontSize:25,fontWeight:"bold",width:width-10}}>Logout</Text>
        </TouchableOpacity>
            </View>
        
        );
    }
}
export default ProfileScreen;





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });