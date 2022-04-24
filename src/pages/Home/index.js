import { StyleSheet, Text, 
  View, SafeAreaView, ScrollView,
  StatusBar,Dimensions,Image,
  RefreshControl,ActivityIndicator, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getdataBook } from '../../actions'
import ListBooks from '../../components/ListBooks'
import NetInfo from '@react-native-community/netinfo';
import PopularBooks from '../../components/PopularBooks'
import { useNavigation } from '@react-navigation/native'
import { IconLogout } from '../../assets/icons';
import { FETCHING_DATA,FETCHING_BOOK } from '../../types';

const Home = () => {
  const[refreshing, setRefreshing] = useState(false);
  const[failLoad, setFailLoad] = useState(false);
  const[done, setDone] = useState(false);
  const[connection, setConnection] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const books = useSelector(state => state.appData.books)
  const token = useSelector(state => state.appData.token)
  const name = useSelector(state => state.appData.name)

  useEffect(()=>{
    NetInfo.fetch().then(state=>{
      if(state.isConnected == true){
        setConnection(true);
        console.log('Connection succes!');
      }else{
        setConnection(false);
        console.log('Connection failed!');
      }
    });
    
    setTimeout(()=>{
    dispatch(getdataBook(token))
    setDone(true);
    }, 2000)
  },[])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    wait(2000).then(()=>setRefreshing(false));
  },[]);

  const goLogout = () => {
    navigation.navigate('Login')
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
    dispatch({      
      type :FETCHING_DATA,
      data:null,
      name :null,
      username: null,
      password: null,
      token:null,
      isFetching:false
    }),
    dispatch({      
      type :FETCHING_BOOK,
      books:null
    })
  }
  
  return ( 
    <>
    {done == false? 
     
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#ffffff"/>
      </View>
      : (failLoad == true? 
        <View style={styles.loadingContainer}>
          <Text style={{color : 'white', fontSize : 20}}>Failed to load data!</Text>
        </View>
      :
      <SafeAreaView style={styles.background}>
        <StatusBar translucent backgroundColor="transparent" />
          <ScrollView refreshControl={
            <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
          }>
        <View style={styles.layoutHome}>
          <Text style={styles.textConnect}>
            {connection == true ? '' : 'Connection Failed!'}
          </Text>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text testID='welcomeText' style={styles.textWelcome}>Welcome, {name}</Text>
            <TouchableOpacity onPress={goLogout}>
              <Image source={IconLogout} style={styles.navIcon}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.textRec}>Recommended Books</Text>
        
          <ListBooks/>
        
          <View style={{paddingTop:10}}>
            <Text style={styles.textRec}>Popular Books</Text>
          
          <PopularBooks/>
     
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
      )
      }
    </>
  );
}

export default Home
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  background : {
    flex : 1,
    backgroundColor : '#EEEEEE',
    width: screen.width * 1.0,
  },
  textConnect : {
    color : 'red',
    justifyContent : 'center',
    alignItems : 'center',
    textAlign : 'center',
    fontSize : 15,
  },
  loadingContainer : {
    backgroundColor: '#EEEEEE',
    width : '100%',
    height : '100%',
    alignItems : 'center',
    justifyContent : 'center'
  },  
  layoutHome : {
    paddingHorizontal:13,
    paddingTop:20,
  },
  textWelcome:{
    color : '#000',
    fontSize : 22,
    fontWeight:'bold'
  },
  textRec : {
    paddingVertical:10,
    color : '#000000',
    fontSize : 16,
    fontWeight:'bold'
  },
  textActor:{
    fontSize : 14,
    fontFamily: 'Roboto-Regular',
    color:'white',
  },
  navIcon:{
    width:25,
    height:25,
  },
})