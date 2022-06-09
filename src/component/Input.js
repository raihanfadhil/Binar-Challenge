import { StyleSheet, Text, View ,TextInput,Dimensions} from 'react-native'
import React from 'react'

const Input = ({onChangeText,value,placeHolder,secureTextEntry,error}) => {
  return (
    <View>
      <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={'#DDBEBE'}
          secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default Input
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginVertical: 10,
    width: screen.width * 0.8,
    fontSize: 18,
    borderColor: '#694E4E',
    borderWidth: 1,
    borderRadius: 15,
    alignSelf:'center'
  },
})