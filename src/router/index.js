import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from '../Screen/Login';
import Splash from '../Screen/Splash';
import Register from '../Screen/Register';
import Home from '../Screen/Home';
import ChatUser from '../Screen/ChatUser';
import DashboardUser from '../Screen/DashboardUser';
import AllUsers from '../Screen/AllUsers';
import OtherProfile from '../Screen/DashboardUser/otherProfile';
const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen name="Login" component = {Login} options={{headerShown: false}}/>       
        <Stack.Screen name="Splash" component = {Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component = {Register} options={{headerShown: false}}/>     
        <Stack.Screen name="Home" component = {Home} options={{headerShown: false}}/>
        <Stack.Screen name="ChatUser" component = {ChatUser} options={{headerShown: false}}/>
        <Stack.Screen name="DashboardUser" component = {DashboardUser} options={{headerShown: false}}/>
        <Stack.Screen name="AllUsers" component = {AllUsers} options={{headerShown: false}}/>
        <Stack.Screen name="OtherProfile" component = {OtherProfile} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Router
