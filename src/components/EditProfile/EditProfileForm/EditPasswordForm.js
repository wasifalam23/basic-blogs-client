import React from 'react';
import { toast } from 'react-toastify';
import useForm from '../../../hooks/form-hook';
import useHttp from '../../../hooks/http-hook';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import { VALIDATE_PASSWORD } from '../../FormElements/validator';

const EditPasswordForm = () => {
  const { sendRequest: updatePassword, isLoading: passwordUpdating } =
    useHttp();

  const {
    value: enteredCurrPassword,
    valueChangeHandler: currPasswordChangeHandler,
    valueBlurHandler: currPasswordBlurHandler,
    isValid: currPasswordIsValid,
    hasError: currPasswordHasError,
    reset: currPasswordReset,
  } = useForm(VALIDATE_PASSWORD);

  const {
    value: enteredNewPassword,
    valueChangeHandler: newPasswordChangeHandler,
    valueBlurHandler: newPasswordBlurHandler,
    isValid: newPasswordIsValid,
    hasError: newPasswordHasError,
    reset: newPasswordReset,
  } = useForm(VALIDATE_PASSWORD);

  const {
    value: enteredConfirmPassword,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    reset: confirmPasswordReset,
  } = useForm(VALIDATE_PASSWORD);

  let passFormIsValid = false;
  if (currPasswordIsValid && newPasswordIsValid && confirmPasswordIsValid) {
    passFormIsValid = true;
  }

  const passwordFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!passFormIsValid) return;

    const updatedPasswordData = (data) => {
      if (data.status === 'success') {
        toast.success('You password has been changed');
        currPasswordReset();
        newPasswordReset();
        confirmPasswordReset();
      } else {
        toast.error(data.message);
      }
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + '/api/v1/users/updateMyPassword',
      method: 'PATCH',
      body: JSON.stringify({
        passwordCurrent: enteredCurrPassword,
        password: enteredNewPassword,
        passwordConfirm: enteredConfirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    updatePassword(reqConfig, updatedPasswordData);
  };

  return (
    <div className="edit-profile__password-inputs--holder">
      <form onSubmit={passwordFormSubmitHandler}>
        <div>
          <h3 className="edit-profile__input-type--title">Change Password</h3>
          <div className="edit-profile__text-inputs--holder">
            <Input
              field="input"
              id="curr-pass"
              placeholder="Current Password"
              type="password"
              value={enteredCurrPassword}
              onChange={currPasswordChangeHandler}
              onBlur={currPasswordBlurHandler}
              hasError={currPasswordHasError}
              errorMsg="You must enter your current password"
            />
            <Input
              field="input"
              id="new-pass"
              placeholder="New Password"
              type="password"
              value={enteredNewPassword}
              onChange={newPasswordChangeHandler}
              onBlur={newPasswordBlurHandler}
              hasError={newPasswordHasError}
              errorMsg="You must enter a new password"
            />
            <Input
              field="input"
              id="confirm-pass"
              placeholder="Confirm New Password"
              type="password"
              value={enteredConfirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              hasError={confirmPasswordHasError}
              errorMsg="You must confirm your new password"
            />
            {passwordUpdating ? (
              <Button
                type="submit"
                className="edit-profile__save--btn"
                disabled
              >
                Saving...
              </Button>
            ) : (
              <Button type="submit" className="edit-profile__save--btn">
                Save Password
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPasswordForm;
