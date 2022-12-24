import React from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '../../../store/ui-slice';
import { authActions } from '../../../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useHttp from '../../../hooks/http-hook';

import ConfirmModal from '../../../utils/ConfirmModal/ConfirmModal';

const LogoutModal = () => {
  const { sendRequest: logoutUser } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutModalConfirmHandler = () => {
    const logoutStatus = (data) => {
      if (data.status === 'success') {
        toast.success('You have successfully logged out');
        navigate('/auth');
        dispatch(authActions.setIsLoggedIn(false));
      } else {
        toast.error('Something went wrong!');
      }
    };

    logoutUser(
      {
        url: process.env.REACT_APP_BACKEND_URL + '/api/v1/users/logout',
      },
      logoutStatus
    );

    navigate('/auth', { replace: true });
    dispatch(uiActions.setDesktopLogoutConfirmModalState(false));
    dispatch(uiActions.setMobileLogoutConfirmModalState(false));
  };

  const logoutModalCancelHandler = () => {
    dispatch(uiActions.setDesktopLogoutConfirmModalState(false));
    dispatch(uiActions.setMobileLogoutConfirmModalState(false));
  };

  return (
    <ConfirmModal
      title="Logout?"
      message="Do you really want to logout?"
      onConfirm={logoutModalConfirmHandler}
      onCancel={logoutModalCancelHandler}
    />
  );
};

export default LogoutModal;
