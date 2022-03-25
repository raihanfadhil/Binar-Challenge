import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, StatusBar,ImageBackground ,Image,Share,Button} from 'react-native'
import React ,{ useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconLove,IconShare,IconBack ,Star} from '../../assets'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

export default function MovieDetails({route}){
  const navigation = useNavigation();
    const ids = route.params.item.id;
   
   const baseURL = 'http://code.aldipee.com/api/v1/movies/'+ids;
   console.log(baseURL)
   var [data, setData] = useState([]);
   var [genre, setGenres] = useState([]);
   var [actor, setActors] = useState([]);
     
    useEffect(() => {
        axios.get(baseURL).then(responseData => {
            setData(responseData.data);
            setGenres(responseData.data.genres);
            setActors(responseData.data.credits.cast);
        })
        .catch(err => {
            console.error('Error : ${error}');
        })
        
    },  [])

      const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'MovieApp Project by Raihan Fadhil ',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
   <SafeAreaView style={styles.background}>
    <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <View key={data.backdrop_path} >
          <ImageBackground style={styles.headerTop} source={{uri:data.backdrop_path}}>
            <View style={styles.headerButton}>
                <TouchableOpacity onPress={() => navigation.navigate('MainApp')}>
                <Image source={IconBack} style={styles.navIcon}/>
              </TouchableOpacity>
              <TouchableOpacity >
                <Image source={IconLove } style={styles.navIcon}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={onShare}>
                <Image source={IconShare} style={styles.navIcon}/>
              </TouchableOpacity>
            </View>

            <View style={styles.bgC}>
             <View style={styles.bgCard}>
                <Image source={{uri:data.poster_path}} style={styles.image}/>
                <View style={{flexDirection:'column', flexWrap : 'wrap'}}>
                <Text style={{color:'#fff',fontSize:16}} >
                {data.title} </Text>
                <Text style={{color:'#fff',fontSize:16}} >
                {data.tagline} </Text>
                <Text style={{color:'#fff',fontSize:16}}>
                {data.release_date}</Text>
                 <Text style={{color:'#fff',fontSize:16}}>Time : {data.runtime} Mins</Text>
                <Text style={{color:'#fff',fontSize:16}}>
                Status : {data.status}</Text>
                 <View style={{justifyContent:'flex-start',flexDirection:'row',}}>
                 <Image source={Star} style={{width:17,height:17}}/> 
                 <Text style={{color:'#fff',fontSize:15,}}> {data.vote_average}
                </Text>
                </View>
                
             
                
                </View>
                
             </View>
           </View>    

          </ImageBackground>

          <View style={{marginTop: 100, marginBottom: 5, paddingHorizontal: 20}}>
            <Text style={styles.subText}>Genres</Text>
          </View>

          <View style={{marginBottom: 5, paddingLeft: 20, paddingRight: 15, flexDirection:'column'}}>
           {genre && genre.map((items,i)=>{
              return (    
            <View>
             <Text style={styles.detailText}>{items.name}       </Text>
             </View>
                 ); 
              })}
          </View>

          <View style={{marginTop: 10,marginBottom: 5, paddingHorizontal: 20}}>
            <Text style={styles.subText}>Synopsis</Text>
          </View>
          
          <View style={{marginTop: 10,marginBottom: 15, paddingHorizontal: 20}}>
            <Text style={styles.detailText}>{data.overview}</Text>
          </View>

          <View style={{marginTop: 10, marginBottom: 15, paddingHorizontal: 20}}>
            <Text style={styles.subText}>Actor/Actress</Text>
          </View>
          
          <View style={{marginBottom: 5, paddingHorizontal: 20,flexDirection:'row',flexWrap : 'wrap',justifyContent:'space-between'}}>
           {actor && actor.map((items,i)=>{
              return (
             
                    <View style={styles.bgActor}> 
                   <Image source={{uri:items.profile_path}} style={styles.imageAct}/>
                    <Text style={styles.textActor}>{items.name}</Text>
                   </View> 
                  
                
                 ); 
              })}
          </View>

        </View>
        
    
           </ScrollView>
    </SafeAreaView>
  )
}

// export default MovieDetails

const screen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  navIcon:{
    width:32,
    height:32,
  },
   background : {
      flex : 1,
      backgroundColor : '#fff',

    },
  page: {
    flex :1,
    backgroundColor: "#000",

  },
  headerTop: {
    width: screen * 1.0,
    height:180,
    backgroundColor : '#000000',
   
  },
  headerButton: {
    paddingTop:25,
    flexDirection:'row',
    justifyContent: 'space-between',
     marginHorizontal: 5,
  },
  buttonLeft: {
    width:30,
    height:30,
    marginTop :50,
    marginLeft:16,
    marginBottom:16,
    flexDirection:'column'
  },
  buttonRight: {
    width:30,
    height:30,
    marginRight : 16,
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    color:'#3d3d3d'
  },
  detailText: {
    fontSize : 16,
    fontFamily: 'Roboto-Regular',
    textAlign: 'justify',
    color:'#3d3d3d'
  },
  bgCard : {
    backgroundColor:'#3d3d3d',
    width: 340, 
    height: 160,
    borderRadius :8,
    flexDirection:'row',
    alignItems:'center',
  
  },
   bgC : {
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 50,
    
  },
  bgActor:{
    backgroundColor:'#fff',
    width: 90, 
    height: 150,
    borderRadius :8,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-around',
    marginRight: 20,
    marginBottom:20,
  },
  textActor:{
    fontSize : 14,
    fontFamily: 'Roboto-Regular',
    color:'#000',
  },
  image: {
    height:130,
    width: 100,
     marginHorizontal: 15,
    marginTop: 10,
    
  },
   imageAct: {
    borderRadius: 5,
    height:120,
    width: 90,

 
    
  },
})