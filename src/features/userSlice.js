import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  
  reducers: {
    login: (state,action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },

  },
});

//actions 
export const { login,logout } = userSlice.actions;
//Selectors 
export const selectUser = (state) => state.user.user;
//reducer
export default userSlice.reducer;
