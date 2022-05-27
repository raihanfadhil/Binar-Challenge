import { Icon } from 'native-base'
import React from 'react'
import { View, Text, StyleSheet,Image ,Dimensions} from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { useSelector } from 'react-redux'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { logo } from '../../assets'
import { useNavigation } from '@react-navigation/native'

const HomeHeader = () => {
    const navigation = useNavigation();
    const {userData} = useSelector(state => state.User);
    console.log (
        "user data home header : ",userData
    )

    return (
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:15,
            backgroundColor:"#1a1a1a",
            elevation:2,
            paddingVertical:15
        }}>
            
            <Image style={styles.logo} source={logo}/>
            <TouchableOpacity onPress={()=>{navigation.navigate("DashboardUser")}}>
                <Image source={{uri:userData.avatar}} style={styles.photo}/>  
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeader;
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
    logo: {
        width:screen.width*0.49,
        height:screen.height*0.036,
      },
    photo :{
        width:30,
        height:30,
        marginRight:16,
         borderRadius:18
     },
})
