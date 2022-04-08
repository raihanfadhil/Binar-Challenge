import { StyleSheet, Text, View ,Dimensions,ImageBackground,SafeAreaView,StatusBar } from 'react-native'
import React, {useEffect} from 'react'
import { BG } from '../../assets/images';
import { useDispatch ,useSelector} from 'react-redux';

const dispatch = useDispatch();
const isFetching = useSelector(state => state.appData.isFetching)
console.log("books: ",books)
const books = useSelector(state => state.appData.books)
console.log("feching : ",isFetching)
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      if (isFetching==true&&books){
        navigation.replace('Home');
      }else{
        navigation.replace('Login');
      }
    }, 3000);
  }, [navigation])

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.background}>
          <ImageBackground style={styles.background} source={BG}>
            <View View style={styles.bgtext}>
              <Text style = {styles.txtsplash}>InfinityLib</Text>
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
