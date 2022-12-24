import React, { useState } from 'react';
import contentCreator from '../../assets/content-creator.svg';
import Signup from './Signup';
import Login from './Login';

import './AuthForm.scss';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const authModeSwitchHandler = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-form__container">
      <div className="auth-form__intro--holder">
        <h3 className="auth-form__intro--title">Basic Blogs</h3>
        <p className="auth-form__intro--descr">
          A site where user can create <br />
          simple blog posts.
        </p>
        <img src={contentCreator} alt="" className="auth-form__intro--illus" />
      </div>
      <div className="auth-form__form--holder">
        {isLogin ? <Login /> : <Signup />}

        <div className="auth-form__mode--content">
          <span className="auth-form__mode--text">
            {isLogin ? 'Not have an account?' : 'Already have an account?'}
          </span>
          <button
            className="auth-form__mode--btn"
            onClick={authModeSwitchHandler}
          >
            {isLogin ? 'Create account' : 'Login here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
