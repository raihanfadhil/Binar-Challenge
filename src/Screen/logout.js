import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser ,removeUser} from '../Redux/reducer/user';
import { Icon } from 'native-base';

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

const Logout =  () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View>   
      <TouchableOpacity 
        onPress= {  async  () =>{ 
          navigation.replace('Login')
          auth()
          .signOut()
          .then(() => alert('Your are signed out!'));
          removeItemValue("account")
          removeItemValue("id")
          dispatch(removeUser())
          dispatch(setUser({}));             
        } }>
        <Icon 
          name="exit"
          type="Ionicons"
          style={{color:'#EEEEEE',fontSize:30,}}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})