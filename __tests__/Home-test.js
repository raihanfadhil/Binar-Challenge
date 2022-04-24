import 'react-native';
import React from 'react';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import Home from '../src/pages/Home';
import {render} from '@testing-library/react-native'
import  Store , {PersistStor}  from '../src/store';
import MockAsyncStorage from 'mock-async-storage'

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-native-community/netinfo', () => ({
    useNetInfo: jest.fn()
}));


export default function ContainerTesting(component){
    return (
        <Provider store={Store}>
            <PersistGate persistor={PersistStor}>{component}</PersistGate>
        </Provider>
    )
}

describe ('name of the group', () => {
    describe ('1',()=>{
        test('should render', ()=>{
            const snap=render(ContainerTesting(<Home />))
            expect(snap).toMatchSnapshot();
           })
    })
})