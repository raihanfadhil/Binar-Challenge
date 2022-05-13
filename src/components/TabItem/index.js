import { StyleSheet, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import {IconQR,IconQRActive,IconHome,IconHomeActive} from '../../assets/icons'
import {WARNA_UTAMA,WARNA_DISABLE} from '../../utils/constant'

const TabItem = ({isFocused,onPress,onLongPress,label}) => {
  const Icon = () => {
    return <IconHome/>
  }
  return (
    <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            {Icon}
             <Text style={styles.text(isFocused)}>
              {label}
            </Text>
          </TouchableOpacity>
  )
}

export default TabItem;

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
    },
    text : (isFocused) => ({
        fontSize:15,
        color: isFocused ? WARNA_UTAMA :WARNA_DISABLE
    })
})