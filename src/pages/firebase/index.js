import { StyleSheet, Text, View ,Button} from 'react-native'
import React,{useEffect} from 'react'
import crashlytics from '@react-native-firebase/crashlytics'
import messaging from '@react-native-firebase/messaging';
async function onSignIn(user) {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
  ]);
}


const Firebase = () => {

  const onNotificationOpen = () => {
    //it will be trigger when app was in background
    messaging().onNotificationOpenedApp(remoteMessage =>{
      console.log(
        'Notification caused app to open from background state',
        remoteMessage.notification
      )
    })

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if(remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          )

        }
      })

    messaging().onMessage(remoteMessage =>{
      console.log(remoteMessage, 'On Message')
    })
  }

  const getToken = async () => {
    const token = await messaging().getToken()
    console.log(token)
  }
  useEffect(() => {
    getToken()
    crashlytics().log('App mounted.');
    onNotificationOpen()
  }, []);

  return (
    <View>
      <Text style={{fontWeight:"bold",textAlign:"center",color:"black",fontSize:25}}>Firebase Exercises </Text>
      <View >
      <Button
        title="Sign In"
        onPress={() =>
          onSignIn({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Joaquin Phoenix',
            email: 'phoenix@example.com',
            credits: 42,
          })
        }
      />
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />

    

      </View>
    </View>
  )
}

export default Firebase

const styles = StyleSheet.create({})