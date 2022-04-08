import { StyleSheet,Image,View } from 'react-native'
import React ,{ useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { windowWidth ,screen} from '../../utils/Dimensions'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch,useSelector } from 'react-redux'
import { getdataBook ,getdataBookSpecific} from '../../actions'

const ListBooks = () => {
  const dispatch = useDispatch()
  const books = useSelector(state => state.appData.books)
  const token= useSelector(state => state.appData.token)
  const navigation = useNavigation();
  
  useEffect(() => {
     dispatch(getdataBook(token))
  },[])
  
  return (
    <View style={{flexDirection:'row'}}>
    {/* {todos ? (<> */}
      <FlatList 
        horizontal
        contentContainerStyle= {styles.flatStyle}
        keyExtractor={item=> item.id}
        data={books}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() =>{ 
            const ids= item.id
            dispatch(getdataBookSpecific(token,ids))
            navigation.navigate('BookDetail',{item})
          }}>
        
            <Image
              style={styles.posterBook}
              source={{uri: item.cover_image}}
            />
          </TouchableOpacity>
        )}

        sliderWidth={windowWidth-40}
        itemWidth={screen.width * 0.3}
        loop={true}
      />
    {/* </>) : 'NO DATA'} */}
    </View>
  )
}

export default ListBooks
const styles = StyleSheet.create({
  posterBook:{
    flexDirection: 'row',
    width: screen.width * 0.28,
    height: 150,
    borderRadius: 4,
    marginRight: 18
  },
  flatStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
  }
})