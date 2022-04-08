import { Text, TextInput,View ,
    SafeAreaView,ScrollView,StatusBar,
    Dimensions,StyleSheet,Image,TouchableOpacity} from 'react-native'
import React ,{useState,useEffect}from 'react'
import { BG } from '../../assets/images'
import { useNavigation } from '@react-navigation/native'
import { useDispatch} from 'react-redux'
import { fetchingRegister } from '../../actions'
import NetInfo from '@react-native-community/netinfo'

const Register = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [regEmail, setregEmail] = useState('');
  const [checkPass, setcheckPass] = useState('');
  const [connection, setConnection] = useState(false);
  
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
    setName(enteredName);
  };
  const emailHandler = (enteredEmail) => {
    setEmail(enteredEmail);
    setregEmail(checkEmail(enteredEmail))
  };
  const passHandler = (enteredPass) => {
    setPass(enteredPass);
    setcheckPass(isValidPassword(enteredPass))
  };
    useEffect(() => {
      NetInfo.fetch().then(state=>{
        if(state.isConnected == true){
          setConnection(true);
          console.log('Connection succes!');
        }else{
          setConnection(false);
          console.log('Connection failed!');
        }
      });
    }, []);

  return (
  <SafeAreaView style={styles.background}>
   <StatusBar translucent backgroundColor="transparent" />
    <ScrollView>
     <View style={styles.headerImg}>
      <Image  source = {BG} style={styles.imgLogin}></Image>
      <View style={{paddingTop:20}}>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          placeholderTextColor={'#DDBEBE'}
          value={name}
          onChangeText={txtHandler}/>
        <TextInput  
          style={styles.input}
          placeholder="Enter an Email"
          placeholderTextColor={'#DDBEBE'}
          value={email}
          onChangeText={emailHandler} />
        <TextInput 
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor={'#DDBEBE'}
          value={pass} 
          onChangeText={passHandler}
          secureTextEntry={true}/>
        <TouchableOpacity style={styles.btnRegister} 
          onPress= {  () => {   
            dispatch(fetchingRegister(email,pass,name))
              .then(() => {
                navigation.navigate("RegisterComplete") 
              })
              .catch(function (error) {
                if(error.response.data.message=="Email already taken"){
                  alert("Email Already Taken!")
                }else if(error.response.data.message=="password must contain 1 letter and 1 number"){
                  alert("Password must contain 1 letter and 1 number *")
                }else if(error.response.data.message=="password must be minimum 8 characters"){
                  alert("Password must be minimum 8 characters *")
                }else if(error.response.data.message=="\"email\" is not allowed to be empty, \"password\" is not allowed to be empty, \"name\" is not allowed to be empty"){
                  alert("\"email\" is not allowed to be empty, \"password\" is not allowed to be empty, \"name\" is not allowed to be empty")
                }
              }) 
              
              if(regEmail == "Invalid Email")   {
                alert("Please input an correct email!")
              }
              if(checkPass == "Invalid Password")  {
                alert("Password must be at least 8 characters!")
              }
          }}>
        
          <Text style={styles.textRegister}>Sign Up</Text>
        </TouchableOpacity>
         
        <Text style={{color:'black',alignSelf:'center',paddingTop:15,fontSize:16, fontWeight: 'bold',}}>Already have an account?</Text>
        
        <TouchableOpacity style={styles.btnLogin} onPress={() => {
          setName('')
          setEmail('')
          setPass('')
          navigation.navigate('Login')
        }}>
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
  background : {
    flex : 1,
    backgroundColor : '#EEEEEE',
    width: screen.width * 1.0,  
  },
  headerImg : {
    paddingTop:60
  },
  imgLogin:{
    backgroundColor:'#FFFFFF',
    width: screen.width * 0.8,
    height : screen.height * 0.25,
    alignSelf:'center',
  },
  btnRegister: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
    borderRadius: 10,
    elevation: 3,
    width: screen.width * 0.8,
    height : 50,
    alignSelf:'center',
    backgroundColor: 'black',
  },
  btnLogin: {
    alignItems: 'center',
    justifyContent: 'center',
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
  result: {
    marginTop: 30,
    paddingHorizontal: 30,
    display: 'flex',
  }
})