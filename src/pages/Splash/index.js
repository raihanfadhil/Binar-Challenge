import { StyleSheet, Text, View ,Dimensions,ImageBackground } from 'react-native'
import React, {useEffect} from 'react'
import { splashScreen } from '../../assets/Images';
const Splash = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');

    }, 3000);
  }, [navigation])
  return (
   <View style={styles.background}>
    <ImageBackground style={styles.background} source={splashScreen}>
      <View style={styles.ctr}>
          <Text style = {styles.bcr}>Madtyler</Text>
      </View>
      </ImageBackground>
    </View>
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

     ctr : {
        flex:1,
        alignItems : 'center',
        justifyContent : 'flex-end',
        paddingBottom:20
    },

    bcr : {
      fontSize : 20,
      fontWeight : 'bold',
      color: '#FFFFFF',
    },

    imagesCar : {
      width: screen.width * 1.0,
    },
    bgBot : {
      justifyContent :'center',
      alignItems: 'flex-end',
      flexDirection : 'row',
      width: screen.width * 1.0,
      height : 124,
      borderTopLeftRadius :60,
      
    }

}) 