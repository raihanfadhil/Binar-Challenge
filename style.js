import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
    
  container: {
    flex :1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card:{
    backgroundColor: "#fff",
    width: screen.width * 0.8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
	width: 0,
	height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 5,
  },
  image:{
    height: screen.width*0.8,
    borderTopLeftRadius : 15,
    borderTopRightRadius : 15,
  },
  nameText:{
    fontWeight: "bold",
    color: "black",
  },
  descriptionText:{
    marginTop : -10,
    fontWeight: "normal",
    color : "black"
  },
  footer:{
    paddingHorizontal: 15,
    paddingVertical:10,
    alignItems:'center',
  },
  description:{
    paddingHorizontal: 15,
    paddingVertical:10,
    alignItems:'center',
  },
  buttonPosition:{
    flexDirection:"row",
    justifyContent : "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems:'flex-start',
    marginBottom : 20,
    marginRight : 10,
    marginLeft: 10,
  },

  buttonColor:{
    fontWeight: "bold",
    color : "#059911",
    fontSize : 17,
  },
});

export default styles;