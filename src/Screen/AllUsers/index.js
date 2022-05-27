import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet,Image,Text,Dimensions} from 'react-native';
import {ListItem} from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import {COLORS} from '../../Component/Constant/Color';
import {FONTS} from '../../Component/Constant/Font';
import  {firebase} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import { DefaultAvatar } from '../../assets';

const AllUsers = ({navigation}) => {
  const {userData} = useSelector(state => state.User);
  console.log("user data redux all chat : ",userData)
  const [search, setsearch] = useState('');
  const [allUser, setallUser] = useState([]);
  const [allUserBackup, setallUserBackup] = useState([]);

  useEffect( () => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    firebase.app()
      .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log('all User data: ', Object.values(snapshot.val()));
        setallUser(
          Object.values(snapshot.val()).filter(it => it.id != userData.id),
        );
        setallUserBackup(
          Object.values(snapshot.val()).filter(it => it.id != userData.id),
        );
      });
  };
  
  const searchuser = val => {
    setsearch(val);
    setallUser(allUserBackup.filter(it => it.name.match(val)));
  };
  console.log(" All userr coba : ",allUser)
  const createChatList = data => {
    firebase.app()
      .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('/chatlist/' + userData.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId,
            id: userData.uid,
            name: userData.name,
            avatar: userData.avatar,
            emailId: userData.email,
            about: userData.bio,
            lastMsg: '',
          };
          firebase.app()
            .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/chatlist/' + data.id + '/' + userData.id)
            .update(myData)
            .then(() => console.log('Data updated.'));

          delete data['password'];
          data.lastMsg = '';
          data.roomId = roomId;

          firebase.app()
            .database('https://chattingapp-3b6b9-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .update(data)
            .then(() => console.log('Data updated.'));

          navigation.navigate('ChatUser', {receiverData: data});
        } else {
          navigation.navigate('ChatUser', {receiverData: snapshot.val()});
        }
      });
  };

  const renderItem = ({item}) => (
    <>
    <ListItem
      onPress={() => createChatList(item)}
      bottomDivider
      containerStyle={{paddingVertical:15,marginVertical:0,backgroundColor:'#EEEEEE'}}>
        {!item.avatar ? <Image source={DefaultAvatar} style={styles.photo}/>
          : <Image source={{uri:item.avatar}} style={styles.photo}/>
        }
      <ListItem.Content>
        <ListItem.Title 
          style={{fontFamily:FONTS.Bold,fontSize:16,color:'black',paddingBottom:8,fontWeight:'bold'}}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{fontFamily: FONTS.Regular, fontSize: 14,color:'black',paddingTop:1}}
          numberOfLines={1}>
          {item.bio}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    </>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.theme} />
      <SearchBar
        placeholder="Search by name..."
        placeholderTextColor={"#EEEEEE"}
        onChangeText={val => searchuser(val)}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default AllUsers;
 const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  searchContainer: {
    elevation: 2,
    backgroundColor: COLORS.theme,
    paddingHorizontal: 0,
  },
  searchInput: {
    fontSize: 17,
    fontFamily: FONTS.Regular,
    color: '#EEEEEE',
    opacity: 0.9,
    borderRadius:15,
    backgroundColor:'#1a1a1a',
    paddingLeft:20
  },
  listStyle: {
    paddingVertical: 7, 
    marginVertical: 2,
    backgroundColor:'#EEEEEE'},
  photo :{
    width:50,
    height:50,
    marginRight:10,
    borderRadius:30
  },
});
