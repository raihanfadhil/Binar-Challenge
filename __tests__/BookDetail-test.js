import 'react-native';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { dataBookDetails } from '../dummy/dataBookDetails';
import { fetchingBookDetailTest} from '../src/actions';


describe ('Testing Data Book Details Api', () => {
  it('Api Book Details Test',async()=>{
       let mock = new MockAdapter(axios)
       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjRlMWNjODIyNTM2YzdmYzdmZmM5MDUiLCJpYXQiOjE2NTA1ODk5MTUsImV4cCI6MTY1MDU5MTcxNSwidHlwZSI6ImFjY2VzcyJ9.2KbMfXRqK0hEY7-YQq3UdsWwePH2LLRN4lDhDGr55AM"
       mock.onGet('http://code.aldipee.com/api/v1/books/6231453513c01e6f8b566ece').reply(200,dataBookDetails)
       let res = await fetchingBookDetailTest(token)
       console.log("data api book details :",res.data)
       expect(res.data).toEqual(dataBookDetails)
       expect(res.status).toEqual(200)
})
})