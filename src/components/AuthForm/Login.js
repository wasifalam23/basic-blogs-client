import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { VALIDATE_EMAIL, VALIDATE_PASSWORD } from '../FormElements/validator';

import useForm from '../../hooks/form-hook';
import useHttp from '../../hooks/http-hook';

import Button from '../FormElements/Button/Button';
import Input from '../FormElements/Input/Input';
import { toast } from 'react-toastify';

const Login = () => {
  const { sendRequest: loginUser } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: emailReset,
  } = useForm(VALIDATE_EMAIL);

  const {
    value: enteredPass,
    valueChangeHandler: passChangeHandler,
    valueBlurHandler: passBlurHandler,
    isValid: passIsValid,
    hasError: passHasError,
    reset: passReset,
  } = useForm(VALIDATE_PASSWORD);

  let formIsValid = emailIsValid && passIsValid;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const loggedInUserData = (data) => {
      if (data.status === 'success') {
        dispatch(authActions.setIsLoggedIn(true));
        navigate('/');
        toast.success('You have successfully logged in!');
      } else if (data.status === 'fail') {
        toast.error(data.message);
      }
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + '/api/v1/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPass,
      }),
    };

    loginUser(reqConfig, loggedInUserData);
  };

  return (
    <div className="auth-form__form--container">
      <p className="auth-form__form--intro">Create Post</p>
      <h3 className="auth-form__form--title">Login to your account</h3>

      <form onSubmit={formSubmitHandler} className="auth-form__form--control">
        <Input
          field="input"
          id="login-email"
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
          id="login-password"
          placeholder="Password"
          type="password"
          value={enteredPass}
          onChange={passChangeHandler}
          onBlur={passBlurHandler}
          hasError={passHasError}
          errorMsg="Password should be atleast 8 char. long"
        />
        <Button type="submit" className="auth-form__form--btn">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
