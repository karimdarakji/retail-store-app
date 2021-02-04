import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput,BackHandler,StyleSheet,Image ,StatusBar,Alert,ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';


export default class SignInScreen extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            isValidPassword: true,
            secureTextEntry: true,
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
          BackHandler.exitApp();
        });
      }
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }
      userLogin = () => {
        if(this.state.email === '' && this.state.password === '') {
          Alert.alert('Enter details to signin!')
        }
         else {
          this.setState({
            isLoading: true,
          })
          firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((res) => {
            console.log(res)
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: '',
              isValidPassword: true
            })
           // this.props.navigation.navigate('Home')
          })
          //.catch(error => this.setState({ errorMessage: error.message }))
          .catch((error) =>  { this.setState({isLoading: false, isValidPassword: false,}), Alert.alert(error.message)});
         // this.props.navigation.navigate('SignIn')
        }
      }
render(){

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
        <View style={styles.header}>
            
            <Image source={require('../img/logo20.png')} style={{alignSelf:'center', marginTop: 20, resizeMode: 'contain', height: 70}}/>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer]}>
            <ScrollView>
            <Text style={[styles.text_footer,{ color: "black"}]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome name="user-o" size={20} />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={styles.textInput }
                    autoCapitalize="none"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
            </View>
            <Text style={[styles.text_footer, {color: "black", marginTop: 35,}]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                  //  color={/*colors.text*/"orange"}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    value={this.state.password}
                    maxLength={15}
                    autoCapitalize="none"
                    style={[styles.textInput]}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    secureTextEntry={this.state.secureTextEntry ? true : false}
                />
                <TouchableOpacity
                style={{marginRight: 10}}
                    onPress={() => {if(this.state.secureTextEntry == true) 
                        this.setState({secureTextEntry: false})
                else this.setState({secureTextEntry: true})
                }}
                >
                  { this.state.secureTextEntry ?
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                  }
                </TouchableOpacity>
            </View>
            {this.state.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Wrong username or password.</Text>
            </Animatable.View>
}
            

            <TouchableOpacity >
                <Text style={{color: 'darkorange', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                   onPress={() => this.userLogin()}
                    style={styles.signIn}
                >
                <LinearGradient
                    colors={['orange','darkorange']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {color:'#fff'}]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Signup')}
                    style={[styles.signIn, {
                        borderColor: 'darkorange',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: 'darkorange'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
                }
            }



const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'darkorange'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
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
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
        paddingLeft: 15,
        color: 'black',
        borderBottomColor: 'white'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
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