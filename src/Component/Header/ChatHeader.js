import { Icon } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, } from 'react-native';
import { COLORS } from '../Constant/Color';
import { FONTS } from '../Constant/Font';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatHeader = (props) => {
  const navigation = useNavigation();
  const { data } = props;
  const  item = JSON.stringify(data)
  const  itemAvatar = data.avatar
  const  itemName = data.name
  const  itemBio = data.bio
  const  itemEmail = data.email
  console.log("data array : ",itemName)
  const [lastSeen, setlastSeen] = useState('')

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.theme} translucent={false} />
      <Icon
        style={{
          marginHorizontal: 10,
          color: COLORS.black,
        }}
        name = "chevron-back"
        type = "Ionicons"
        onPress = {() => navigation.pop()}
      />
        <Image source={{uri:data.avatar}} style={styles.photo}/> 
        <View 
            style={{flex:1, marginLeft: 5}}
        >
      <TouchableOpacity onPress={()=>{
        navigation.navigate("OtherProfile",{
          dataName: itemName,
          dataEmail: itemEmail,
          dataBio : itemBio,
          dataAvatar: itemAvatar
        })
      }}>
      
      <Text
        numberOfLines={1}
        style={{
          color: COLORS.black,
          fontSize: 20,
          fontFamily: FONTS.SemiBold,
          textTransform:'capitalize',
          fontWeight:'bold'              
        }}
            >
                {data.name}
            </Text>
        </TouchableOpacity>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height:70,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems:'center',
    },
      photo :{
        width:45,
        height:45,
        marginRight:10,
        borderRadius:25
     },
});

export default ChatHeader;