/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StatusBar,View,Text,Button,Image,Item,Input,Dimensions, TouchableOpacity,StyleSheet} from 'react-native';
import {  createAppContainer,createSwitchNavigator } from 'react-navigation';  
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from './Components/HomeScreen';
import ServicesScreen from './Components/ServicesScreen';
import FavoritesScreen from './Components/FavoritesScreen';
import CartScreen from './Components/CartScreen';
import ProfileScreen from './Components/ProfileScreen';
import  {createStackNavigator} from 'react-navigation-stack';
import Detail from './Components/Detail';
import BarcodeScanner from './Components/BarcodeScanner';
import { SearchBar } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import SignInScreen from './Components/SignInScreen';
import Signup from './Components/Signup';
import firebase from './database/firebase';
import SearchScreen from './Components/searchbar';
import Icon from 'react-native-vector-icons/Ionicons'; 
import CategoriesScreen from './Components/Categoriespage';
var { width } = Dimensions.get("window")

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      query: '',
      data: [],
    };
    
  }
  //fucntion for search
  handleSearch = (text) => {
    console.log("text", text);
    this.setState({ query: text })
  }
  
 // state = { loggedIn: null };
  componentDidMount() {
    SplashScreen.hide();
    //this.navigation.setParams({ handleSearch: (() => this.handleSearch )});
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }
  componentWillUnmount(){
    this.state.loggedIn = null;
  }

  
  
  render() {
    if(this.state.loggedIn == true){
      
    return <AppContainer /> 
    }
    else return <SignInScreen/>
    
  }
}


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./img/logo20.png')}
        style={{ width: 30, height: 30,  }}
      />
    );
  }
}

const DashboardTabNavigator = createBottomTabNavigator({  
  Home: {
    screen:HomeScreen,
    navigationOptions:{
      
      tabBarLabel:'Home',
      tabBarIcon:({tintColor})=>(
        <Icon name="home-outline" color={tintColor} size=
        {25}/>
      ),
      tabBarOptions: {activeTintColor:'darkorange'},
    
    }
  },
  
  Services: {
    screen:ServicesScreen,
    navigationOptions:{
      tabBarLabel:'Services',
      tabBarIcon:({tintColor})=>(
        <Icon name="attach-outline" color={tintColor} size={25}/>
      ),
      tabBarOptions: {activeTintColor:'darkorange'},
    }
  },
  Favorites: {
    screen:FavoritesScreen,
    navigationOptions:{
      tabBarLabel:'Favorites',
      tabBarIcon:({tintColor})=>(
        <Icon name="heart-circle" color={tintColor} size={25}/>
      ),
      tabBarOptions: {activeTintColor:'darkorange'},
    }
  },
  Cart: {
    screen:CartScreen,
    navigationOptions: ({navigation}) => ({
      
      tabBarLabel:'Cart',
      tabBarIcon:({tintColor})=>(
        <Icon name="basket-outline" color={tintColor} size={25}/>
      ),
      tabBarOptions: {activeTintColor:'darkorange'},
      header: null,
    }),
  },
  Profile: {
    screen:ProfileScreen,
    navigationOptions:{
      tabBarLabel:'Profile',
      tabBarIcon:({tintColor})=>(
        <Icon name="person-outline" color={tintColor} size={25}/>
      ),
      tabBarOptions: {activeTintColor:'darkorange'},
    }
  },
  
},
{
  navigationOptions: ({navigation}) => {
    const {routeName} = navigation.state.routes
        [navigation.state.index];
        if(routeName == 'Cart' || routeName == 'Services'){
    return {
     
      headerShown: false,
    }
    };
  }
});  

 

const DashboardStackNavigator = createStackNavigator(
  {
  o: {
      screen: DashboardTabNavigator,
      navigationOptions: {
    // headerShown: false,
      }
    },
 // DashboardTabNavigator: DashboardTabNavigator,
  DetailScreen: {
    screen: Detail,
    navigationOptions: {
      headerShown: false
  }
  },
  BarcodeScreen: {
    screen: BarcodeScanner,
    navigationOptions: {
      headerShown: false
  }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false
    }
    
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerShown: false,
  }
  },
  searchbar: {
    screen: SearchScreen,
    navigationOptions: {
      headerShown: false,
  }
},
category: {
  screen: CategoriesScreen,
  navigationOptions: {
    headerShown: false,
},
}
  
  
},
/*{
  initialRouteName: "SignIn",
}, */
{
  defaultNavigationOptions: ({navigation})=> {
    
    return {
      
      
      headerStyle: {
       
        backgroundColor: 'darkorange',
        height: 45,
      },
      headerLeft: () => <View style={{marginLeft: 10}}><LogoTitle/></View>,
      headerTitle: () => (
        <TouchableOpacity onPress={()=>navigation.navigate('searchbar')}>
        <View style={styles.search}>
        <Icon name="search-outline" color='grey' size={20} style={{marginRight: 10,margin:3}} />
<Text style={{color:'lightgrey', margin:3}}>
  search for products
</Text>
        </View>
        
        </TouchableOpacity>
       /* <TouchableOpacity onPress={()=>this.props.navigation.navigate('SearchScreen')}>
        <TextInput
      <Icon name="search1" color='white' size={25} style={{marginRight: 10}} />
       // inputStyle={{backgroundColor: 'white', marginTop: 7}}
       // containerStyle={{backgroundColor: 'transparent', borderBottomColor:'transparent', borderTopColor: 'transparent', }}
   // placeholderTextColor={'#g5g5g5'}
       // round
       // searchIcon={{ size: 24 }}
        placeholder="Search for products"
       // inputContainerStyle={{backgroundColor: 'white', height: 35,}}
        //value={navigation.getParam('query')}
        
        
      />
    </TouchableOpacity>
      */
      ), 
      
          
    };
  }
}

);



const AppContainer = createAppContainer(DashboardStackNavigator);

const styles = StyleSheet.create({
  search: {
    height: 30,
    borderRadius:10,
    flexDirection:'row',
    borderWidth:1,
    borderColor:'lightgrey',
    backgroundColor: '#fff',
    
    
  },
});


