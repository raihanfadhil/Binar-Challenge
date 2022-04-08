import { StyleSheet, Text, View ,SafeAreaView,ScrollView,StatusBar,
  Dimensions,Image,Pressable, TouchableOpacity} from 'react-native'
import React from 'react'
import { Success } from '../../assets/images'
import { useNavigation } from '@react-navigation/native'
import { useDispatch} from 'react-redux'

const RegisterComplete = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" />
        <ScrollView>
          <View style={styles.headerText}>
            <Text style={styles.textComplete}>Account Created Succesfully</Text>
            <Image source={Success} style={styles.imgSuccess}/>
            {/* <Text style={styles.textVerif}>We sent email verification to your email</Text> */}
          </View>
          <View>
            <TouchableOpacity style={styles.buttonBack} onPress={() => 
              navigation.navigate('Login')}>
              <Text style={styles.textBack}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterComplete
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  background : {
    flex : 1,
    backgroundColor : '#EEEEEE',
    width: screen.width * 1.0,
  },
  headerText : {
    paddingTop:100,
    paddingHorizontal: 5
  },
  textComplete: {
    paddingTop:30,
    fontSize: 22,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign:'center' },
  textVerif: {
    padding:30,
    fontSize: 23,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign:'center',
  },
  imgSuccess:{
    marginTop:30,
    width: 200,
    height : 200,
    alignSelf:'center',
    backgroundColor:'transparent'
  },
  buttonBack: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
    width: 200,
    height : 40,
    alignSelf:'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15
  },
  textBack: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'green',
    textAlign:'center'
  },
})