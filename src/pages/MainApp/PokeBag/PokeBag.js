import { StyleSheet, Text, View ,TouchableOpacity,Dimensions,SafeAreaView,StatusBar,Image} from 'react-native'
import React, { startTransition, useEffect ,useState,useMemo,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_LOGIN } from '../../../redux/types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getAllPoke,getdataPoke,getNextPoke } from '../../../redux/actions';
import {firebase} from '@react-native-firebase/database';
const PokeBag = ({route}) => {
  const userData = useSelector(state => state.appData.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pokeData,setPokeData] = useState([])
  const goLogout = () => {
    navigation.navigate('Login')
    navigation.reset({index: 0,routes: [{ name: "Login" }],});
    dispatch({ type :FETCH_LOGIN,userData:{},isLogin:false})
  }

  const getPokeData= useCallback(() => {
    firebase.app()
    .database('https://pokemonapp-509fb-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('/pokeBag/'+userData.id)
    .orderByChild('name')
    .on('value', snapshot => {
      if (snapshot.val() != null) {
        setPokeData(Object.values(snapshot.val()))
      }else{
        setPokeData(pokeData)
      }
    }); 
  },[pokeData])
    useEffect(() => {
        getPokeData()
  }, []);
  const goHome = () =>{
      navigation.navigate("Home")
  }
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#EEEEEE"}}>
      <StatusBar barStyle='light-content' backgroundColor='red' />
      <View  style={{flexDirection:'row',justifyContent:'space-between',
        paddingHorizontal:15,backgroundColor:"red",elevation:10,paddingVertical:15, alignItems:'center'}}>
        <TouchableOpacity onPress={goHome}>
            <Icon size={35} color="black" name="home" /> 
        </TouchableOpacity>
        
        <Text style={{color:'black',fontSize:25,fontWeight:'bold'}}>Inventory</Text>
        <View style={{flexDirection:'row'}}> 
          <TouchableOpacity onPress={goLogout}>
            <Icon size={35} color="black" name="logout"/>  
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
       {
          pokeData && pokeData.map(item=>{ 
          return(
            <TouchableOpacity onPress={()=>{
              dispatch(getdataPoke(item.url)).then(
                navigation.navigate("DetailPoke",{
                  dataUrl:item.url,
                  dataName:item.name
                })
              )
                }} style={styles.btnCharacter}>
              <View style={{justifyContent:'center'}}>
                <Icon size={35} color="white" name="pokeball"/> 
              </View>
              <View style={{justifyContent:'center'}}>
                    <Text style={{color:'white',fontSize:17,paddingLeft:8}}>{item.name}</Text>
              </View>
            
            </TouchableOpacity>
          )
        })}
       
      </View>
    
    </SafeAreaView>
  )
}

export default PokeBag


const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  btnCharacter: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    width: screen.width * 0.45,
    height: 50,
    backgroundColor: 'black',
    flexDirection:'row',
  },
      logo: {
        width:35,
        height:35,
        borderRadius:20
      },
          but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
         but2: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
})