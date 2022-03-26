import { StyleSheet,Image,View ,Text} from 'react-native'
import React ,{ useEffect, useState } from 'react'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


const LatestUploads = () => {
  const navigation = useNavigation();
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
        .get('http://code.aldipee.com/api/v1/movies')
        .then(responseData => {
            setData(responseData.data.results);
        })
        .catch(err => {
            console.error('Error : ${error}');
        })
    },  [])
  
  return(
    <View>
    {data && data.map((item)=>{
        return(
        <View style={styles.LatestUploadVRow}>
        <Image 
        source={{uri: item.poster_path}} 
        style={styles.imagesUpload}
        />
            <View style={{ flexDirection:'column',paddingLeft:16}}>
            <Text style={{color:'#000'}}>Title : {item.title}</Text>
            <Text style={{color:'#000',paddingTop:4}}>Release Date : {item.release_date}</Text>
            <Text style={{color:'#000',paddingTop:4}}>Rating : {item.vote_average}</Text>
             <View style = {styles.container}>
              <TouchableOpacity onPress={() => navigation.navigate('MovieDetails',  {item}  )}>
                <Text style={styles.textButton}>Show Detail</Text>
                </TouchableOpacity>
            </View>
            </View> 
        </View>
        ); 
    })}
   </View>
  )

}
export default LatestUploads
const styles = StyleSheet.create({
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
      backgroundColor: "green",
      marginTop : 15,
      borderRadius : 4,
      width:100,
      height:25,
      alignItems : 'center',
      justifyContent : 'center',
    },
     textButton:{
      fontSize:14,
      color :'#fff',
      fontWeight:'bold',
      
    },
      imagesUpload : {
      width:100,
      height:150,
      marginBottom : 9,
       borderRadius : 4,
  },
})
