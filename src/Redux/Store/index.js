import User from '../reducer/user'
import {applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistStore,persistReducer} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'

const reducers = combineReducers({
    User    
});

const persistConfig = {
    key:'root',
    storage:AsyncStorage
}

const configPersist = persistReducer(persistConfig,reducers)
// const Store = configureStore(configPersist,applyMiddleware(Thunk))
const Store = configureStore({
    reducer: configPersist,
    middleware: [Thunk]
});

export const PersistStor = persistStore(Store) 
export default Store