import {Text, TextInput, View,SafeAreaView, ScrollView, 
  StatusBar,Dimensions, StyleSheet, Image,TouchableOpacity} from 'react-native'
import { Formik } from 'formik'
import React, { useState ,useEffect} from 'react'
import { BG } from '../../assets/images'
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'
import Input from '../../component/Input';
import  loginValidationSchema  from '../../component/loginValidation'
import { fetchingLogin } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
const Login = () => { 
  const isLogin = useSelector(state => state.appData.isLogin);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goLogin = (email,password) =>{
  console.log(email,password)
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      if(res){
        firebase.app().database('https://pokemonapp-509fb-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/users/')
        .orderByChild("email")
        .equalTo(email)
        .once("value")
        .then(async snapshot => {
          if (snapshot.val() == null) {
            console.log("snap ",snapshot.val())
            return false;
          }
          let userData = Object.values(snapshot.val())[0];
          console.log('User data: ', userData);     
          dispatch(fetchingLogin(userData));
          SimpleToast.show("Login Successfully!");
          navigation.navigate("Home")
        })          
        console.log('User account  signed in with firebase auth!');                 
      } 
    }).catch(error => {
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
  }
  useEffect(() => { 
    if (isLogin&&isLogin==true) {
      navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }else{
      navigation.navigate("Login");
    }
  }, [isLogin]);

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email:'',password:''}}
      onSubmit={ values=>goLogin(values.email,values.password)}
    >
    {({handleChange,handleBlur,handleSubmit,values,touched,isValid,errors}) =>(
      <SafeAreaView style={styles.background}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView>
        <View style={{paddingTop:50}}>
        <Image source={BG} style={styles.imglogin}></Image>
        </View>
          <View style={{ paddingTop: 50 }}>
            <Input placeHolder={'Enter Your Email'} onChangeText={handleChange('email')} value={values.email} error='input valid email'/>
            {(errors.email && touched.email) &&
                  <Text style={styles.errorText}>{errors.email}</Text>
                }
  
            <Input placeHolder={'Enter Your Password'} onChangeText={handleChange('password')} value={values.password} error='input valid password' secureTextEntry={true}/>
             {(errors.password && touched.password) &&
                  <Text style={styles.errorText}>{errors.password}</Text>
                }
            <TouchableOpacity style={styles.btnLogin}
                   onPress= {handleSubmit} disabled={!isValid}>
              <Text style={styles.textLogin}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegister} onPress={ () =>{ 
              navigation.navigate("Register")
            }}>
              <Text style={styles.textRegister}>Sign Up!</Text>
            </TouchableOpacity>    
            
          </View>
       
      </ScrollView>
    </SafeAreaView>
    )}
    
    </Formik>
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
    backgroundColor: '#FFFFFF',
    width: screen.width * 0.8,
    height: screen.height * 0.25,
    alignSelf: 'center',
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
  errorText:{
    color:'red',
    fontSize:12,
    paddingLeft:40
  }
})