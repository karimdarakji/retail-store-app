import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Dimensions,StatusBar,ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../database/firebase';
import Swiper from 'react-native-swiper';


var {height, width } = Dimensions.get('window');
var i;
var dataCat = [{
  id: 1,
  name: 'Bakery',
  image: require('../img/bakery.png'),

},
{
  id: 2,
  name: 'Beverages',
  image: require('../img/water.png'),
},
{
  id: 3,
  name: 'Eggs',
  image: require('../img/eggs.png'),
},
{
  id: 4,
  name: 'Frozen',
  image: require('../img/frozen.png'),
},
];

 export default class HomeScreen extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state={
      //data: data,
      Loading: true,
      data: [],
      dataCat: dataCat,
      
}
 }


renderItem = ({item}) => {
  return(
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailScreen',{
      imageData: item.image,
      priceData: item.price,
      nameData: item.name,
      idData: item.id,
      priceData: item.price,
      quantityData: item.quantity,
      ratingData: item.rating,
      })} style={styles.divFood}>
          <TouchableOpacity  style={{alignSelf:'flex-end'}}onPress={() => {if(item.fav == "heart-outline")
          this.like(item)
         // else this.unlike(item)
          }}>
            <Icon name={item.fav} size={25} color="red"  />
          </TouchableOpacity>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
           // source={item.image}
           source={{uri: item.image}} />
            <View 
           /* style={{height:((width/2)-20)-90, backgroundColor:'transparent', width:((width/2)-20)-10}} /> */
           style={{height:20, backgroundColor:'transparent', width:20}} />
            <Text numberOfLines={1} style={{fontSize:15,textAlign:'center', }}>
              {item.name}
            </Text>
           
            <Text style={{fontWeight:"bold",fontSize:20, marginBottom: 10}}>L.L {item.price}</Text>
           
           <TouchableOpacity  style={styles.status} onPress={()=>this.addToCart(item)} >
              <Text style={{fontWeight:"bold", fontSize: 15,color:"white"}}>Add To Cart</Text>
  </TouchableOpacity>
          </TouchableOpacity>
  )
}

componentDidMount() {
  this._isMounted = true; 
  firebase.database().ref('data').on('value', (snapshot) => {
    if (this._isMounted) {
    this.setState(()=> ({ data: snapshot.val(), loading: false}));
    }
  });
}
componentWillUnmount() {
  this._isMounted = false;
}
    render(){
        return (
          
           <View style={{ 
             flex: 1, 
             backgroundColor: 'white', 
             }}>
    <StatusBar backgroundColor='darkorange' barStyle="light-content"/>
                
                <ScrollView>
                  
                  <View style={{alignItems:'center', paddingTop: 10}}>
                  <Swiper style={{height:width/2,}} 
                   showsButtons={false} autoplay={true} autoplayTimeout={10} activeDotColor={'white'} >

                  <Image source = {require('../img/images.png')} style={{resizeMode:'contain',height:width/2,width:width-40, alignSelf:'center', borderRadius: 5}} />
                  <Image source = {require('../img/images2.jpg')} style={{resizeMode:'contain',height:width/2,width:width-40, alignSelf:'center', borderRadius: 10}} />

               
                <Image source = {require('../img/charcutier.png')} style={{resizeMode:'contain',height:width/2,width:width-40, alignSelf:'center', borderRadius: 10 }} />
               </Swiper>
                </View>
                <View style={{marginTop:10, borderColor:'lightgrey'}}>
                <Text style={{ fontSize: 20, fontWeight: 'normal', paddingHorizontal: 20, marginTop: 10, textAlign: 'center', color:'black'}}>
                  SHOP BY CATEGORY
                  </Text>
                  <FlatList
                 
                  horizontal 
                  data={this.state.dataCat}
                 showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index)=>index.toString()}
                  renderItem={({ item }) =>{      
                    return (
                      <View style={{paddingTop: 10}}
                      >
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('category',{
                        catname: item.name
                      })}}>
                      <Image source={item.image} style={styles.ImageIconStyle} />
                      
                        <Text style={{textAlign: 'center'}}>{item.name}</Text>
                      
                      </TouchableOpacity>
                      </View>
                    )}}/>
                
           </View>
           <View style={{marginTop:10, borderTopWidth: 1, borderColor:'lightgrey'}}>
               <Text style={{fontSize: 20, paddingHorizontal: 20, marginTop: 20, fontWeight:"bold"}}>Featured items</Text>   
               
               <FlatList
               // initialNumToRender = {1}
              //horizontal={true}    
            //  removeClippedSubviews = {true} 
             // maxToRenderPerBatch={20}
            //  initialNumToRender={2}
              data={this.state.data}
              numColumns={2}
              renderItem={this.renderItem}
             // keyExtractor={(item, index)=>index.toString()}
             keyExtractor={item => item.id.toString()}
            />
            </View>

          </ScrollView>
            </View>
        );
    }
    
    addToCart({ id, image, name, price, quantity, rating }) {
      const user = firebase.auth().currentUser;
  
      if (user) {
        firebase.database().ref(`cart/${user.displayName}/`)
          .push({  id, image, name, price, quantity, rating });
        alert(
          `${name} of ${price} has been added to the cart.`,
         // ToastAndroid.SHORT,
         // ToastAndroid.BOTTOM,
        );
       
      } 
    }
      like({id, image, name, price, quantity, rating}){
        const user = firebase.auth().currentUser;
  
      if (user) {
        
        firebase.database().ref(`data/${id-1}`).update({fav: `heart`});
        firebase.database().ref(`fav/${user.displayName}/`).push({id, image, name, price, quantity, rating});
        ToastAndroid.show('item added to favorites!', ToastAndroid.SHORT);
      }
    }
      unlike(item){
        const user = firebase.auth().currentUser;

    if (user) {
    
     // firebase.database().ref(`cart/${item.key}`).remove();
     
        firebase.database().ref(`data/${item.id-1}`).update({fav: `heart-outline`});
       // firebase.database().ref(`fav/${user.displayName}/${item.key}`).remove();
      }
      }
  }
    




const styles = StyleSheet.create({
    container: {
     backgroundColor: 'whitesmoke',
    },
    ImageIconStyle: {
      margin: 5,
      height: 80,
      width: 80,
      resizeMode: 'stretch',
      borderRadius: 50
    },
    button: {
      marginTop: 20,
      height: 130,
      width: 110,
      margin: 5,
      backgroundColor: '#f5f5f5',
      borderRadius: 20,
      padding: 10,
      marginBottom: 300,
      shadowColor: '#303838',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      shadowOpacity: 0.35,
      
    },
    divFood:{
      width:(width/2)-20,
      padding:10,
      borderRadius:10,
      marginTop:20,
      marginBottom:5,
      marginLeft:10,
      alignItems:'center',
      elevation:8,
      shadowOpacity:0.3,
      shadowRadius:50,
      backgroundColor:'white',
    },
    imageFood:{
      width:100,
      height:100,
      backgroundColor:'transparent',
    },
    rating: {
      marginTop:5,
      flexDirection:'row'
    },
    status: {
      width:100,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderRadius:500,
      paddingVertical:3,
      borderColor:'darkorange',
      backgroundColor:'darkorange'
    },
  });