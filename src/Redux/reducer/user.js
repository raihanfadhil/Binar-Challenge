import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login : false,
    chatData: {},
  },
  reducers: {
    setUser(state,action) {
      const user = action.payload;
      return {...state, userData:user,login:true}
    },
    setChat(state,action) {
      const chat = action.payload;
      return {...state, chatData:chat,login:true}
    },
    removeUser(state,action) {
       return {...state, userData:{},login:false}
    }
  }
})

export const {  setUser, removeUser,setChat } = userSlice.actions;

export default userSlice.reducer;
