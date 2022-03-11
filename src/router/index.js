import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Home,Splash,Akun,DaftarMobil} from '../pages'
import BottomNavigator from '../components/BottomNavigator'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainApp = () => {
  return(
      <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name="DaftarMobil" component = {DaftarMobil} />
        <Tab.Screen name="Akun" component = {Akun} />
      </Tab.Navigator>
  )
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Splash" component = {Splash} options={{headerShown: false}}/>       
        <Stack.Screen name="MainApp" component = {MainApp} options={{headerShown: false}}/>      
     
    </Stack.Navigator>
  )
}

export default Router
