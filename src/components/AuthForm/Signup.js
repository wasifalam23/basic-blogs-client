import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import {
  VALIDATE_TEXT_REQ_MAX_8,
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
} from '../FormElements/validator';

import useHttp from '../../hooks/http-hook';
import useForm from '../../hooks/form-hook';

import Input from '../FormElements/Input/Input';
import Button from '../FormElements/Button/Button';
import { toast } from 'react-toastify';

const Signup = () => {
  const { sendRequest: createUser } = useHttp();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredFirstName,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
  } = useForm(VALIDATE_TEXT_REQ_MAX_8);

  const {
    value: enteredLastName,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
  } = useForm(VALIDATE_TEXT_REQ_MAX_8);

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
  } = useForm(VALIDATE_EMAIL);

  const {
    value: enteredPass,
    valueChangeHandler: passChangeHandler,
    valueBlurHandler: passBlurHandler,
    isValid: passIsValid,
    hasError: passHasError,
  } = useForm(VALIDATE_PASSWORD);

  const {
    value: enteredConfPass,
    valueChangeHandler: confPassChangeHandler,
    valueBlurHandler: confPassBlurHandler,
    isValid: confPassIsValid,
    hasError: confPassHasError,
  } = useForm(VALIDATE_PASSWORD);

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passIsValid &&
    confPassIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const createdUserData = (data) => {
      if (data.status === 'success') {
        dispatch(authActions.setIsLoggedIn(true));
        toast.success('You have successfully signed up');
        navigate('/');
      } else {
        toast.error(data.message);
      }
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + '/api/v1/users/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPass,
        passwordConfirm: enteredConfPass,
      }),
    };

    createUser(reqConfig, createdUserData);
  };

  return (
    <div className="auth-form__form--container">
      <p className="auth-form__form--intro">Start today</p>
      <h3 className="auth-form__form--title">Create your account</h3>

      <form onSubmit={formSubmitHandler} className="auth-form__form--control">
        <Input
          field="input"
          id="signup-first-name"
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
          id="signup-last-name"
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
          id="signup-email"
          placeholder="Email"
          type="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          hasError={emailHasError}
          errorMsg="Please enter a valid email"
        />
        <Input
          field="input"
          id="signup-password"
          placeholder="Password"
          type="password"
          value={enteredPass}
          onChange={passChangeHandler}
          onBlur={passBlurHandler}
          hasError={passHasError}
          errorMsg="Password should be atleast 8 char. long"
        />
        <Input
          field="input"
          id="signup-confirm-password"
          placeholder="Confirm Password"
          type="password"
          value={enteredConfPass}
          onChange={confPassChangeHandler}
          onBlur={confPassBlurHandler}
          hasError={confPassHasError}
          errorMsg="Confirm password should be atleast 8 char. long"
        />
        <Button type="submit" className="auth-form__form--btn">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
