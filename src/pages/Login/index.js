import { Text, TextInput,View ,
    SafeAreaView,ScrollView,StatusBar,
    Dimensions,StyleSheet,Image,
    TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { useEffect } from 'react'
import { BG } from '../../assets/images'
import { useNavigation } from '@react-navigation/native'
import { useDispatch,useSelector} from 'react-redux'
import {  fetchingLogin } from '../../actions'
import NetInfo from '@react-native-community/netinfo';

const Login = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [regEmail, setregEmail] = useState('');
  const [checkPass, setcheckPass] = useState('');
  const [connection, setConnection] = useState(false);
  const name = useSelector(state => state.appData.name)

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        setConnection(true);
        console.log('Connection succes!');
      } else {
        setConnection(false);
        console.log('Connection failed!');
      }
    });
      if (name) {
        navigation.navigate("Home");
        navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
        });
      }else{
        navigation.navigate("Login");
      }
  }, [name]);

  function checkEmail(email){
    let checkVar = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    let state;
    let regEmail=''
    let addChar = /[@]/;
    
    if (checkVar.test(email) == true && typeof email == 'string' && addChar.test(email) == true){
      state = 'VALID';
    }else if(email == 'Error : Invalid data type'){
      regEmail = "Invalid Email"
    }else if(typeof email == 'string' && addChar.test(email) == false){
       regEmail = "Invalid Email"
    }else if (checkVar.test(email) == false && typeof email == 'number'){
       regEmail = "Invalid Email"
    }else if(email == null){
       regEmail = "Invalid Email"
    }else{
       regEmail = "Invalid Email"
    }
    return regEmail
  }

  function isValidPassword(email){
    let checkPass = ''
    if (typeof email != "string") {
      return Error ("Bukan String")
    }
    let checkM = email.toString().charAt()
    if (email.length >= 8){
      email
    }else if(email.length >= 8 && checkM != 'M') {
      checkPass = "Invalid Password"
    }else if (typeof email == "string" ){
      checkPass = "Invalid Password"
    }else{
      checkPass = "Invalid Password"
    }
    return checkPass
  }
    
  const txtHandler = (enteredName) => {
    setEmail(enteredName)
    setregEmail(checkEmail(enteredName))
  };
    
  const passHandler = (enteredPass) => {
    setPassword(enteredPass);
    setcheckPass(isValidPassword(enteredPass))
  };

  return (
  <SafeAreaView testID='loginView' style={styles.background}>
   <StatusBar translucent backgroundColor="transparent" />
    <ScrollView>
      <View style={styles.headerImg}>
        <Image testID='bannerImage' source = {BG} style={styles.imgLogin}></Image>
        <View style={{paddingTop:20}}>
          <TextInput testID='emailInput' style={styles.input} placeholder="Email" placeholderTextColor={'#DDBEBE'} value={email} onChangeText={txtHandler} />
          <TextInput testID='passInput' style={styles.input} placeholder="Password" placeholderTextColor={'#DDBEBE'} value={pass} onChangeText={passHandler} secureTextEntry={true} />
          
          <TouchableOpacity testID='loginButton' style={styles.btnLogin} 
            onPress= {  () => {   
              dispatch(fetchingLogin(email,pass))
              .then(() => {
                alert("Account has been logged in succesfully!")
                navigation.navigate("Home")     
              })
              .catch(function (error) {
                if(error.response.status==401){
                  alert("Input Correct Email or Password!!")
                }else if(error.response.status==400){
                  alert("Email or Password required *")
                }
              })      
            }}>
            <Text style={styles.textLogin}>Sign In</Text>
          </TouchableOpacity>
          <Text style={{color:'black',alignSelf:'center',paddingTop:15,fontSize:16, fontWeight: 'bold',}}>Don't have an account?</Text>
          <TouchableOpacity testID='registerLink' style={styles.btnRegister} onPress={() => {
            setEmail('')
            setPassword('')
            setregEmail('')
            setcheckPass('')
            navigation.navigate('Register')}}>
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
    textRegister: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },
})