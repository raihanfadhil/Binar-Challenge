import {Text, TextInput, View,SafeAreaView, ScrollView, 
  StatusBar,Dimensions, StyleSheet, Image,TouchableOpacity} from 'react-native'
import React, { useState ,useEffect} from 'react'
import {BG} from '../../assets/Images'
 import { GoogleSignin,GoogleSigninButton  } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics'
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
import TouchID from 'react-native-touch-id'

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const txtHandler = (enteredName) => {
    setEmail(enteredName)
  };
  const passHandler = (enteredPass) => {
    setPassword(enteredPass);
  };

  const optionalConfigObject = {
    title:"Authentication Required", 
    color : "#e00606"
  }
  
  const pressHandler = () => {
    TouchID.authenticate('Authenticate Using Fingerprint', optionalConfigObject)
    .then(success => {
      alert("Authentication Success!")
      navigation.replace('MainApp');  
    })
    .catch(error => {
      alert('Authentication Failed, Please try again!');
      navigation.navigate("Login")
    })
  }
  
  const onNotificationOpen = () => {
    messaging().onNotificationOpenedApp(remoteMessage =>{
      console.log(
        'Notification caused app to open from background state',
        remoteMessage.notification
      )
    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if(remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          )
        }
      })

    messaging().onMessage(remoteMessage =>{
      console.log(remoteMessage, 'On Message')
    })
  }

  const getToken = async () => {
    const token = await messaging().getToken()
    console.log(token)
  }

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices();
    // Get the users ID token
    const { accessToken, idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const Credential = auth.GoogleAuthProvider.credential(idToken,accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(Credential);
  }

  async function onSignIn(user) {
    crashlytics().log('User signed in.');
    await Promise.all([
        crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
        role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
      }),
    ]);
  }

  const readData = async () => {
    const value = await AsyncStorage.getItem("isLogin");;
    console.log("Value : ",value)
    if (value !== null) {
      navigation.navigate("MainApp");
      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
    }else{
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    readData()
    GoogleSignin.configure({ 
      webClientId: '703937781723-re8rmkuc27osonrprudl89u4qgdp61cs.apps.googleusercontent.com',
    });
    getToken()
    crashlytics().log('App mounted.');
    onNotificationOpen()
  }, []);


  return (
  <SafeAreaView style={styles.background}>
   <StatusBar translucent backgroundColor="transparent" />
    <ScrollView>
      <View style={styles.headerImg}>
        <Image  source = {BG} style={styles.imgLogin}></Image>
        <View style={{paddingTop:20}}>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={'#DDBEBE'} value={email} onChangeText={txtHandler} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor={'#DDBEBE'} value={pass} onChangeText={passHandler} secureTextEntry={true} />
          
          <TouchableOpacity style={styles.btnLogin} 
            onPress= { () => { onSignIn, crashlytics().crash()  
            }}>
            <Text style={styles.textLogin}>Sign In</Text>
          </TouchableOpacity>
          <GoogleSigninButton
              style={styles.btnRegister}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => {
                onGoogleButtonPress()
                .then(async (res) => {
                  if(res){
                    await AsyncStorage.setItem("isLogin","true")
                    pressHandler()  
                    console.log('User account  signed in with google auth!');          
                  } 
                })
                .catch(error => { console.error(error); })
              }}
            />
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default Login

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  background : {
    flex : 1,
    backgroundColor : '#EEEEEE',
    width: screen.width * 1.0,
  },
  headerImg : {
    paddingTop:80
  },
  imgLogin:{
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
  textLogin: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})