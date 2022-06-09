import { StyleSheet, Text, View ,TouchableOpacity,Dimensions,SafeAreaView,StatusBar,Image,ScrollView} from 'react-native'
import React, { startTransition, useEffect ,useState,useMemo,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_LOGIN } from '../../redux/types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getAllPoke,getdataPoke,getNextPoke } from '../../redux/actions';
import {logo} from '../../assets/images'

const Home = () => {
  const userData = useSelector(state => state.appData.userData);
    useEffect(  () => {
    dispatch(getAllPoke())
  }, [])
  
  const pokeData = useSelector(state => state.appData.pokeData.results);
  const pokeNext = useSelector(state => state.appData.pokeData.next);
  const pokePrevious = useSelector(state => state.appData.pokeData.previous);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  console.log("user data home :",userData)
  console.log("poke data next :",pokeNext)

  const goLogout = () => {
    navigation.navigate('Login')
    navigation.reset({index: 0,routes: [{ name: "Login" }],});
    dispatch({ type :FETCH_LOGIN,userData:{},isLogin:false})
  }
  const goPokeBag = () => {
    navigation.navigate('PokeBag')
  }
  const [page,setPage]= useState(1);
  
  const pagePlus = useCallback(() => {
    setPage(page+1) 
  },[page])
  const pageMin = useCallback(() => {
    setPage(page-1) 
  },[page])

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#EEEEEE"}}>
      <StatusBar barStyle='light-content' backgroundColor='red' />
      <ScrollView>

        <View style={{flexDirection:'row',justifyContent:'space-between',
          paddingHorizontal:15,backgroundColor:"red",elevation:2,paddingVertical:15, alignItems:'center'}}>
            <TouchableOpacity onPress={goPokeBag}>
              <Icon size={35} color="black" name="bag-personal"/>    
            </TouchableOpacity>
          <Image source={logo} style={styles.logo}></Image>
          <TouchableOpacity onPress={goLogout}>
              <Icon size={35} color="black" name="logout"/> 
            </TouchableOpacity>
          </View>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        {
          pokeData && pokeData.map(item=>{ 
            return(
              <TouchableOpacity onPress={()=>{
                dispatch(getdataPoke(item.url)).then(
                  navigation.navigate("DetailPoke",{
                    dataName: item.name,
                    dataUrl:item.url
                  })
                )
              }} style={styles.btnCharacter}>
              <View style={{justifyContent:'center'}}>
                <Icon size={35} color="red" name="pokeball"/> 
              </View>
              <View style={{justifyContent:'center'}}>
                <Text style={{color:'white',fontSize:17,paddingLeft:8}}>{item.name}</Text>
              </View>
              </TouchableOpacity>
            )
          })}
        </View>
      
        {pokePrevious!=undefined &&
          <TouchableOpacity style={styles.btnPrevious} onPress={()=> {dispatch(getNextPoke(pokePrevious));pageMin()}}>
            <Icon name="skip-previous" color="white" size={25}/>
          </TouchableOpacity>
        }
          <TouchableOpacity style={styles.btnNext} onPress={()=> {dispatch(getNextPoke(pokeNext));pagePlus()}}>
           <Icon name="skip-next" color="white" size={25}/>
          </TouchableOpacity>
      
        <Text style={{color:'black',fontSize:30,alignSelf:'center',fontWeight:'normal',paddingVertical:10}}>{page}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  logo: {
    width:150,
    height:50,
  },
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
  btnNext: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  btnPrevious: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
})