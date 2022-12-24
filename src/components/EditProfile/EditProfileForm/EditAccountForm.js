import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../../store/post-slice';
import { userActions } from '../../../store/user-slice';
import {
  VALIDATE_TEXT_REQ_MAX_8,
  VALIDATE_TEXT_REQUIRED,
  VALIDATE_EMAIL,
} from '../../FormElements/validator';

import useUpload from '../../../hooks/upload-hook';
import useForm from '../../../hooks/form-hook';
import useHttp from '../../../hooks/http-hook';
import UserImageUpload from '../UserImageUpload/UserImageUpload';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import { toast } from 'react-toastify';

const EditAccountForm = () => {
  const { photo, firstName, lastName, email } = useSelector(
    (state) => state.user.userData
  );
  const dispatch = useDispatch();

  const { sendRequest: updateUser, isLoading: updatingUser } = useHttp();

  const [userUpdated, setUserUpdated] = useState(false);

  const {
    imgFile,
    imgFilePickedRef,
    previewUrl,
    setPreviewUrl,
    imgFileIsValid,
    pickImgHandler,
    imgPickedHandler,
    inputKey,
    resetImgFile,
    resetImgDone,
  } = useUpload();

  const {
    value: enteredFirstName,
    setEnteredValue: setFirstName,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    reset: firstNameReset,
  } = useForm(VALIDATE_TEXT_REQ_MAX_8);

  const {
    value: enteredLastName,
    setEnteredValue: setLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    reset: lastNameReset,
  } = useForm(VALIDATE_TEXT_REQ_MAX_8);

  const {
    value: enteredEmail,
    setEnteredValue: setEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: emailReset,
  } = useForm(VALIDATE_EMAIL);

  useEffect(() => {
    if (!photo || !firstName || !lastName || !email) return;

    const photoUrl =
      photo === 'default.jpg'
        ? null
        : process.env.REACT_APP_BACKEND_URL + `/users/${photo}`;

    setPreviewUrl(photoUrl);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
  }, [
    userUpdated,
    photo,
    setPreviewUrl,
    setFirstName,
    setLastName,
    firstName,
    lastName,
    setEmail,
    email,
  ]);

  let accountFormIsValid = false;
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    accountFormIsValid = true;
  }

  const accountFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!accountFormIsValid) return;

    const formData = new FormData();

    if (imgFile) {
      formData.append('photo', imgFile);
    } else if (!imgFile && resetImgDone) {
      formData.append('photo', 'default.jpg');
    }
    formData.append('firstName', enteredFirstName);
    formData.append('lastName', enteredLastName);
    formData.append('email', enteredEmail);

    const updatedUserData = (data) => {
      if (data.status === 'success') {
        toast.success('Account is updated successfully');
        dispatch(postActions.setPostChanged());
        dispatch(userActions.setUserChanged());
        setUserUpdated((prev) => !prev);
        firstNameReset();
        lastNameReset();
        emailReset();
      } else {
        toast.error(data.message);
      }
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + `/api/v1/users/updateMe`,
      method: 'PATCH',
      body: formData,
    };

    updateUser(reqConfig, updatedUserData);
  };

  return (
    <div className="edit-profile__account-inputs--holder">
      <form onSubmit={accountFormSubmitHandler}>
        <UserImageUpload
          className="edit-profile__user-img--upload"
          value={imgFile}
          id="user-upload"
          url={previewUrl}
          inputRef={imgFilePickedRef}
          onInputChange={imgPickedHandler}
          onPickImg={pickImgHandler}
          inputKey={inputKey}
          reset={resetImgFile}
        />

        <div>
          <h3 className="edit-profile__input-type--title">
            Your Account Settings + Photo
          </h3>
          <div className="edit-profile__text-inputs--holder">
            <Input
              field="input"
              id="first-name"
              placeholder="First Name"
              type="text"
              value={enteredFirstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
              hasError={firstNameHasError}
              errorMsg="First Name shoud be between 3 to 8 char."
            />
            <Input
              field="input"
              id="last-name"
              placeholder="Last Name"
              type="text"
              value={enteredLastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
              hasError={lastNameHasError}
              errorMsg="Last Name shoud be between 3 to 8 char."
            />
            <Input
              field="input"
              id="email"
              placeholder="Email"
              type="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              hasError={emailHasError}
              errorMsg="Please enter a valid email"
            />
            {updatingUser ? (
              <Button
                type="submit"
                className="edit-profile__save--btn"
                disabled
              >
                Saving...
              </Button>
            ) : (
              <Button type="submit" className="edit-profile__save--btn">
                Save Settings
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAccountForm;
