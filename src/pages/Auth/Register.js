import {Text, TextInput, View,SafeAreaView, ScrollView, 
  StatusBar,Dimensions, StyleSheet, Image,TouchableOpacity} from 'react-native'
import { Formik } from 'formik'
import React, { useState ,useEffect} from 'react'
import { BG } from '../../assets/images'
import {firebase} from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native'
import Input from '../../component/Input';
import  loginValidationSchema  from '../../component/loginValidation'
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from "react-native-image-picker"

const Register = () => { 
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [imageUpdate, setImageUpdate] = useState(null);

  const goRegister = async (email,password,name,bio) =>{
    console.log(email,password,name,bio)
    if(image){
      const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'IOS' ? uri.replace('file://', '') : uri;

          
      const task = storage().ref(filename).putFile(uploadUri)
      // set progress state
          
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      storage()
      .ref(filename).getDownloadURL().then(url => {
        console.log("url image upload",url)
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          if(res){
            console.log('User account  created and signed in with firebase auth!');                 
            const userData = {
              name: name, 
              email: email, 
              password:password,
              bio: bio,
              avatar: url,
              id: auth().currentUser.uid,
            }
            firebase.app()
            .database('https://pokemonapp-509fb-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/users/'+auth().currentUser.uid)
            .set(userData)
            navigation.navigate("Login")        
          } 
        })
      })
    }else{
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        if(res){
          console.log('User account  created and signed in with firebase auth!');                 
          const userData = {
            name: name, 
            email: email, 
            password:password,
            bio: bio,
            avatar: "https://firebasestorage.googleapis.com/v0/b/real-time-chat-db875.appspot.com/o/avatar.jpg?alt=media&token=b9210e95-2c50-4d23-a1e0-7f7e4ee14737",
            id: auth().currentUser.uid,
          }
          firebase.app()
          .database('https://pokemonapp-509fb-default-rtdb.asia-southeast1.firebasedatabase.app/')
          .ref('/users/'+auth().currentUser.uid)
          .set(userData)
          navigation.navigate("Login")        
        } 
      })
    }
  }
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log("source :",source);
        setImage(source);   
        setImageUpdate(response.uri)
      }
    });
  };
  
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email:'',password:'',name:'',bio:'',avatar:"https://firebasestorage.googleapis.com/v0/b/real-time-chat-db875.appspot.com/o/avatar.jpg?alt=media&token=b9210e95-2c50-4d23-a1e0-7f7e4ee14737"}}
      onSubmit={ values=>goRegister(values.email,values.password,values.name,values.bio)}
    >
    {({handleChange,handleBlur,handleSubmit,values,touched,isValid,errors}) =>(
      <SafeAreaView style={styles.background} testID='login_view'>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          {imageUpdate ? 
          <View style={{marginTop:60}}>
            <View style={styles.photo} >
              <Image style={styles.photo} source={{uri:imageUpdate}} />
              <TouchableOpacity style={styles.btnCamera} onPress={selectImage}>
                <Icon size={24} color="white" name="camera" />
              </TouchableOpacity>
            </View>
          </View>
          : 
          <View style={{marginTop:60}}>
            <View style={styles.photo} >
              <Image style={styles.photo} source={{uri:values.avatar}} />
              <TouchableOpacity style={styles.btnCamera} onPress={selectImage}>
                <Icon size={24} color="white" name="camera" />
              </TouchableOpacity>
            </View>
          </View>
          }
          <View style={{ paddingTop: 20 }}>
            <Input placeHolder={'Enter Your Name'} onChangeText={handleChange('name')} value={values.name} error='input valid name'/>
            <Input placeHolder={'Enter Your Email'} onChangeText={handleChange('email')} value={values.email} error='input valid email'/>
            {(errors.email && touched.email) &&
              <Text style={styles.errorText}>{errors.email}</Text>
            }
  
            <Input placeHolder={'Enter Your Password'} onChangeText={handleChange('password')} value={values.password} error='input valid password' secureTextEntry={true}/>
            {(errors.password && touched.password) &&
              <Text style={styles.errorText}>{errors.password}</Text>
            }
            
            <Input placeHolder={'Enter Bio'} onChangeText={handleChange('bio')} value={values.bio} />
            <TouchableOpacity style={styles.btnRegister}
                   onPress= {handleSubmit} >
              <Text style={styles.textRegister}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin} onPress={ () =>{ 
              navigation.navigate("Login")
            }}>
              <Text style={styles.textLogin}>Sign In</Text>
            </TouchableOpacity>                
          </View>
        </ScrollView>
      </SafeAreaView>
    )}
    </Formik>
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
  photo :{
    width:screen.width*0.42,
    height:screen.height*0.236,
    borderRadius:300,     
    alignSelf:'center'
  },
  btnCamera: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    width:40,
    height:40,
    borderRadius: 25,
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  btnRegister: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
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
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  result: {
    marginTop: 30,
    paddingHorizontal: 30,
    display: 'flex',
  },
  errorText:{
    color:'red',
    fontSize:12,
    paddingLeft:40
  },
})