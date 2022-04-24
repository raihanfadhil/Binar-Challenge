import { Text,View ,SafeAreaView,StatusBar,Dimensions,
    StyleSheet} from 'react-native'
import React from 'react'
import Video from 'react-native-video'
import {trailer} from '../../assets/images'

const MediaHandling = () => {
const videoPlayer = React.useRef();

const goFullScreen = () => {  
  if (videoPlayer.current) {  
      videoPlayer.current.presentFullscreenPlayer();  
  }  
};

return (
    <View style={styles.background}>
        <Text style={{  color : '#000000',fontSize : 30,fontWeight:'bold',paddingBottom:20}}>Fast 9 : Saga Trailer</Text>    
            <Video
                source={trailer}
                style={{
                    width:screen.width*1.0,
                    height:350,
                }}
                fullscreen={true}
                controls={true}
            />
    </View>
)
}

export default MediaHandling

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
background : {
    flex : 1,
    backgroundColor : '#EEEEEE',
    width: screen.width * 1.0,
    height:screen.height*1.0,
    alignItems:'center',
    justifyContent: 'center',
},
})