import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postData: [],
  postChanged: false,
  deletePostId: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    storePostData(state, action) {
      state.postData = action.payload;
    },

    setPostChanged(state) {
      state.postChanged = !state.postChanged;
    },

    setDeletePostId(state, action) {
      const id = action.payload;
      state.deletePostId = id;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice;
