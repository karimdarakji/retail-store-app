import React, { Component } from 'react';
import { View,Text,StyleSheet,Dimensions,Image,StatusBar,ScrollView,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; 
import firebase from '../database/firebase';


export default class Detail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Loading: true,
      data: [],
      count: 0,
      id1: this.props.navigation.state.params.idData,
      name1: this.props.navigation.state.params.nameData,
      image1: this.props.navigation.state.params.imageData,
      price1: this.props.navigation.state.params.priceData,
      quantity1: this.props.navigation.state.params.quantityData,
      rating1: this.props.navigation.state.params.ratingData,

    };
  }
  componentDidMount(){
    firebase.database().ref('data').on('value', (snapshot) => {
      
      this.setState(()=> ({ data: snapshot.val(), loading: false}));
      
    });
  }
  IncrementItem = () => {
    this.setState({ count: this.state.count + 1 });
  }
  DecreaseItem = () => {
    if(this.state.count>0)
    this.setState({ count: this.state.count - 1 });
    
  }
  addToCart(id,image,name,price,quantity,rating) {
    const user = firebase.auth().currentUser;
    var count1 = this.state.count;
    var i ;
    if (user) {
      for(i=0;i<count1;i++){
      firebase.database().ref(`cart/${user.displayName}`)
       // .push({id, image, name, price, quantity, rating});
       .push({id, image, name, price, quantity, rating});
       alert(
        `${this.state.name1} has been added to the cart.`,
       // ToastAndroid.SHORT,
       // ToastAndroid.BOTTOM,
      );
      }
    } 
  }
  
    render(){
        return(
        <View style={styles.container}>
    <StatusBar backgroundColor='darkorange' barStyle="light-content"/>
        <View style={styles.image_container}>
              <Image 
                source={{uri: this.state.image1}}
                style={styles.image}
              />
              </View>
              <View style={styles.back}>
              <Icon 
                name="arrow-back-circle"
                color="darkorange"
                size={35}
                onPress={()=>this.props.navigation.goBack()}
              />
          </View>
          <ScrollView style={styles.footer}>
          
          <Text style={styles.textPrice}></Text>
          <View style={{flexDirection:'row',marginTop:10}}>
          <Text numberOfLines={2} style={styles.textName}>{this.props.navigation.state.params.nameData}</Text>
          <Text style={{color: 'lightgrey',fontWeight:'bold',fontSize:20,marginTop:25,flex:1,textAlign:'right'}}>L.L {this.props.navigation.state.params.priceData}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center',marginTop:15,}}>
            <TouchableOpacity onPress={()=>{this.DecreaseItem()}}>
              <Icon name="ios-remove-circle" size={35} color={"darkorange"} />
            </TouchableOpacity>
            <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{this.state.count}</Text>
            
            <TouchableOpacity onPress={()=>{this.IncrementItem()}}>
              <Icon name="ios-add-circle" size={35} color={"darkorange"} />
            </TouchableOpacity>
            
            <View style={{flexDirection:'row',marginLeft:'auto'}}>
            <TouchableOpacity  style={{width:100,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderRadius:500,
      paddingVertical:3,
      borderColor:'darkorange',
      backgroundColor:'darkorange'}} 
      onPress={()=>{this.addToCart(this.state.id1,this.state.image1,this.state.name1,this.state.price1,this.state.quantity1,this.state.rating1);
           }}>
              <Text style={{color:'white',fontWeight:'bold'}}>Add to cart</Text>
            </TouchableOpacity>
          </View>
          </View>
          <Text  style={styles.textDetail}>The template details auto text code displays the complete template details, including attribute details and metric details.</Text>
          </ScrollView>
          </View>
        )
    }
}

const height = Dimensions.get("screen").height;
const height_image = height * 0.5 * 0.5;

var styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'white'
    },
    
    footer: {
      flex:1,
      paddingHorizontal:40
    },
    image_container: {
      width: height_image,
      height: height_image,
      marginTop: height_image/3,
      
    },
    image: {
      width:'200%',
      height:'150%',
      borderWidth:1,
      borderRadius:7,
      borderColor:'lightgrey',
      
      marginLeft: 25,
      marginTop: 30,
      //borderRadius: height_image/2
    },
    back:{
      position:'absolute',
      left:0,
      marginTop:20,
      marginLeft:15
    },
    status: {
      width:100,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
      borderRadius:50,
      paddingVertical:3,
      borderColor:'green'
    },
    textPrice: {
      color:'darkorange',
      fontWeight:'bold',
      fontSize:30,
      marginTop:50
    },
    textName: {
      color: '#3e3c3e',
      fontWeight:'bold',
      fontSize:20,
      marginTop:25,
      
    },
    textDetail: {
      color:'gray',
      marginTop:30
    },
    button: {
      justifyContent:'center',
      alignItems:'center',
      marginTop:30,
      paddingVertical:10,
      borderRadius:100
    },
    textOrder: {
      color:'white',
      fontWeight:'bold',
      fontSize:18
    }
  });