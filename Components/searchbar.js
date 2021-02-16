import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList, SearchBar,Dimensions,TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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
          error: null,
        };
    }
    handleSearch = text => {
       const formattedQuery = text.toLowerCase();
       const data = filter(this.state.fulldata, user => {
           return this.contains(user, formattedQuery);
       });
        this.setState({data, query: text });
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
        this.setState(()=> ({ fulldata: snapshot.val(), loading: false}));
        
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
           // value={this.state.value}
          />
                <FlatList
              //horizontal={true}     
              data={this.state.fulldata}
              //numColumns={2}
              renderItem={this.renderItem}
              keyExtractor={(item, index)=>index.toString()}
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