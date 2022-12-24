import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentChanged: false,
  commentDeleteId: null,
  commentEditId: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentChanged(state) {
      state.commentChanged = !state.commentChanged;
    },

    setCommentDeleteId(state, action) {
      const id = action.payload;
      state.commentDeleteId = id;
    },

    setCommentEditId(state, action) {
      const id = action.payload;
      state.commentEditId = id;
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice;
