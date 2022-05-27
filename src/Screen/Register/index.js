import {Text, TextInput, View,SafeAreaView, ScrollView, 
  StatusBar,Dimensions, StyleSheet, Image,TouchableOpacity} from 'react-native'
import React, { useState ,useEffect} from 'react'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database , {firebase} from '@react-native-firebase/database';
import { BG } from '../../assets/Images';
import Auth from '../../Service/Auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/reducer/user';

function Register({navigation}) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [pass, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const txtHandler = (enteredName) => {
    setName(enteredName)
  };
  const passHandler = (enteredPass) => {
    setPassword(enteredPass);
  };
  const emailHandler = (enteredEmail) => {
    setEmail(enteredEmail);
  };


  const readData = async () => {
    const value = await AsyncStorage.getItem("isLogin");;
    console.log("Value : ",value)
    if (value !== null) {
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }else{
      navigation.navigate("Register");
    }
  };

  useEffect( () => {
    // readData()
    //  console.log("uid , ",auth().currentUser.uid)      
  }, []);


  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView>
        <View style={{paddingTop: 50}}>
          <Image source={BG} style={styles.imglogin}></Image>
        <View style={{ paddingTop: 40 }}>
          <TextInput style={styles.input} placeholder="Enter Your Name" placeholderTextColor={'#DDBEBE'} value={name} onChangeText={txtHandler}   />
          <TextInput style={styles.input} placeholder="Enter Your Email" placeholderTextColor={'#DDBEBE'} value={email} onChangeText={emailHandler}   />
          <TextInput style={styles.input} placeholder="Enter Your Password" placeholderTextColor={'#DDBEBE'} value={pass} onChangeText={passHandler} secureTextEntry={true}  testID="password_input" />
          <TouchableOpacity style={styles.btnRegister}
            onPress= {   () =>{
              auth()
              .createUserWithEmailAndPassword(email, pass)
              .then(async (res) => {
                if(res){
                  console.log('User account  created and signed in with firebase auth!');                 
                  const userData = {
                    name: name, // pass your name
                    email: email, //pass your email 
                    pass:pass,
                    bio: "",
                    avatar: "https://firebasestorage.googleapis.com/v0/b/chattingapp-3b6b9.appspot.com/o/default-profile-icon-24.jpg?alt=media&token=830b644f-9ec5-48a2-ad14-0dffc01b8a5e",
                    id: auth().currentUser.uid,
                  }
                  firebase.app()
                  .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
                  .ref('/users/'+auth().currentUser.uid)
                  .set(userData)
                  navigation.navigate("Login")
                }       
              })
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
            } }>
            <Text style={styles.textRegister}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogin} 
            onPress={() => {
              setName('')
              setEmail('')
              setPassword('')
              navigation.navigate('Login')
            } }>
            <Text style={styles.textLogin}>Sign In</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

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
  btnRegister: {
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
    marginBottom : 10
  },
  btnLogin: {
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
    color: 'white',
  },
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 6,
    width: screen.width * 0.8,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  buttonR: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    width: screen.width * 0.82,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  textR: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
})