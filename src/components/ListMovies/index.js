import { StyleSheet,Image,View } from 'react-native'
import React ,{ useEffect, useState } from 'react'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel'
import { windowWidth ,screen} from '../../utils/Dimensions'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
    const navigation = useNavigation();
  useEffect(() => {
    axios
      .get('http://code.aldipee.com/api/v1/movies')
      .then(responseData => {
        setMovies(responseData.data.results);
      })
      .catch(err => {
        console.error('Error : ${error}');
      })
  },  [])
  
  return (
    <View style={{flexDirection:'row'}}>
    <FlatList 
            
              contentContainerStyle= {styles.flstyle}
              keyExtractor={item=> item.id}
              data={movies}
              renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetails',  {item}  )}>
              <Image
                style={styles.poster}
                source={{uri: item.poster_path}}
              />
            </TouchableOpacity>
          )}
              sliderWidth={windowWidth-40}
              itemWidth={screen.width * 0.3}
              loop={true}
            />
    </View>
  )
}

export default ListMovies
const styles = StyleSheet.create({
  poster:{
   flexDirection:'row',
   width:100,
   height:150,
   borderRadius:4,
   marginRight:18,
   marginTop: 10
  },
  flstyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',

  }
})