import { ImageBackground, Text, View ,Image, StyleSheet,  Dimensions} from 'react-native'
import React, {useEffect} from 'react'
import { BG,Car } from '../../assets/Images';

const Splash = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');

    }, 3000);
  }, [navigation])
  
  return (
    <View style={styles.background}>
      <View style={styles.ctr}>
          <Text style = {styles.bcr}>BCR</Text>
          <Text style = {styles.bcr}>Binar Car Rental</Text>
      </View>

      <ImageBackground style={styles.bgBot} source={BG}>
          <Image source={Car} style = {styles.imagesCar}/>
      </ImageBackground>
    </View>
  );
}

export default Splash

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({

    background : {
      flex : 1,
      backgroundColor : '#091B6F',
      width: screen.width * 1.0,
    },

     ctr : {
        flex:1,
        alignItems : 'center',
        justifyContent : 'center',
    },

    bcr : {
      fontSize : 30,
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

