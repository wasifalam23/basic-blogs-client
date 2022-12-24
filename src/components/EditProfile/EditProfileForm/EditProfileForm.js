import React from 'react';
import './EditProfileForm.scss';

import EditAccountForm from './EditAccountForm';
import EditPasswordForm from './EditPasswordForm';

const EditProfileForm = () => {
  return (
    <div className="edit-profile__container">
      <div className="edit-profile__inputs--holder">
        <EditAccountForm />
        <EditPasswordForm />
      </div>
    </div>
  );
};

export default EditProfileForm;
