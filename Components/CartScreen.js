import React, { Component } from 'react';
import {View,Text,Image,Alert,FlatList,StatusBar,TouchableOpacity,ActivityIndicator,StyleSheet,Dimensions,} from 'react-native';
import firebase from '../database/firebase';
import Icon from 'react-native-vector-icons/Ionicons';

var { width } = Dimensions.get("window")


export default class Cart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      
    };
  }
 
  componentDidMount() {
    this._isMounted = true;
    this.getProductsInCart();
 
}
componentWillUnmount() {
  this._isMounted = false;
}

  addToCart({ id, image, name, price, quantity, rating }) {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase.database().ref(`cart/${user.displayName}`)
        .push({  id, image, name, price, quantity, rating });
      
     
    } 
  }

  getProductsInCart() {
    
    const user = firebase.auth().currentUser;

    if(user){
      firebase.database().ref(`cart/${user.displayName}`)
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
if(this._isMounted){
          this.setState(
            () => ({ data, loading: false }),
           // () => this.calculateTotal(),
          );
          }
        });
   
    }
  }
  
  removeProduct(item) {
    
    const user = firebase.auth().currentUser;

    if (user) {
    
     // firebase.database().ref(`cart/${item.key}`).remove();
     firebase.database().ref(`cart/${user.displayName}/${item.key}`).remove();
    }
  }
  clearCart() {
    
    const user = firebase.auth().currentUser;

    if (user) {
    
     // firebase.database().ref(`cart/${item.key}`).remove();
     firebase.database().ref(`cart/${user.displayName}/`).remove();
    }
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
   // const user = firebase.auth().currentUser;

    total = data.item.price * data.item.count;
    
    this.setState({ total });

    firebase.database().ref(`cart/`)
      .update({ meta: { total, totalItems } })
      .catch(error => this.showAlert('Firebase Error', error.message));
  }
*/
  renderItem(item) {
    return (
     
      <View style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
      <Image resizeMode={"contain"} style={{width:width/4,height:width/4, borderRadius: 5}} source={{uri: item.image}} />
      <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
        <View>
          <Text style={{ fontSize:20, fontWeight:"bold"}}>{item.name}</Text>
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{color:"black",fontSize:20, marginTop: 10}}>L.L {item.price*item.count}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.removeProduct(item)}>
              <Icon name="ios-remove-circle" size={35} color={"darkorange"} />
            </TouchableOpacity>
            <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.count}</Text>
            <TouchableOpacity onPress={()=>this.addToCart(item)}>
              <Icon name="ios-add-circle" size={35} color={"darkorange"} />
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
  */
  
  
  renderFooter() {
    return (
      <View style={styles.cartItemsFooter}>
        <View style={{flexDirection:"row"}}>
        <Text style={styles.cartItemsTotalText}>Total: </Text>
        <Text style={{fontSize:24,textAlign:"right"}}>L.L {this.onTotal()}</Text>
        </View>
        <View style={{justifyContent:'space-between',marginLeft:'auto',}}>
        <TouchableOpacity style={{backgroundColor:"darkorange",borderRadius:500,marginTop:20,width:100}} onPress={()=>Alert.alert('order complete!')}>
           <Text style={{textAlign:"center",color:"white",fontSize:25,fontWeight:"bold"}}>Order</Text>
        </TouchableOpacity>
        </View>
      </View>
    
      
    );
  }

onTotal(){
  var total = 0;
  const car = this.state.data;
  var i;
  for(i=0;i<car.length;i++){
    total = total + (car[i].price*car[i].count);
  }
return total;
}

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={70} />
        </View>
      );
    }

    return (
      
      <View style={{flex:1,alignItems: 'center', justifyContent: 'center', backgroundColor:'white'}}>
    <StatusBar backgroundColor='darkorange' barStyle="light-content"/>

      <View style={{height:45,width:width,alignItems: 'flex-start', justifyContent: 'center', marginLeft:30,borderBottomWidth:1,borderBottomColor:'lightgrey',marginTop:10}} >
      <Text style={{fontSize:25,fontWeight:"bold",color:"black",}}>My Cart</Text>
      </View>
      <View style={{height:10}} />
      <View style={{flex:1,marginTop:10}}>
        
       {this.onTotal()>0 ?
           <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id.toString()}
          //  ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => this.renderFooter()}
           // ItemSeparatorComponent={this.renderSeparator}
          />
          : <View style={{justifyContent:"center",alignItems:"center",flex:1}}><Text>Cart is empty</Text></View>
       }
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
  cartItemsFooter: {
    flex: 1,
    marginTop:15,
    paddingVertical: 15,
    paddingLeft: '5%',
    paddingRight: '15%',
  },
  cartItemsTotalText: {
    fontSize: 24,
    fontWeight:"bold",
    color: "black",
    //marginRight: 20,
    textAlign:"left"
  },
  cartItemsTotalAmount: {
    fontSize: 30,
    color: "black",
  },
});
