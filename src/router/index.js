import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Splash,Home,BookDetail,Login,Register,RegisterComplete,Menu,MediaHandling} from '../pages'
const Stack = createStackNavigator();
const MainApp = () => {

  return(
      // <Login/>
      <Home/>
  )
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component = {Splash} options={{headerShown: false}}/> 
        <Stack.Screen name="Login" component = {Login} options={{headerShown: false}}/> 
        <Stack.Screen name="Register" component = {Register} options={{headerShown: false}}/>        
        <Stack.Screen name="MainApp" component = {MainApp} options={{headerShown: false}}/>
        <Stack.Screen name="BookDetail" component = {BookDetail} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterComplete" component = {RegisterComplete} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component = {Home} options={{headerShown: false}}/>
        <Stack.Screen name="Menu" component = {Menu} options={{headerShown: false}}/>
        <Stack.Screen name="MediaHandling" component = {MediaHandling} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Router
