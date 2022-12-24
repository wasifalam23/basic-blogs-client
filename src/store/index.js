import { configureStore } from '@reduxjs/toolkit';
import postSlice from './post-slice';
import authSlice from './auth-slice';
import userSlice from './user-slice';
import commentSlice from './comment-slice';
import uiSlice from './ui-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    post: postSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export default store;
