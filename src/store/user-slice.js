import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  userChanged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserData(state, action) {
      const data = action.payload;
      state.userData = data;
    },

    setUserChanged(state, action) {
      state.userChanged = !state.userChanged;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
