import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


class FavoritesScreen extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text> Welcome to the Favorites Screen </Text>
            </View>
        
        );
    }
}
export default FavoritesScreen;





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });