import 'react-native';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { dataBook } from '../dummy/dataBook';
import { fetchingBookTest} from '../src/actions';


describe ('Testing Data Book  Api', () => {
  it('Api Book  Test',async()=>{
       let mock = new MockAdapter(axios)
       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjRlMWNjODIyNTM2YzdmYzdmZmM5MDUiLCJpYXQiOjE2NTA1ODk5MTUsImV4cCI6MTY1MDU5MTcxNSwidHlwZSI6ImFjY2VzcyJ9.2KbMfXRqK0hEY7-YQq3UdsWwePH2LLRN4lDhDGr55AM"
       mock.onGet('http://code.aldipee.com/api/v1/books').reply(200,dataBook)
       let res = await fetchingBookTest(token)
       console.log("data api book :",res.data)
       expect(res.data).toEqual(dataBook)
       expect(res.status).toEqual(200)
})
})