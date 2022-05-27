import {Text, TextInput, View,SafeAreaView, ScrollView, 
  StatusBar,Dimensions, StyleSheet, Image,TouchableOpacity} from 'react-native'
import React, { useState ,useEffect} from 'react'
import {BG} from '../../assets/Images'
import SimpleToast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import Auth from '../../Service/Auth';
import { useDispatch ,useSelector} from 'react-redux';
import { setUser } from '../../Redux/reducer/user';
 import database , {firebase} from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Login({navigation}) {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.User);
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const txtHandler = (enteredName) => {
    setEmail(enteredName)
  };
  const passHandler = (enteredPass) => {
    setPassword(enteredPass);
  };

  const readData = async() =>{
    if (userData.id) {
    // navigation.navigate("Home");
      await Auth.setAccount(userData)
    }
  }
 
  useEffect( () => {
    readData()
      if (userData.id) {
      // navigation.navigate("Home");
    
        navigation.navigate("Home")
        navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
        });
      }else{
        navigation.navigate("Login");
      }
  },[userData.id]);


  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <ScrollView>
        <View style={{paddingTop:50}}>
          <Image source={BG} style={styles.imglogin}></Image>
          
        <View style={{ paddingTop: 50 }}>
          <TextInput style={styles.input} placeholder="Enter your Email" placeholderTextColor={'#DDBEBE'} value={email} onChangeText={txtHandler}/>
          <TextInput style={styles.input} placeholder="Enter your Password" placeholderTextColor={'#DDBEBE'} value={pass} onChangeText={passHandler} secureTextEntry={true}/>
          <TouchableOpacity style={styles.btnLogin}
            onPress= {   () =>{         
              auth()
              .signInWithEmailAndPassword(email, pass)
              .then(async (res) => {
              if(res){
                await AsyncStorage.setItem("isLogin","true")
                await AsyncStorage.setItem("loginVia","FirebaseAuth")   
                await AsyncStorage.setItem("email",email)
                      
                firebase.app()
                .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
                .ref('/users/')
                .orderByChild("email")
                .equalTo(email)
                .once("value")
                .then(async snapshot => {
                  if (snapshot.val() == null) {
                    console.log("snap ",snapshot.val())
                    SimpleToast.show("Invalid Email Id!");
                    return false;
                  }
                
                  let userData = Object.values(snapshot.val())[0];
                  console.log('User data: ', userData);                          
                  dispatch(setUser(userData));
                  await Auth.setAccount(userData)
                  await AsyncStorage.setItem("id",userData.id)
                  await AsyncStorage.setItem("email",userData.email)
                  SimpleToast.show("Login Successfully!");
                  navigation.navigate("Home")
                })
                                     
                console.log('User account  signed in with firebase auth!');                              
              }})
              
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }
                if (error.code === 'auth/wrong-password') {
                  alert('The Password is Invalid!');
                }
                if (error.code === 'auth/user-not-found') {
                  alert('There is no user record with this email!');
                }
                if (email=== null && pass===null) {
                  alert('Fill Email and Password!');
                }
                console.error(error);
              });  
            }}>
            <Text style={styles.textLogin}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnRegister} onPress={ () =>{ 
            navigation.navigate("Register")
          }}>
            <Text style={styles.textRegister}>Sign Up!</Text>
          </TouchableOpacity>    
            
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    width: screen.width * 1.0,
    height: screen.height * 1.0,
  },
  imglogin: {
    backgroundColor:'#FFFFFF',
    width: screen.width * 0.8,
    height : screen.height * 0.25,
    alignSelf:'center',
  },
  input: {
    padding: 10,
    marginVertical: 10,
    width: screen.width * 0.8,
    fontSize: 18,
    borderColor: '#694E4E',
    borderWidth: 1,
    borderRadius: 15,
    alignSelf:'center'
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: screen.width * 0.8,
    height : 50,
    alignSelf:'center',
    backgroundColor: 'black',
    marginBottom : 20
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  btnRegister: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    width: screen.width * 0.8,
    height : 50,
    alignSelf:'center',
    backgroundColor: '#EEEEEE',
  },
  textRegister: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },
})