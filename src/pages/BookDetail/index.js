import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Share, Dimensions, Image, RefreshControl } from 'react-native'
import React ,{useState, useEffect, useCallback}from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconBack,IconLove,IconShare,IconLoveActive,IconLogout } from '../../assets/icons';
import { Star } from '../../assets/images';
import {useDispatch,useSelector} from 'react-redux'
import { getdataBookSpecific } from '../../actions'
import bilrupiah from '../../utils/bilrupiah';
import { notifikasi } from './Notifikasi';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookDetail({route}){
  const[refreshing, setRefreshing] = useState(false);
  const[failLoad, setFailLoad] = useState(false);
  const[done, setDone] = useState(false);
  const[connection, setConnection] = useState(false);
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const ids = route.params.item.id; 
  const token= useSelector(state => state.appData.token)
  
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
      dispatch(getdataBookSpecific(token,ids)) .catch(err=>{
        setFailLoad(true);
      });
      setDone(true);
    }, 2000)
  },[])         
  
  const name = useSelector(state => state.appData.name)             
  const idbooks = useSelector(state => state.appData.idbooks)
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: idbooks.title,
        message:
        name+" Sharing Books "+idbooks.title,
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
  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    wait(2000).then(()=>setRefreshing(false));
  }, []);
  
  const storeData = async (condition) => {
    try {
      await AsyncStorage.setItem('Like?',condition);  
    } catch (error) {
      console.warn(error);
    }
  };

  const getData = async () => {
    const like= await AsyncStorage.getItem('Like?')
    console.log(like)
  }

  const[alternateImage, setAlternateImage] = useState(true);

  const changeImage = () => {
    if (alternateImage){
        notifikasi.configure();
        notifikasi.buatChannel("1");
        notifikasi.kirimNotifikasi("1","App Notifications","You Liked "+idbooks.title);
        storeData("liked")
    } else if(!alternateImage){
        storeData("unliked")
    }
    setAlternateImage(alternateImage => !alternateImage);
  }

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar translucent backgroundColor ='transparent' />
        <ScrollView refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <View style={{backgroundColor : 'transparent',}}>
            <View style={styles.inline}>
              <View style={styles.buttonLeft}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image source={IconBack} style={styles.navIcon}/>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonRight}>
                <View style={styles.buttonLove}>
                  <TouchableOpacity onPress={changeImage}>
                    {alternateImage && <Image source={IconLove} style={styles.navIcon}/>}
                    {!alternateImage && <Image source={IconLoveActive} style={styles.navIcon}/>}
                  </TouchableOpacity>
                </View>
              
                <TouchableOpacity onPress={onShare}>
                  <Image source={IconShare} style={styles.navIcon}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View key={idbooks}>
            <View style={styles.headerTop}>
              <View style={styles.bgC} >
                <View style={styles.bgCard}>
                  <Image source={{uri:idbooks.cover_image}} style={styles.image}/>
                  <View style={{flexDirection:'column', flexWrap : 'wrap',paddingTop:10,height:120, width: screen*0.6,alignItems:'flex-start'}}>
                    <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}} >{idbooks.title}</Text>
                    <Text style={{color:'#000',fontSize:14,paddingTop:5,fontWeight:'bold'}} >{idbooks.author} </Text>
                    <Text style={{color:'#000',fontSize:14,paddingTop:5,fontWeight:'bold'}} >{idbooks.publisher} </Text>
                  </View>
                </View>
              </View>
            </View>
        
            <View style={styles.bgR}>
              <View style={styles.bgRate}>
                <View style={{flexDirection:'column', alignItems:'center'}}>
                  <Text style={{color:'#000',fontSize:16}} > Rating</Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={Star} style={{width:17,height:17, marginRight: 3}}/> 
                    <Text style={{color:'#000',fontSize:16}} >{idbooks.average_rating}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'column', alignItems:'center',paddingLeft:20}}>
                  <Text style={{color:'#000',fontSize:16}}>Purchased</Text>
                  <Text style={{color:'#000',fontSize:16}}>{idbooks.total_sale}</Text>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity>
                    <Text style={{color:'#fff',fontSize:16, fontWeight:'bold'}}>Buy Rp {bilrupiah(idbooks.price)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
              
            <View style={{ marginBottom: 5,paddingHorizontal: 10}}>
              <Text style={{color:'#000',fontSize:18,fontWeight:'bold'}}>
              Overview</Text>
            </View>
            <View style={{marginTop: 5,marginBottom: 15, paddingHorizontal: 10}}>
              <Text style={{color:'#000',fontSize:16}}>{idbooks.synopsis}</Text>
            </View>
              
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const screen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  background : {
    flex : 1,
    backgroundColor : '#EEEEEE',
  },
  inline:{
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingTop:35,
    paddingBottom:15,
    marginHorizontal:10,
  },
  navIcon:{
    width:30,
    height:30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 150,
    height : 40,
    alignSelf:'center',
    backgroundColor : 'green',
    marginLeft:40
  },
  headerTop: {
    width: screen * 1.0,
    height:190,
    backgroundColor : '#fff',
    borderRadius:20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonLeft: {
    display:'flex',
    alignItems: 'flex-start',
  },
  buttonRight: {
    display:'flex',
    flexDirection:'row',
    alignSelf: 'flex-end',
  },
  buttonLove: {
    display:'flex',
    flexDirection:'row',
    alignSelf: 'flex-end',
    marginRight: 10,
  },

  bgC : {
    justifyContent:'center',
    alignItems:'center',

  },
  bgCard : {
    alignSelf:'flex-start',
    backgroundColor : '#fff',
    width: screen * 0.8, 
    height: 130,
    flexDirection:'row',
    paddingTop:10,
    borderRadius:20,
    
  },
  bgR : {
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginVertical: 25,
  },
  bgRate : {
    backgroundColor: '#fff',
    width: screen * 1.0, 
    height: 70,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    height:150,
    width: 100,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius:8
  },
})