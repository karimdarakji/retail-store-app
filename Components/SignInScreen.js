import React, {Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';

/*firebaseConfig = {
    apiKey: "AIzaSyDjo0MT4w5Qsuy4j6skgGaW8_60BYB9HVU",
  // databaseURL: "https://retail-app-466b5-default-rtdb.firebaseio.com",
    projectId: "retail-app-466b5",
};

firebase.initializeApp(firebaseConfig); */
export default class SignInScreen extends Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
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
              password: ''
            })
            this.props.navigation.navigate('Home')
          })
          //.catch(error => this.setState({ errorMessage: error.message }))
          .catch((error) =>  { this.setState({isLoading: false}), Alert.alert(error.message)});
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
   
   // const { colors } = useTheme();

   //const { signIn } = React.useContext(AuthContext);

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='darkorange' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
              //  backgroundColor: /*colors.background*/ "orange"
            }]}
        >
            <ScrollView>
            <Text style={[styles.text_footer, {
              //  color: /*colors.text*/ "orange"
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                  //  color={/*colors.text*/"orange"}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={styles.textInput }
                       // color: /*colors.text*/"orange"
                       value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
                    
                    //autoCapitalize="none"
                />
                
              <Text /*<Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>*/
            />
            </View>
            <Text /*
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View> *//>
            
            

            <Text style={[styles.text_footer, {
               // color: /*colors.text*/"orange",
                marginTop: 35
            }]}>Password</Text>
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
                   // secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                     //   color: /*colors.text*/"orange"
                    }]}
                    //autoCapitalize="none"
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                />
                <TouchableOpacity
                   // onPress={updateSecureTextEntry}
                >
                  
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    
                </TouchableOpacity>
            </View>
            
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            
            

            <TouchableOpacity >
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                   //  onPress={() => this.props.navigation.navigate('Home')}
                   onPress={() => this.userLogin()}
                    style={styles.signIn}
                    //onPress={() => {loginHandle( data.username, data.password )}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('Signup')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
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
        marginTop: 10,
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
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });