import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/Ionicons';

var { width } = Dimensions.get("window")

class CategoriesScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount(){
        this._isMounted = true;
        firebase.database().ref('data').on('value', (snapshot) => {
          if(this._isMounted){
          this.setState(()=> ({ data: snapshot.val(), loading: false}));
          }
        });
      }
      componentWillUnmount() {
        this._isMounted = false
    }
    renderItem(item) {
        if(this.props.navigation.state.params.catname == item.category){
        return (
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DetailScreen',{
                imageData: item.image,
                priceData: item.price,
                nameData: item.name,
                idData: item.id,
                priceData: item.price,
                quantityData: item.quantity,
                ratingData: item.rating,
              })}}>
            <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:1, borderColor:"#cccccc", paddingBottom:10}}>
       
            <Image resizeMode={"contain"} style={{width:width/4,height:width/4, borderRadius: 5}} source={{uri: item.image}} />
            <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
              <View>
                <Text style={{ fontSize:20, fontWeight:"bold"}}>{item.name}</Text>
                
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:"black",fontSize:20, marginTop: 10}}>L.L {item.price}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  
                  <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.count}</Text>
                  
                </View>
              </View>
            </View>
            
          </View>
          </TouchableOpacity>
        );
        }
    }
    render(){
        
        return (
            <View style={styles.container}>
                <View style={{height:45,width:width,alignItems: 'flex-start', justifyContent: 'center', marginLeft:30,borderBottomColor:'lightgrey',marginTop:10}} >
      <Text style={{fontSize:25,fontWeight:"bold",color:"black",}}>{this.props.navigation.state.params.catname} List</Text>
      </View>
                <FlatList
                data={this.state.data}
               // numColumns={2}
               renderItem={({ item }) => this.renderItem(item)}
               keyExtractor={item => item.id.toString()}
               />
            </View>
        
        );
        
    }
}
export default CategoriesScreen;





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
  });