import {Text, View ,ImageBackground,Image,TouchableOpacity, Dimensions,StyleSheet} from 'react-native'
import { Car } from '../../assets/Images';
import React from 'react'

const SewaMobil = () => {
  return (
    <View style={styles.headerTopBlue}>
        <View style={styles.bgBlue}>
            <Text style={{color:'#FFFFFF',fontSize:16,paddingTop :24,paddingLeft : 18,}} >
            Sewa Mobil Berkualitas </Text>
            <Text style={{color:'#FFFFFF',fontSize:16,paddingLeft : 18,}}>
            di kawasanmu</Text>
            <View style={styles.button}>
              <TouchableOpacity  >
                <Text style={{fontSize:14,color:'#FFFFFF',fontWeight:'bold'}}>
                  Sewa Mobil
               </Text>
              </TouchableOpacity>
            </View>
        
            <ImageBackground style={styles.bgBottomCar}>
                <Image source={Car} style = {styles.imagesCar}/>
            </ImageBackground>
            
        </View>
    </View>
  )
}

export default SewaMobil

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  headerTopBlue :{
    width: screen.width * 1.0,
    alignItems :'center',
  },
  bgBlue :{
    backgroundColor : '#091B6F',
    width: screen.width * 0.915,
    height: 140,
    borderRadius :8,
    justifyContent : 'space-between',
    alignItems:'flex-start'
    
  },
  bgBottomCar : {
    backgroundColor : '#0D28A6',
    width : screen.width * 0.49,
    alignSelf :'flex-end',
    height: 61,
    borderTopLeftRadius : 60,
    borderBottomRightRadius : 8,
    flexDirection:'column',
    marginTop:-40
  },
  imagesCar : {
    width: screen.width * 0.49,
    height:103,
    marginTop : -47
    
  },
  button : {
    borderRadius:2,
    width : 109,
    height : 28,
    marginLeft:24,
    marginTop :16,
    backgroundColor:'#5CB85F',
    justifyContent: 'center',
    alignItems:'center'
  }
})

