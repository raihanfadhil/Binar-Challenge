import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React, {useState,useEffect} from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout   } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'


const Home = () => {
  const  {width,height} = Dimensions.get('window')

  const  ASPECT_RATIO = width / height;
  const  LATITUDE = -6.294451512339976;
  const  LONGITUDE = 106.95171921217926;
  const  LATITUDE_DELTA= 0.015;
  const  LONGITUDE_DELTA= LATITUDE_DELTA+ASPECT_RATIO;
  const [currentPosition, setCurrentPosition] = useState({
        latitude: -6.294451512339976,
        longitude: 106.95171921217926,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
  })
  
  useEffect (()=> {
    Geolocation.getCurrentPosition(position=>{
    //  alert(JSON.stringify(position))
        const {longitude,latitude} = position.coords
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude
        })
    }, error => alert(error.message),
        {timeout:20000,maximumAge:1000}
        
    )
  })
  return (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={currentPosition}>
    <Marker
      onPress={() => alert ('Favorite Place')}
      coordinate={{
        latitude: LATITUDE,
        longitude:LONGITUDE,
      }}
      title='test title'
      description ='This is the test description'
      showsUserLocation
    >
    <Callout tooltip>
      <View>
        <View style={styles.bubble}>
          <Text style={{fontSize: 12, color:'red'}}> Favourite Place</Text>
        </View>
      </View>
    </Callout>
    </Marker>
    </MapView>
  </View>
  )
};

export default Home
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
 container: {
   
   ...StyleSheet.absoluteFillObject,
   flex:1,
   height: screen.height *1.0,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 bubble:{
  // maxWidth: scale(250),
  paddingHorizontal: 5,
  // paddingTop: 10,
  // paddingBottom: 10,
  borderRadius: 10,
  backgroundColor: '#ffff'
 },

});