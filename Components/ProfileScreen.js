import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

class ProfileScreen extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text> Welcome to the Profile Screen </Text>
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