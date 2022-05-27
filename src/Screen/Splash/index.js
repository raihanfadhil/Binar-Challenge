import { StyleSheet, Text, View ,Dimensions,ImageBackground,SafeAreaView,StatusBar } from 'react-native'
import React, {useEffect,useState} from 'react'
import { BG} from '../../assets/Images'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector} from 'react-redux';
import Auth from '../../Service/Auth';
import { setUser } from '../../Redux/reducer/user';
const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.User);
  console.log(
    "user data splash",userData
  )
  const [loginChk, setloginChk] = useState(true);

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


  const getUser = async () => {
    let data = await AsyncStorage.getItem("account");
    if (data != null) {
      dispatch(setUser(data));
      setloginChk(true)
      navigation.replace("Home")
    }else{
      setloginChk(false)
      dispatch(setUser({}));
      navigation.replace('Login');
      removeItemValue("account")
    }    
  }
 
  useEffect(  () => {
    setTimeout(() => {
      getUser()
    }, 3000);
  }, [navigation])
  
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.background}>
        <ImageBackground style={styles.background} source={BG}>
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default Splash

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  background : {
    flex : 1,
    backgroundColor : '#00000',
    width: screen.width * 1.0,
  },
}) 
