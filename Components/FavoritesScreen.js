import React, { Component } from 'react';
import {View,Text,Image,Alert,FlatList,StatusBar,TouchableOpacity,StyleSheet,Dimensions,ToastAndroid} from 'react-native';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/Ionicons';

var { width } = Dimensions.get("window")

class FavoritesScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          loading: true,
          
        };
      }
      componentDidMount() {
        this._isMounted = true;
        this.getfavorites();
      }
      componentWillUnmount() {
        this._isMounted = false
    }
      getfavorites(){
        const user = firebase.auth().currentUser;

    if(user){
      firebase.database().ref(`fav/${user.displayName}`)
        .on('value', (snapshot) => {
          let dupIndex = 0;
          const data = [];
          
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach((id) => {
                data.push({
                 
                  key: id,
                  id: snapshot.val()[id].id,
                  name: snapshot.val()[id].name,
                  price: snapshot.val()[id].price,
                  image: snapshot.val()[id].image,
                  quantity: snapshot.val()[id].quantity,
                  rating: snapshot.val()[id].rating,
                });
              
              dupIndex = 0;
            });
          }
if(this._isMounted){
          this.setState(
            () => ({ data, loading: false }),
           
          );
}
        });
   
    }
  }
      
    renderItem(item) {
        return (
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailScreen',{
            imageData: item.image,
            priceData: item.price,
            nameData: item.name,
            idData: item.id,
            priceData: item.price,
            quantityData: item.quantity,
            ratingData: item.rating,
          })}>
          <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
       
          <Image resizeMode={"contain"} style={{width:width/4,height:width/4, borderRadius: 5}} source={{uri: item.image}} />
          <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
            <View>
              <Text style={{ fontSize:20, fontWeight:"bold"}}>{item.name}</Text>
              
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:"black",fontSize:20, marginTop: 10}}>L.L {item.price}</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                
                <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.count}</Text>
                <TouchableOpacity onPress={()=>this.removeProduct(item)}>
                  <Icon name="trash-outline" size={25} color={"red"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
        </View>
        </TouchableOpacity>
        );
      }

      removeProduct(item) {
    
        const user = firebase.auth().currentUser;
    
        if (user) {
    
         firebase.database().ref(`fav/${user.displayName}/${item.key}`).remove();
         firebase.database().ref(`data/${item.id-1}`).update({fav: `heart-outline`});
         ToastAndroid.show('item removed from favorites!', ToastAndroid.SHORT);
        }
      }
    render(){
        return (
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
    <StatusBar backgroundColor='darkorange' barStyle="light-content"/>

    <View style={{height:45,width:width,alignItems: 'flex-start', justifyContent: 'center', marginLeft:30,borderBottomWidth:1,borderBottomColor:'lightgrey',marginTop:10}} >
      <Text style={{fontSize:25,fontWeight:"bold",color:"black",}}>My Favorites</Text>
      </View>
      <View style={{height:10}} />
      <View style={{flex:1,marginTop:10}}>
        
    {this.state.data.length >0 ?
    <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id.toString()}
          //  ListHeaderComponent={() => this.renderHeader()}
           // ListFooterComponent={() => this.renderFooter()}
           // ItemSeparatorComponent={this.renderSeparator}
          />
          : <View style={{justifyContent:"center",alignItems:"center",flex:1}}><Text>No favorites</Text></View>
       }
            </View>
        
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
      backgroundColor:'white'
    },
  });