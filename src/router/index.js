import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Splash,Home,MovieDetails} from '../pages'


const Stack = createStackNavigator();

const MainApp = () => {
  return(
      <Home/>
  )
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component = {Splash} options={{headerShown: false}}/>          
        <Stack.Screen name="MainApp" component = {MainApp} options={{headerShown: false}}/>
        <Stack.Screen name="MovieDetails" component = {MovieDetails} options={{headerShown: false}}/>
       
    </Stack.Navigator>
  )
}

export default Router
