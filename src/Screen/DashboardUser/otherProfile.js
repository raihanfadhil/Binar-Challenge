import { StyleSheet, Text, View,SafeAreaView,StatusBar,Dimensions,Image,TouchableOpacity, RefreshControl,ScrollView} from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import { COLORS } from '../../Component/Constant/Color'
import { profile } from '../../assets'
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Logout from '../logout'
import { TextInput } from 'react-native-gesture-handler';

function OtherProfile({route}){
  const navigation = useNavigation()
  const { dataName,dataBio,dataAvatar,dataEmail } = route.params;
  console.log("name : ",dataName)
  
  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.theme,}}>
      <StatusBar  barStyle="light-content" backgroundColor={COLORS.black} />
        <View style={{
          flexDirection:'row',
          justifyContent:'flex-start',
          alignContent:'center',
          paddingHorizontal:10,
          backgroundColor:COLORS.black,
          paddingVertical:15}}>
          <Icon style={{ marginHorizontal: 10, color: COLORS.theme}}
            name = "chevron-back"
            type = "Ionicons"
            onPress = {() => navigation.pop()}/>
          <Image style={styles.logo} source={profile}/>
        </View>
        
        <View style={{paddingTop:30}}>
          <View style={styles.photo} >
            <Image   style={styles.photo} source={{uri:dataAvatar}} />
          </View>
          <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1, paddingTop:30   }}/>
          <View style={{flexDirection:'column',width:screen.width*1}}> 
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:7,alignSelf:'flex-start'}}>Name</Text>
              <TextInput style={styles.input} placeholder={dataName} placeholderTextColor={'#1a1a1a'}  editable={false}  />      
            </View>
            <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1, paddingTop:15   }}/>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:8,alignSelf:'flex-start'}}>Email</Text>
              <TextInput style={styles.input} placeholder={dataEmail} placeholderTextColor={'#1a1a1a'} editable={false}   />    
            </View>
            <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1,  paddingTop:15   }}/>
            <View style={{flexDirection:'row'}}>
              <Text style={{color:COLORS.black,fontSize:20,fontWeight:'bold',paddingTop:10,paddingLeft:20,paddingRight:22,alignSelf:'flex-start'}}>Bio </Text>
              <TextInput style={styles.input} placeholder={dataBio} placeholderTextColor={'#1a1a1a'}  editable={false}  />    
            </View>   
          </View>
          <View style={{ borderBottomColor: COLORS.theme,borderBottomWidth: 1, paddingTop:15   }}/>
        </View>    
  
        </SafeAreaView>
    
    </>
  )
}

export default OtherProfile
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  photo :{
    width:screen.width*0.42,
    height:screen.height*0.236,
    borderRadius:300,     
    alignSelf:'center'
  },
  logo: {
    width:screen.width*0.29,
    height:screen.height*0.036,
  },
  input: {
    fontSize: 20,
    color: '#1a1a1a',
    paddingLeft:20
  },
});
