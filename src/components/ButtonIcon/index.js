import { StyleSheet, View ,Text} from 'react-native'
import React from 'react'
import { IconLove,IconBack,IconShare } from '../../assets'
import { TouchableOpacity } from 'react-native-gesture-handler'
const ButtonIcon = ({title,type}) => {

  const Icons = () => {
      if(title==='Love') return <IconLove/>;
      if(title==='Back') return <IconBack/>;
      if(title==='Share') return <IconShare/>;
      return <IconLove/>
  }
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.button}>
          <Icons/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonIcon

const styles = StyleSheet.create({
  button :{
    backgroundColor: '#DEF1DF' ,
    padding :  20,
  },
})