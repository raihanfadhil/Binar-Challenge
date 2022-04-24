import 'react-native';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { dataLogin } from '../dummy/dataLogin';
import { fetchingLoginTest} from '../src/actions';


describe ('Login API Test', () => {
  it('Login API Test',async()=>{
       let mock = new MockAdapter(axios)
       const loginBody = {
           "email":"reybin@gmail.com",
           "password":"reyh2022"
       }
       mock.onPost('http://code.aldipee.com/api/v1/auth/login').reply(200,dataLogin)
       let res = await fetchingLoginTest(loginBody)
       console.log(res.data)
       expect(res.data).toEqual(dataLogin)
       expect(res.status).toEqual(200)
})
})