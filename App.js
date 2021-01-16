/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet,View,Text,Button,Image,Item,Input} from 'react-native';
import {  createAppContainer,createSwitchNavigator } from 'react-navigation';  
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign';  
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

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return <AppContainer />
    
    
  }
}
export default App;

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
        <Icon name="home" color={tintColor} size=
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
        <Icon name="paperclip" color={tintColor} size={25}/>
      ),
      tabBarOptions: {activeTintColor:'darkorange'},
    }
  },
  Favorites: {
    screen:FavoritesScreen,
    navigationOptions:{
      tabBarLabel:'Favorites',
      tabBarIcon:({tintColor})=>(
        <Icon name="star" color={tintColor} size={25}/>
      ),
      tabBarOptions: {activeTintColor:'darkorange'},
    }
  },
  Cart: {
    screen:CartScreen,
    navigationOptions: ({navigation}) => ({
      
      tabBarLabel:'Cart',
      tabBarIcon:({tintColor})=>(
        <Icon name="shoppingcart" color={tintColor} size={25}/>
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
        <Icon name="user" color={tintColor} size={25}/>
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
    DashboardTabNavigator: {
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
 /* SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerShown: false,
  }
  },*/
  
  
  
},
/*{
  initialRouteName: "SignIn",
}, */
{
  defaultNavigationOptions: ({navigation})=> {
    return {
      
      
      headerStyle: {
       
        backgroundColor: 'darkorange',
        height: 50,
      },
      headerLeft: () => <View style={{marginLeft: 10}}><LogoTitle/></View>,
      headerRight: () => (
      
        //<Icon name="search1" color='white' size={25} style={{marginRight: 10}}/>
        <SearchBar
        inputStyle={{backgroundColor: 'white', marginTop: 7}}
    containerStyle={{backgroundColor: 'transparent', borderBottomColor:'transparent', borderTopColor: 'transparent', }}
   // placeholderTextColor={'#g5g5g5'}
        round
        searchIcon={{ size: 24 }}
        placeholder="Search..."
        inputContainerStyle={{backgroundColor: 'white', width: 260, height: 35}}
        
        
      />
      ), 
      
          
    };
  }
}

);

const appswitch = createSwitchNavigator({
  route1: { screen: SignInScreen},
  route2: { screen: DashboardStackNavigator},
 // route3: DashboardStackNavigator,
},
{
  initialRouteName: "route1"
})
const AppContainer = createAppContainer(appswitch);
//export default createAppContainer(AppSwitchNavigator);  

