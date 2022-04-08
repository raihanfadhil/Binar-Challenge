import { Text, View ,
Image,TouchableOpacity, StyleSheet,Dimensions
  } from 'react-native'
import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getdataBook ,getdataBookSpecific} from '../../actions'
import { useNavigation } from '@react-navigation/native'
import { Star } from '../../assets/images';
import bilrupiah from '../../utils/bilrupiah'

const PopularBooks = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const books = useSelector(state => state.appData.books)
  const token= useSelector(state => state.appData.token)
  
  console.log("tokens: ",token)
  console.log(books)
  
  useEffect(() => {
     dispatch(getdataBook(token))
  },[])
      
  return(
    <>
    {
    books && books.map(item=>{ 
      return(
        <>
          <TouchableOpacity onPress={() =>{ 
            const ids= item.id
            console.log("ini idpopular:",ids)
            dispatch(getdataBookSpecific(token,ids))
            navigation.navigate('BookDetail',{item})
          }}>
               
            <View style={{flexDirection:'row'}}>
              <View style={styles.bgBook}> 
                <Image source={{uri:item.cover_image}} style={styles.imgBook}/>
              </View> 
              <View style={styles.bgDetail}> 
                <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>{item.title}</Text>
                <Text style={styles.textDetail}>{item.author}</Text>
                <Text style={styles.textDetail}>{item.publisher}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image source={Star} style={{width:17,height:17, marginRight: 3}}/> 
                  <Text style={styles.textDetail}>{item.average_rating}</Text>
                </View>
                <Text style={styles.textPrice}>Rp {bilrupiah(item.price)}</Text>
              </View>
            </View> 
          </TouchableOpacity>
        </>
      );
    })
    }
  </>
  )
}

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  bgBook:{
    backgroundColor:'#EEEEEE',
    width: screen.width * 0.3,
    height: screen.height * 0.01,
    flexDirection:'column',
    alignItems:'flex-start',
    marginBottom:20,
    marginRight:16
  },
  bgDetail:{
    backgroundColor:'#EEEEEE',
    width: screen.width * 0.6,
    height: 160,
    flexDirection:'column',
    alignItems:'flex-start',
  },
  textPrice:{
    fontSize : 16,
    alignSelf:'flex-start',
    fontFamily: 'Roboto-Regular',
    color:'black',
    fontWeight:'bold'
  },
  imgBook: {
    height:150,
    width: 100,
    borderRadius :4, 
  },
  textDetail:{
    color:'black',
    paddingVertical:2
  }
}) 

export default PopularBooks