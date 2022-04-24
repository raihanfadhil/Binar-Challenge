import {applyMiddleware,combineReducers,createStore} from 'redux'
import Thunk from 'redux-thunk'
import TodosReducer from '../reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const Reducers = {
    appData :TodosReducer,
}

const persistConfig = {
    key:'root',
    storage:storage
}
const configPersist = persistReducer(persistConfig,combineReducers(Reducers))

// const Store = createStore(combineReducers(Reducers),applyMiddleware(Thunk))
const Store = createStore(configPersist,applyMiddleware(Thunk))
export const PersistStor = persistStore(Store) 
export default Store