import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

var { width } = Dimensions.get("window")



/* eslint-disable react/prefer-stateless-function */
export default class Cart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      total: 0,
    };
  }
 
  componentDidMount() {
    this.getProductsInCart();
  }
  addToCart({ id, image, name, price, quantity, rating }) {
    //const user = firebase.auth().currentUser;

   // if (user) {
      firebase.database().ref(`cart`)
        .push({  id, image, name, price, quantity, rating });
      //alert(
      //  `${name} of ${price} has been added to the cart.`,
       // ToastAndroid.SHORT,
       // ToastAndroid.BOTTOM,
     // );
     
    } 

  getProductsInCart() {
    

    
      firebase.database().ref(`cart`)
        .on('value', (snapshot) => {
          let dupIndex = 0;
          const data = [];
          
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach((id) => {
              const duplicate = (item, index) => {
                if (item.id === snapshot.val()[id].id) {
                  dupIndex = index;
                  return true;
                }
              };

              if (data.find(duplicate)) {
                data[dupIndex].count += 1;
              } else {
                data.push({
                  count: 1,
                  key: id,
                  id: snapshot.val()[id].id,
                  name: snapshot.val()[id].name,
                  price: snapshot.val()[id].price,
                  image: snapshot.val()[id].image,
                  quantity: snapshot.val()[id].quantity,
                  rating: snapshot.val()[id].rating,
                });
              }
              dupIndex = 0;
            });
          }

          this.setState(
            () => ({ data, loading: false }),
            //() => this.calculateTotal(),
          );
        });
   
      
  }
  
  removeProduct(item) {
    

    
      firebase.database().ref(`cart/${item.key}`).remove();
    
    
  }

  showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancel', onPress: () => null, style: 'cancel' },
        { text: 'OK', onPress: () => null },
      ],
      { cancelable: false },
    );
  }
  
 /* calculateTotal() {
    let totalItems = 0;
    const { data } = this.state;
    const user = firebase.auth().currentUser;

    const total = data.reduce((sum, item) => {
      totalItems += 1;
      return sum + (item.price * item.count);
    }, 0).toFixed(2);
    
    this.setState({ total });

    firebase.database().ref(`cart/${user.uid}`)
      .update({ meta: { total, totalItems } })
      .catch(error => this.showAlert('Firebase Error', error.message));
  }
*/
  renderItem(item) {
    return (
     /* <View >
        
          <Text >{item.count}</Text>
          <Image style={styles.imageFood} source={{ uri: item.image }}  />
        
        <View >
          <Text >{item.name}</Text>
          <Text >${item.price * item.count}</Text>
        </View>
        <TouchableOpacity
          
          onPress={() => this.removeProduct(item)}
        >
          <Icon size={32} name="md-close" />
        </TouchableOpacity>
      </View>*/
      <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
      <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: item.image}} />
      <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
        <View>
          <Text style={{ fontSize:20, }}>{item.name}</Text>
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{fontWeight:'bold',color:"darkorange",fontSize:20, marginTop: 5}}>${item.price*item.count}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.removeProduct(item)}>
              <Icon name="ios-remove-circle" size={35} color={"grey"} />
            </TouchableOpacity>
            <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.count}</Text>
            <TouchableOpacity onPress={()=>this.addToCart(item)}>
              <Icon name="ios-add-circle" size={35} color={"grey"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    );
  }
  
 /* renderSeparator() {
    return <View style={styles.separator} />;
  }
  
  renderHeader() {
    return (
      <View style={styles.cartItemsHeader}>
        <Text style={styles.cartItemsImages}>Qty</Text>
        <View style={styles.cartItemsInfo}>
          <Text style={styles.cartItemsProducts}>Product</Text>
          <Text style={styles.cartItemsAmounts}>Amount</Text>
        </View>
        <Text style={styles.cartItemsAction} />
      </View>
    );
  }
  
  renderFooter() {
    return (
      <View style={styles.cartItemsFooter}>
        <Text style={styles.cartItemsTotalText}>Total</Text>
        <Text style={styles.cartItemsTotalAmount}>
          ${this.state ? this.state.total : 0}
        </Text>
      </View>
    );
  }
*/
  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={70} />
        </View>
      );
    }

    return (
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
      <View style={{height:50,width:width, backgroundColor:"darkorange",alignItems: 'center', justifyContent: 'center'}} >
      <Text style={{fontSize:15,fontWeight:"bold",color:"white",}}>Shopping Cart</Text>
      </View>
      <View style={{height:10}} />
      <View style={{flex:1}}>
        
       
           <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id.toString()}
          //  ListHeaderComponent={() => this.renderHeader()}
          //  ListFooterComponent={() => this.renderFooter()}
           // ItemSeparatorComponent={this.renderSeparator}
          />
         <Text>Your Cart is Empty</Text>
        
      </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  imageFood:{
    width:100,
    height:100,
    backgroundColor:'transparent',
    //position:'absolute',
    //top:-45
  },
});