import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image ,StatusBar,ScrollView, Animated,ActivityIndicator} from 'react-native'
import React ,{useState,useRef,useEffect}from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native'
import { useSelector,useDispatch } from 'react-redux';
import { getdataPoke } from '../../redux/actions';
import {firebase} from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast';

const DetailPoke = ({route}) => {
  const userData = useSelector(state => state.appData.userData);
  const { dataUrl,dataName } = route.params;
  const [release,setRelease] = useState(false)
  const[failLoad, setFailLoad] = useState(false);
  const[done, setDone] = useState(false);
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const detailPoke= useSelector(state => state.appData.pokeDetail);
  
  useEffect( () => {
    getPokeData()
    // dispatch(getdataPoke(dataUrl))
    setTimeout(()=>{
      dispatch(getdataPoke(dataUrl)).catch(err=>{
        setFailLoad(true);
      });
      setDone(true);
    }, 2000)
  }, []);
  
  const fadeOut = () => {
    navigation.navigate("LoadingPoke",{
      getUrl : detailPoke.sprites.other.home.front_default,
      dataUrl:dataUrl,
      dataName:dataName
    })
  };
  
  console.log("detail poke: ",detailPoke)
  const getPokeData= () =>{
    firebase.app()
    .database('https://pokemonapp-509fb-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/pokeBag/'+userData.id)
    .orderByChild('name')
    .equalTo(dataName)
    .once("value")
    .then(async snapshot => {
      if (snapshot.val() == null) {
        console.log("snap ",snapshot.val())
        return false;
      }
      let pokeData = Object.values(snapshot.val())[0];
      console.log('poke data: ', pokeData);     
      setRelease(true)
      SimpleToast.show("Successfully!");       
    })  
  }
  
  const goRelease = () =>{
    firebase.app()
    .database('https://pokemonapp-509fb-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/pokeBag/'+userData.id+"/"+dataName).remove().then(navigation.pop())
  }

  return (
    <>
      {done == false? 
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00000"/>
        </View>
        : (failLoad == true? 
        <View style={styles.loadingContainer}>
          <Text style={{color : 'white', fontSize : 20}}>Failed to load data!</Text>
        </View>
        :
    
        <SafeAreaView style={{flex:1, backgroundColor:"#EEEEEE"}}>
          <StatusBar barStyle='light-content' backgroundColor={'red'} />
          <View style={{flexDirection:'row',justifyContent:'space-between',
            paddingHorizontal:15,backgroundColor:"red",elevation:2,paddingVertical:15, alignItems:'center'}}>
            <Icon size={35} color="black" name="arrow-left-drop-circle" onPress = {() => navigation.navigate("Home")}/> 
            <Text style={{color:'white',fontSize:25,fontWeight:'bold',paddingLeft:20}}>{detailPoke.name}</Text>
            { release==true?
              <>
                <TouchableOpacity style={styles.btnCatch} onPress={goRelease}>
                  <Text style={styles.textCatch}>Release</Text>
                </TouchableOpacity>
              </>
              : 
              <>
                <TouchableOpacity style={styles.btnCatch} onPress={fadeOut}>
                  <Text style={styles.textCatch}>Catch</Text>
                </TouchableOpacity>
              </>
            }
       
        
          </View>
          <ScrollView>
            <View style={{flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
              <Image source={{uri:detailPoke.sprites.other.home.front_default}} style={styles.character}/>
              <Text style={{fontWeight:'bold', color:'orange',alignSelf:'center',paddingTop:5,fontSize:25}}>Profile</Text>
            </View>

            <View style={{flexDirection:'column', alignItems:'center'}}>
              <View style={{marginTop: 10,marginBottom: 15}}>
                  <Text style={styles.detailText}>Height : {detailPoke.height}</Text>
                  <Text style={styles.detailText}>Weight : {detailPoke.weight}</Text>
                  <Text style={styles.detailText}>Species: {detailPoke.species.name}</Text>
              </View>
            </View>

            <View style={{marginBottom: 5, paddingHorizontal: 20,flexDirection:'row'}}>
              <Text style={styles.subText}>Type</Text>
            </View>

            <View style={{ paddingHorizontal: 20,flexDirection:'row'}}>
              {
              detailPoke.types && detailPoke.types.map(item=>{ 
                return(
                  <Text style={styles.detailText}> {item.type.name},</Text>
                )
              })}
            </View>

        <View style={{marginTop: 20, marginBottom: 5, paddingHorizontal: 20}}>
            <Text style={styles.subText}>Ability</Text>
        </View>

        <View style={{ paddingHorizontal: 20,flexDirection:'row'}}>
        {
          detailPoke.abilities && detailPoke.abilities.map(item=>{ 
          return(
                <Text style={styles.detailText}> {item.ability.name},</Text>
          )
        })}
        </View>

        <View style={{marginTop: 20, marginBottom: 5, paddingHorizontal: 20}}>
            <Text style={styles.subText}>Moves</Text>
        </View>

         <View style={{ paddingHorizontal: 20,flexDirection:'row',flexWrap:'wrap'}}>
        {
          detailPoke.moves && detailPoke.moves.map(item=>{ 
          return(
                <Text style={styles.detailText}> {item.move.name},</Text>
          )
        })}
        </View>
        </ScrollView>
      </SafeAreaView>
      )
      }
     </>
  )
}

export default DetailPoke

const styles = StyleSheet.create({
  btnCatch: {
    borderRadius: 20,
    elevation: 3,
    width: 70,
    height : 30,
    alignSelf:'center',
    backgroundColor: 'black',
    justifyContent:'center',
  },
  textCatch: {
    fontSize: 16,
    alignSelf:'center',
    fontWeight: 'bold',
    color: 'white',
  },
  character: {
    height:250,
    width: 250,
    alignSelf:'center',
  },
  subText: {
    fontSize: 20,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
    color:'#3d3d3d'
  },
  detailText: {
    fontSize : 18,
    fontFamily: 'Roboto-Regular',
    textAlign: 'justify',
    color:'#3d3d3d'
  },
  loadingContainer : {
    backgroundColor: 'white',
    width : '100%',
    height : '100%',
    alignItems : 'center',
    justifyContent : 'center'
  },  
  loadingScreen : {
    justifyContent : 'center'
  },
})