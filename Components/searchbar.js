import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList, SearchBar,Dimensions,TouchableOpacity, TextInput } from 'react-native';
import firebase from '../database/firebase';
import filter from 'lodash.filter'
var { width } = Dimensions.get("window")
export default class SearchScreen extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          query:"",
          fulldata: [],
          filtereddata: [],
          error: null,
        };
    }
    handleSearch = text => {
       const formattedQuery = text// = text.toUpperCase();
       
       const data = filter(this.state.fulldata, items => {
           return this.contains(items, formattedQuery);
       });
       
        this.setState({
          //fulldata: data, 
          filtereddata: data,
          query: text
         });
    };
    contains = ( {name} , query) => {
        
        if (name.includes(query)  ) {
          return true
        }
        return false
      }
    componentDidMount(){
       this.makeRemoteRequest();
    }
    makeRemoteRequest = () => {
      firebase.database().ref('data').on('value', (snapshot) => {
        this.setState(()=> ({ fulldata: snapshot.val(), loading: false, filtereddata: snapshot.val()}));
        
      }, error => {
        console.error(error);
      });
    }
    renderItem = ({item}) =>{
return (
  <TouchableOpacity onPress={() => alert('Item pressed!')}>
  <View
    style={{
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center'
    }}>
    
    <Text
      category='s1'
      style={{
        color: '#000'
      }}>{`${item.name}`}</Text>
  </View>
</TouchableOpacity>
)
    }
    
   
    render(){
        return (
            <View style={styles.container}>
                <TextInput style={{width: width, marginTop:10}}
            placeholder="Search for products"
           // lightTheme
           // round
           // onChangeText={text => this.searchFilterFunction(text)}
           onChangeText={this.handleSearch}
            autoCorrect={false}
            clearButtonMode={'always'}
           // value={this.state.query}
          />
                <FlatList
              //horizontal={true}     
              //data={this.state.fulldata}
              data = {this.state.filtereddata}
              //numColumns={2}
              renderItem={this.renderItem}
              keyExtractor={item =>item.name}
            />
            </View>
        
        );
    }
}






const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
    },
  });