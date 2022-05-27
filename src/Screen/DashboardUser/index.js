import { StyleSheet, Text, View,SafeAreaView,StatusBar,Dimensions,Image,TouchableOpacity, RefreshControl,ScrollView} from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import { COLORS } from '../../Component/Constant/Color'
import { profile } from '../../assets'
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from "react-native-image-picker"
import storage ,{firebase} from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import Logout from '../logout'
import { TextInput } from 'react-native-gesture-handler';
import Auth from '../../Service/Auth';
import SimpleToast from 'react-native-simple-toast';
import { setUser,setChat } from '../../Redux/reducer/user'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem } from 'react-native-elements';

const DashboardUser = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const getLogin =async () =>{
    const email = await AsyncStorage.getItem("email");console.log("email dashboard",email)
    firebase.app()
    .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/users/').orderByChild("email").equalTo(email).once("value")
    .then(async snapshot => {
      if (snapshot.val() != null) {
        let userData = Object.values(snapshot.val())[0];
        console.log('User data: ', userData);
        dispatch(setUser(userData));
        await Auth.setAccount(userData)
        await AsyncStorage.setItem("id",userData.id)
        console.log("user data id (profile) :",userData.id)
      }
    })
  }
  
  const {userData} = useSelector(state => state.User);
  console.log("user data profile:",userData)
  const [image, setImage] = useState(null);
  const [imageUpdate, setImageUpdate] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  const [bio, setBio] = useState('');
  const [bioUpdated, setBioUpdated] = useState('');
  const [transferred, setTransferred] = useState(0);
  const[refreshing, setRefreshing] = useState(false);
  const bioHandler = (enteredBio) => {
    setBio(enteredBio);
  };
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
  const uploadData= async () => {    
    if(bio&&!image){   // jika hanya ada bio 
      let avatarUpdate = {
        bio:bio
      };
      firebase.app()
      .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('/users/'+ userData?.id)
      .update(avatarUpdate).then(() => {
        console.log("bio updated")
        setBio(bio)
        onRefresh()
      });
    }else if(image&&bio){  // jika mengupdate image dan bio 
      const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'IOS' ? uri.replace('file://', '') : uri;
      setTransferred(0);    
      const task = storage().ref(filename).putFile(uploadUri)
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      storage()
      .ref(filename).getDownloadURL().then(url => {
        console.log("url image upload",url)
        let avatarUpdate = {
          avatar: url,
          bio:bio
        };
        firebase.app()
        .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/users/'+ userData?.id)
        .update(avatarUpdate).then(() => {
          console.log('User Data updated.')
          setImageUpdate(url)
          setBioUpdated(bio)        
        });
      })
      .catch(e=>{console.log(e);})
      Alert.alert(
        'Photo uploaded!',
      );
      setImage(null);
    }else{  // jika hanya mengupdate image
      const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'IOS' ? uri.replace('file://', '') : uri;
      setTransferred(0);

      const task = storage().ref(filename).putFile(uploadUri)
      // set progress state
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      storage()
      .ref(filename).getDownloadURL().then(url => {
        console.log("url image upload",url)
        let avatarUpdate = {
          avatar: url,
        };
        firebase.app()
        .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
        .ref('/users/'+ userData?.id)
        .update(avatarUpdate).then(() => {
          console.log('User Image updated.')
          setImageUpdate(url)
          setBio(userData.bio)
          onRefresh()
        });
      })
      .catch(e=>{console.log(e);})
      Alert.alert(
        'Photo uploaded!',
      );
      setImage(null);
      }  
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(()=>{ 
    getLogin()
    setRefreshing(true);
    wait(500).then(()=>{ setRefreshing(false);setBio('') ;setImageUpload(false)});
  }, []);

  useEffect(() => {
    getLogin()
    onRefresh()
  }, []);
  
  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: '#EEEEEE',}}>
      <StatusBar  barStyle="light-content" backgroundColor={COLORS.black} />
      <ScrollView refreshControl={
        <RefreshControl  
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        }>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,backgroundColor:COLORS.black,paddingVertical:15}}>
          <Icon style={{ marginHorizontal: 5, color: '#EEEEEE' }}
            name = "chevron-back"
            type = "Ionicons"
            onPress = {() => navigation.navigate("Home")}/>
          <Image style={styles.logo} source={profile}/>
          <Logout/>
        </View>
        
        {imageUpdate ? 
        <View style={{paddingTop:30}}>
          <View style={styles.photo} >
            <Image style={styles.photo} source={{uri:imageUpdate}} />
            <TouchableOpacity style={styles.button} >
              <Icon 
                name="camera"
                type="FontAwesome5"
                style={{color:COLORS.white,fontSize:20}}
                onPress={selectImage}/>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:30   }}/>
          <View style={{flexDirection:'column',width:screen.width*1}}> 
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:7,alignSelf:'flex-start'}}>Name</Text>
              <TextInput  style={styles.input} placeholder={userData.name} placeholderTextColor={'#1a1a1a'}  editable={false}  />      
            </View>
            <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:15   }}/>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:8,alignSelf:'flex-start'}}>Email</Text>
              <TextInput  style={styles.input} placeholder={userData.email} placeholderTextColor={'#1a1a1a'} editable={false}   />    
            </View>
            <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:15   }}/>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:24,alignSelf:'flex-start'}}>Bio </Text>
              <TextInput  style={styles.input} placeholder={userData.bio} placeholderTextColor={'#1a1a1a'} onChangeText={bioHandler} value={bio}  />    
            </View>   
          </View>
          <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:15   }}/>
        </View>    
        : 
        <View style={{paddingTop:30}}>
          <View style={styles.photo} >
            <Image   style={styles.photo} source={{uri:userData.avatar}} />
            <TouchableOpacity style={styles.button} >
              <Icon 
                name="camera"
                type="FontAwesome5"
                style={{color:COLORS.white,fontSize:20}}
                onPress={selectImage}/>
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:30   }}/>
          <View style={{flexDirection:'column',width:screen.width*1}}> 
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:7,alignSelf:'flex-start'}}>Name</Text>
              <TextInput  style={styles.input} placeholder={userData.name} placeholderTextColor={'#1a1a1a'}  editable={false}  />      
            </View>
            <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:15   }}/>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:8,alignSelf:'flex-start'}}>Email</Text>
              <TextInput  style={styles.input} placeholder={userData.email} placeholderTextColor={'#1a1a1a'} editable={false}   />    
            </View>
            <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:15   }}/>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:24,alignSelf:'flex-start'}}>Bio </Text>
              <TextInput  style={styles.input} placeholder={userData.bio} placeholderTextColor={'#1a1a1a'} onChangeText={bioHandler} value={bio}  />    
            </View>   
          </View>
          <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:15   }}/>
        </View>    
        }
        {imageUpload==true||bio ||imageUpdate? 
        <>
        <TouchableOpacity onPress={uploadData} style={styles.btnSave} >
          <Icon style={{ marginHorizontal: 5, color: '#1a1a1a' }}
            name = "save"
            type = "Ionicons"
          />
        </TouchableOpacity>
        </> 
        : 
        <>
        </>  
        }
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default DashboardUser
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  photo :{
    width:screen.width*0.42,
    height:screen.height*0.236,
    borderRadius:300,     
    alignSelf:'center'
  },
  logo: {
    width:screen.width*0.29,
    height:screen.height*0.036,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: -10,
    width:45,
    height:45,
    borderRadius: 25,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  btnSave: {
    position: 'absolute',
    bottom: 5,
    right: 15,
    width:40,
    height:40,
    borderRadius: 25,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  input: {
    width: screen.width * 0.7,
    fontSize: 20,
    color: '#1a1a1a',
    paddingLeft:20
  },
});
