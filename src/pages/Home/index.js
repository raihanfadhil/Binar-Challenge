import { StyleSheet, Text, View ,SafeAreaView,ScrollView,ImageBackground,Dimensions,StatusBar,TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { ListMovies,LatestUploads } from '../../components'


const Home = () => {
  return (
    <SafeAreaView style={styles.background}>
    <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <View style={styles.LayoutV}>
          <View style={styles.RecV}>
            <Text style={styles.Rec}>Recommended</Text>
            <ListMovies/>
            <View style={styles.LatestUpV}>
              <Text style={styles.Rec}>Latest Upload</Text>
              <View style={styles.LatestUploadVColumn}>
                <View>
                  <LatestUploads/>
                </View>
              </View>
            </View>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  background : {
      flex : 1,
      backgroundColor : '#fff',
      width: screen.width * 1.0,
    },
      LayoutV : {
      paddingLeft:13
    },
   RecV : {
      paddingTop:41,
    },
   Rec : {
      color : '#000',
      fontSize : 16
    },
    CardRecV : {
      paddingTop:16,
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    
    CardRec : {
      width:screen.width * 0.23,
      height:screen.height * 0.16,
      borderRadius:4,
      backgroundColor: '#E0E7EC',
      paddingRight:8.83,
    },
    LatestUpV : {
      paddingTop:16.51,
    },
     LatestUploadVColumn : {
      paddingTop:8,
 
      flexDirection:'column',
      
    },
    LatestUploadVRow : {
      flexDirection:'row',
    },
    container: {
      justifyContent: "flex-start",
      backgroundColor: "#649DFF",
      marginTop : 20,
      borderRadius : 4,
      width:screen.width * 0.24,
      height:screen.height * 0.04,
      alignItems : 'center',
      justifyContent : 'center',
    },
     textButton:{
      fontSize:14,
      color :'#fff',
      fontWeight:'bold',
      
    },
      imagesUpload : {
      width:screen.width * 0.27,
      height:screen.height * 0.137,
      marginBottom : 9,
       borderRadius : 4,
  },
})