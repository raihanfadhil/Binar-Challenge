import { Image, Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Allure } from '../../assets'

const Akun = () => {
  return (
      <View style={styles.page}>
        <View style={styles.bgText}>
          <Image source={Allure} style={styles.imagesAkun}/>
          <Text style={styles.text}>Upss kamu belum memiliki akun. Mulai buat akun</Text>
          <Text style={styles.text}>agar transaksi di BCR lebih mudah Register</Text>
        <View style = {styles.container}>
          <TouchableOpacity >
            <Text style={styles.textButton}>Register</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
  )
}

export default Akun

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  page : {
    flex : 1,
    backgroundColor : '#FFFFFF',
   
  },
  imagesAkun : {
      width: screen.width * 1.0,
      marginBottom : 15,
  },
  bgText : {
      flex:1,
      alignItems : 'center',
      justifyContent : 'center',
  },
  text:{
    fontSize : 14,
    color:'#000000'
  },
  container: {
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical : 10,
    backgroundColor: "#5CB85F",
    marginTop : 20,
    borderRadius : 5,
  },
  textButton:{
    fontSize:14,
    color :'#fff',
    fontWeight:'bold'
  },
})

