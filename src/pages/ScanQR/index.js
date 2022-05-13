import { StyleSheet, View ,ScrollView, StatusBar, SafeAreaView} from 'react-native'
import React from 'react'
import {CameraScreen, CameraType} from 'react-native-camera-kit'
import {useIsFocused} from '@react-navigation/native'

const ScanQR = ({navigation}) => {
  const isFocused = useIsFocused();
  const onReadCode = (data) => {
    alert(data.nativeEvent.codeStringValue)
  
  }
  return (
    isFocused ?
    <View style={styles.background}>
      <StatusBar translucent backgroundColor ='transparent' />
      
          <CameraScreen
            //barcode props
            CameraType={CameraType.Back}
            scanBarcode={true}
            onReadCode={(event) => onReadCode(event)}
            showFrame={true}
            laserColor='red'
            frameColor='white'
          />
         
        
    </View>  :
          null
      
  );
}

export default ScanQR

const styles = StyleSheet.create({
   background : {
    flex:1,
    backgroundColor:'#fff',
    height:200
  },
}) 
