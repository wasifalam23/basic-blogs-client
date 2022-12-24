import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userCardIsOpen: false,
  showDesktopLogoutConfirmModal: false,
  showMobileLogoutConfirmModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUserCardState(state) {
      state.userCardIsOpen = !state.userCardIsOpen;
    },

    setUserCardClose(state) {
      state.userCardIsOpen = false;
    },

    setDesktopLogoutConfirmModalState(state, action) {
      state.showDesktopLogoutConfirmModal = action.payload;
    },

    setMobileLogoutConfirmModalState(state, action) {
      state.showMobileLogoutConfirmModal = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
