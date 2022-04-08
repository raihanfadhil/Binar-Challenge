import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';

import {Provider} from 'react-redux'
import  Store , {PersistStor}  from './store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  return(
        <Provider store={Store}>
        <PersistGate loading ={null} persistor={PersistStor}>
         <NavigationContainer>
           <Router />
         </NavigationContainer>
         </PersistGate>
         </Provider>
     );
}

export default App
