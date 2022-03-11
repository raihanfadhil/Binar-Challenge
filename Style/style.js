import { StyleSheet,  Dimensions} from 'react-native';

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({

 container: {
    flex :1,
    backgroundColor: "#fff",
    alignItems: "center",

  },
//   card:{
//     backgroundColor: "#fff",
//     width: screen.width * 0.8,
//     borderBottomLeftRadius: 15,
//     borderBottomRightRadius: 15,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//   },
  
  image:{
    width: screen.width*1.0,
    height : screen.height * 1.0,
  },
 
   texta:{
    alignItems:'center',
    justifyContent :'center',
    color : '#FFFFFF',
    backgroundColor : 'red'
  },
 
});

export default styles;