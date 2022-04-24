import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
// import { useNavigation } from '@react-navigation/native'

// const navigation = useNavigation();
const Menu = ({navigation}) => {

    return (
        <View style={styles.background}>
            <TouchableOpacity style={styles.button}
            onPress={() => {navigation.navigate("Login")}}>
                <Text style={styles.text}>Book App</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => {navigation.navigate("MediaHandling")}}>
                <Text style={styles.text}>Media Handling</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
background : {
    flex : 1,
    backgroundColor : '#EEEEEE',
    width: screen.width * 1.0,
    alignItems:'center',
    justifyContent: 'center',
},
button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: screen.width * 0.8,
    height : 50,
    alignSelf:'center',
    backgroundColor: 'black',
  },
text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
},
})