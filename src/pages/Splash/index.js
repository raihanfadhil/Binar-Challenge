import { StyleSheet, Text, View ,Dimensions,ImageBackground,SafeAreaView,StatusBar } from 'react-native'
import React, {useEffect} from 'react'
import { BG } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TouchID from 'react-native-touch-id'

const Splash = ({navigation}) => {
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
      .catch(async() => {
        await AsyncStorage.setItem("isLogin","");;
        alert('Authentication Failed, Please try again');
        navigation.replace('Login');
      })
  }

  const onSignedin = async () => {
    const value = await AsyncStorage.getItem("isLogin");;
    if (value !== null) {
      pressHandler().then(  () => {
      })   
    }else{
      navigation.replace('Login');
    }
  }

  useEffect(() => {
    setTimeout(() => {
        onSignedin()
    }, 3000);
  }, [navigation])

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.background}>
          <ImageBackground style={styles.background} source={BG}>
            <View View style={styles.bgtext}>
              <Text style = {styles.txtsplash}>InfiniteApp</Text>
            </View>
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
    backgroundColor : '#EEEEEE',
    width: screen.width * 1.0,
  },
  bgtext : {
    flex:1,
    alignItems : 'center',
    justifyContent : 'flex-end',
    paddingBottom:20
  },
  txtsplash : {
    fontSize : 20,
    fontWeight : 'bold',
    color: '#000',
  },
}) 
