import { StyleSheet, Text, View ,TouchableOpacity,FlatList, StatusBar,Image,ScrollView,RefreshControl,Dimensions} from 'react-native'
import React ,{ useEffect ,useState,useCallback} from 'react'
import Auth from '../../Service/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { firebase } from '@react-native-firebase/database'
import { useSelector } from 'react-redux'
import { Icon} from 'native-base';
import {ListItem, Avatar} from 'react-native-elements';
import {COLORS} from '../../Component/Constant/Color';
import { FONTS } from '../../Component/Constant/Font';
import HomeHeader from '../../Component/Header/HomeHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultAvatar } from '../../assets'
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser,setChat,removeUser } from '../../Redux/reducer/user'
import SimpleToast from 'react-native-simple-toast'
import NetInfo from '@react-native-community/netinfo';

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem("isLogin","")     
    return true;
  }
  catch(exception) {
    return false;
  }
}

const Home =  ({navigation}) => {
  const dispatch= useDispatch();
  const getLogin =async () =>{
    const email = await AsyncStorage.getItem("email");console.log("email ",email)
    firebase.app()
    .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/users/').orderByChild("email").equalTo(email).once("value")
    .then(async snapshot => {
      let userData = Object.values(snapshot.val())[0];
      console.log('User data: ', userData);
      dispatch(setUser(userData));
      await Auth.setAccount(userData)
      await AsyncStorage.setItem("id",userData.id)
    }).catch( error=>{
      console.error(error);
      navigation.navigate("Login")
      auth()
      .signOut()
      .then(() => alert('Your are signed out!'));
      removeItemValue("account")
      removeItemValue("id")
      dispatch(removeUser())
      dispatch(setUser({}));
    })
  }

  const {userData} = useSelector(state => state.User);
  console.log("user data home:",userData)
  const [connection, setConnection] = useState(false);
  const [chatList, setchatList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getLogin()
    NetInfo.fetch().then(state=>{
      if(state.isConnected == true){
        setConnection(true);
        console.log('Connection success!');
        getChatlist();
      }else{
        setConnection(false);
        console.log('Connection failed!');
        SimpleToast.show("Connection Failed!");
      }
    });
    onRefresh()
  }, []);

  const setItemValue = async (key,data) => {
    try {
      await AsyncStorage.setItem(key,data); 
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  const getChatlist = async() => {
    const userDataId = await AsyncStorage.getItem("id")
    console.log("userData id :",userDataId)
    firebase.app()
    .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/chatlist/'+userDataId)
    .orderByChild('sendTime')
    .startAt('2022-05-21T04:38:58+07:00')
    .on('value', snapshot => {
      if (snapshot.val() != null) {
        setchatList(Object.values(snapshot.val()))
        setItemValue("id",userDataId)
      }else{
        getLogin()
      }
    }); 
  }

  const renderItem = ({item}) => (
    <ListItem 
      containerStyle={{paddingVertical:15,marginVertical:0,backgroundColor:'#EEEEEE'}}
      onPress={()=>navigation.navigate('ChatUser',{receiverData:item})} >
      <Image source={{uri:item.avatar}} style={styles.photo}/>  
      <ListItem.Content>
        <ListItem.Title style={{fontFamily:'FONTS.Bold',fontSize:16,color:'black',paddingBottom:8,fontWeight:'bold'}}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle style={{fontFamily:FONTS.Regular,fontSize:14,color:'black',paddingTop:1}}  numberOfLines={1}>
          {item.lastMsg}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
      
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = useCallback(()=>{ 
    getLogin()
    getChatlist();
    setRefreshing(true);
    wait(500).then(()=>{setRefreshing(false) });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <StatusBar barStyle="light-content" backgroundColor='#1a1a1a'/>
        <HomeHeader />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index) => index.toString()}
        data={chatList}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={()=>navigation.navigate('AllUsers')}>
        <Icon 
          name="search"
          type="FontAwesome5"
          style={{color:COLORS.white,fontSize:20}}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({  
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  photo :{
    width:50,
    height:50,
    marginRight:10,
    borderRadius:30
  },
})