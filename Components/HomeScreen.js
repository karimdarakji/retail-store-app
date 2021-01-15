import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase from 'firebase';

var {height, width } = Dimensions.get('window');
var i;


 export default class HomeScreen extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state={
      //data: data,
      Loading: true,
      data: [],
      
}
 }
/*_rating(item){
  let rating = [];
  for(i=0;i<item;i++){
    rating.push(
      <Image 
        source={require("../img/star.png")}
        style={{width:15, height:15, marginRight:3}}
        resizeMode="cover"
      />
    )
  }
  return rating;
}
*/

renderItem = ({item}) => {
  return(
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailScreen',{imageData: item.image,priceData: item.price,nameData: item.name})} style={styles.divFood}>
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
           
            <Text style={{fontWeight:"bold",fontSize:20, marginBottom: 10}}>${item.price}</Text>
           
           <TouchableOpacity  style={styles.status} onPress={()=>this.addToCart(item)} >
              <Text style={{fontWeight:"bold", fontSize: 15,color:"white"}}>Add To Cart</Text>
  </TouchableOpacity>
          </TouchableOpacity>
  )
}

componentDidMount() {
  this._isMounted = true;
  var config = {
    //apiKey: "**********",
   // authDomain: "**********.firebaseapp.com",
    databaseURL: "https://retail-app-466b5-default-rtdb.firebaseio.com",
    projectId: "retail-app-466b5",
   // storageBucket: "********.appspot.com",
   // messagingSenderId: "*********"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }
  // firebase.initializeApp(config);   
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
           // <View style={styles.container}>
           <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20}}>
                
                <ScrollView
                >
                  <View style={{alignItems:'center'}}>
                <Image source = {require('../img/charcutier.png')} style={{resizeMode:'contain',height:180,width:350, borderRadius: 20  }} />
                </View>
                <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, marginTop: 15}}>
                  Shop by Category
                  </Text>
                  <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{width:720,height:160}}
                  decelerationRate="fast"
                  pagingEnabled
                  >
                    
        <TouchableOpacity onPress={()=>{}} style={styles.button}>
          
        <View style={{flexDirection:'row', width:'100%', marginTop:'5%'}}>
            <View style={{alignItems:'center',  paddingRight:'5%', paddingBottom:'2%'}}>
          
            <Image
     source={require('../img/bakery.png')}
     style={styles.ImageIconStyle}
     />
    <Text>Bakery</Text>
          </View>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{}} style={styles.button}>
          
        <View style={{flexDirection:'row', width:'100%', marginTop:'5%'}}>
            <View style={{alignItems:'center',  paddingRight:'5%', paddingBottom:'2%'}}>
          
            <Image
     source={require('../img/water.png')}
     style={styles.ImageIconStyle}
     />
    <Text>Water</Text>
          </View>
          </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{}} style={styles.button}>
          
        <View style={{flexDirection:'row', width:'100%', marginTop:'5%'}}>
            <View style={{alignItems:'center',  paddingRight:'5%', paddingBottom:'2%'}}>
          
            <Image
     source={require('../img/eggs.png')}
     style={styles.ImageIconStyle}
     />
    <Text>Eggs</Text>
          </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}} style={styles.button}>
          
        <View style={{flexDirection:'row', width:'100%', marginTop:'5%'}}>
            <View style={{alignItems:'center',  paddingRight:'5%', paddingBottom:'2%'}}>
          
            <Image
     source={require('../img/frozen.png')}
     style={styles.ImageIconStyle}
     />
    <Text>Frozen</Text>
          </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}} style={styles.button}>
          
        <View style={{flexDirection:'row', width:'100%', marginTop:'5%'}}>
            <View style={{alignItems:'center',  paddingRight:'5%', paddingBottom:'2%'}}>
          
            <Image
     source={require('../img/fruits.png')}
     style={styles.ImageIconStyle}
     />
    <Text>Fruits</Text>
          </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}} style={styles.button}>
          
        <View style={{flexDirection:'row', width:'100%', marginTop:'5%'}}>
            <View style={{alignItems:'center',  paddingRight:'5%', paddingBottom:'2%'}}>
          
            <Image
     source={require('../img/health.png')}
     style={styles.ImageIconStyle}
     />
    <Text>Health</Text>
          </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}} style={styles.button}>
          
        <View style={{flexDirection:'row', width:'100%', marginTop:'5%'}}>
            <View style={{alignItems:'center',  paddingRight:'5%', paddingBottom:'2%'}}>
          
            <Image
     source={require('../img/bakery.png')}
     style={styles.ImageIconStyle}
     />
    <Text>Bakery</Text>
          </View>
          </View>
          </TouchableOpacity>
          
                  </ScrollView>
          
               <Text style={{fontSize: 20, paddingHorizontal: 20, marginTop: 20, fontWeight:"bold"}}>Featured items</Text>   
               
               <FlatList
              //horizontal={true}
              
              data={this.state.data}
              numColumns={2}
              renderItem={this.renderItem}
              keyExtractor={(item, index)=>index.toString()}
            />

          </ScrollView>
          
            </View>
       
        
        );
    }
    addToCart({ id, image, name, price, quantity, rating }) {
      //const user = firebase.auth().currentUser;
  
     // if (user) {
        firebase.database().ref(`cart`)
          .push({  id, image, name, price, quantity, rating });
        alert(
          `${name} of ${price} has been added to the cart.`,
         // ToastAndroid.SHORT,
         // ToastAndroid.BOTTOM,
        );
       
      } 
  }
    
  const add = new HomeScreen();




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginVertical: 20,
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    ImageIconStyle: {
    
      //padding: 10,
      margin: 5,
     
      height: 80,
      width: 80,
      resizeMode: 'stretch',
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
   /* divFood:{
      width:(width/2)-20,
      padding:10,
      borderRadius:10,
      marginTop:55,
      marginBottom:5,
      marginLeft:10,
      alignItems:'center',
      elevation:8,
      shadowOpacity:0.3,
      shadowRadius:50,
      backgroundColor:'white',
    }, */
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
      //position:'absolute',
      //top:-45
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