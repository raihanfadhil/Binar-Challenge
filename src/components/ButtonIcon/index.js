import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { IconCamera ,IconKey,IconTruck,IconBox} from '../../assets'


const ButtonIcon = ({title,type}) => {

  const Icon = () => {
      if(title==='Sewa Mobil') return <IconTruck/>;
      if(title==='Oleh-Oleh') return <IconBox/>;
      if(title==='Penginapan') return <IconKey/>;
      if(title==='Wisata') return <IconCamera/>;
      return <IconTruck />
  }
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.button(type)}>
          <Icon/>
        </View>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonIcon

const styles = StyleSheet.create({
  button :(type) => ({
    backgroundColor: '#DEF1DF' ,
    padding : type=== "layanan" ? 25:0,
    borderRadius:type=== "layanan" ? 10 : 0,
  }),
  text: {
    marginTop:8,
    textAlign:'center',
    fontSize:13,
    color: '#000000',
    fontFamily:'helvetica',
  },
})