// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, Alert, ActivityIndicator,ToastAndroid,BackHandler,Dimensions } from 'react-native';
import firebase from 'firebase';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
var {height, width } = Dimensions.get('window');
export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
}
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        Alert.alert('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('SignIn')
      })
      .catch(error => this.setState({ errorMessage: Alert.alert(error.message), isLoading: false }))      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
       <StatusBar backgroundColor='darkorange' barStyle="light-content"/>
      <View style={styles.header}></View>
      <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
              //  backgroundColor: /*colors.background*/ "orange"
            }]}
        >
          <ScrollView>
          <Text style={[styles.text_footer, {
                color: "black"
            }]}>Name</Text>
            <View style={styles.action}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        /> 
             </View>
             <Text style={[styles.text_footer, {
                color: "black",marginTop: 5
            }]}>Email</Text>
            <View style={styles.action}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        </View>
        <Text style={[styles.text_footer, {
                color: "black",marginTop: 5
            }]}>Password</Text>
            <View style={styles.action}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        </View>
        <View style={styles.button}>
                <TouchableOpacity
                   onPress={() => this.registerUser()}
                    style={styles.signIn}
                >
                <LinearGradient
                    //colors={['#08d4c4', '#01ab9d']}
                    colors={['orange','darkorange']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign up</Text>
                </LinearGradient>
                </TouchableOpacity>
</View>
        <TouchableOpacity
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>  
          Already Registered? Click here to login
        </Text>   
    </TouchableOpacity>   
    </ScrollView>
    </Animatable.View>
    </View>                    
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // display: "flex",
    //flexDirection: "column",
   // justifyContent: "center",
   // padding: 35,
    backgroundColor: 'darkorange'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: "orange",
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
      
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        //paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        //marginTop: Platform.OS === 'ios' ? 0 : -12,
       //   paddingBottom: 5,
        paddingLeft: 15,
        color: 'black',
        borderBottomColor: 'white',
       // textAlign: 'center',
        
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
       // width: '100%'
    },
    signIn: {
        width: width-50,
      // width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  
});