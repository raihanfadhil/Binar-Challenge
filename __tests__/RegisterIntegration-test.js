import 'react-native';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { dataRegister } from '../dummy/dataRegister';
import { fetchingRegisterTest } from '../src/actions';

describe ('Register API test', () => {
  it('Api Register Test',async()=>{
       let mock = new MockAdapter(axios)
       const registerBody = {
           "email":"raihanfadhil318@gmail.com",
           "password":"raihan123",
           "name":"Raihan Fadhil"
       }
       mock.onPost('http://code.aldipee.com/api/v1/auth/register').reply(200,dataRegister)
       let res = await fetchingRegisterTest(registerBody)
       console.log(res.data)
       expect(res.data).toEqual(dataRegister)
       expect(res.status).toEqual(200)
})
})