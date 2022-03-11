import { StyleSheet, Dimensions} from 'react-native'

const screen = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  page: {
    flex :1,
    backgroundColor: "#fff",
    paddingBottom : 20,
  },
  headerTop: {
    width: screen,
    height:178,
    backgroundColor : '#D3D9FD',
  },
  headerTopNamePhoto: {
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  headerText: {
    marginTop :50,
    marginLeft:16,
    marginBottom:16,
    flexDirection:'column'
  },
  photo: {
    width:30,
    height:30,
    marginRight : 16,
    marginTop :60,
    borderRadius:15
  },
  layanan: {
    paddingLeft:20,
    paddingTop :100,
  },
  iconLayanan: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight:16,
  },
  listView: {
    marginTop:16,
    marginLeft:16,
    width: screen * 0.9,
    height:98,
    borderBottomLeftRadius:4,
    borderTopLeftRadius:4,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,

  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  label : {
    fontSize: 14,
    color: '#000000'
  },
  boxContent: {
    margin:16,
    flexDirection:'row',
    justifyContent: 'flex-start'
  },
  photoXenia:{
    width:40,
    height:24,
    marginTop:4,
    marginRight:16,
  },
  carContent:{
    flexDirection:'column',
    justifyContent: 'flex-start'
  },
}) 

export default styles