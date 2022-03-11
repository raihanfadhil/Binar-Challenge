import { Text, View ,Image, StyleSheet,Dimensions} from 'react-native'
import React from 'react'
import { WARNA_HARGA } from '../../utils/constant';
import {CarXenia} from '../../assets/Images';
import { IconBriefCase,IconUsers } from '../../assets';

const DaftarMobilPilihan = () => {
  return (
  <View style={styles.shadow}>
   <View style={styles.listView}>
          <View style={styles.boxContent}>
            <Image source={CarXenia} style = {styles.photoXenia}/>
            <View style={styles.carContent}>
              <Text style ={{fontSize:14,color:'#000000',paddingBottom:6.5}}>Daihatsu Xenia</Text>
                <View style={{flexDirection:'row',justifyContent: 'flex-start'}}>
                 <IconUsers/>
                 <Text style={{fontSize:10,paddingRight:17,paddingLeft:5}}>4</Text>
                 <IconBriefCase/>
                 <Text style={{fontSize:10,paddingLeft:5}}>2</Text>
                </View>
              <Text style ={{fontSize:14,color:WARNA_HARGA,paddingTop:10.5,}}>Rp 230.000</Text>
            </View>
          </View>
        </View>
  </View>
  )
}

export default DaftarMobilPilihan

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    listView :{
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderBottomLeftRadius:4,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },
    shadow: {
      marginTop:16,
      marginLeft:16,
      width: windowWidth * 0.92,
      height:98,  
      borderRadius: 4,
      backgroundColor: 'transparent',
      shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 0,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 10,
},
  
  label :{
    fontSize: 14,
    color: '#000000'
  },
 

  boxContent:{
    padding:15,
    flexDirection:'row',
    justifyContent: 'flex-start'
  },

  photoXenia:{
    width:40,
    height:24,
    marginTop:4,
    marginRight:16,
  },

  carContent:{
    flexDirection:'column',
    justifyContent: 'flex-start'
  },

})


