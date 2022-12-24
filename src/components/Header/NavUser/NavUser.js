import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/ui-slice';

import UserCard from './UserCard/UserCard';

import defaultUserJpg from '../../../assets/default.jpg';

import './NavUser.scss';
import LogoutModal from '../LogoutModal/LogoutModal';

const NavUser = () => {
  const userPhoto = useSelector((state) => state.user.userData.photo);
  const ui = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const cardOpenCloseHandler = () => {
    dispatch(uiActions.setUserCardState());
  };

  const cardCancelHander = () => {
    dispatch(uiActions.setUserCardClose());
  };

  return (
    <div className="nav-user__container">
      {ui.showDesktopLogoutConfirmModal && <LogoutModal />}
      {ui.userCardIsOpen && <UserCard onCancel={cardCancelHander} />}
      <div className="nav-user__photo--holder" onClick={cardOpenCloseHandler}>
        <img
          className="nav-user__photo"
          src={
            userPhoto
              ? process.env.REACT_APP_BACKEND_URL + `/users/${userPhoto}`
              : defaultUserJpg
          }
          alt="user-avatar"
        />
      </div>
    </div>
  );
};

export default NavUser;
