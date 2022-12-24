import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavUser from '../NavUser/NavUser';

import './MainNavigation.scss';

const MainNavigation = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loggedInUser = useSelector((state) => state.user.userData);

  const linkClass = ({ isActive }) => {
    return isActive
      ? 'main-navigation__link main-navigation__link--active'
      : 'main-navigation__link';
  };

  return (
    <ul className="main-navigation__list">
      <li className="main-navigation__list--item">
        <NavLink className={linkClass} to="/">
          Posts
        </NavLink>
      </li>

      {!isLoggedIn && (
        <li className="main-navigation__list--item">
          <NavLink className={linkClass} to="/auth">
            Login
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item">
          <NavLink className={linkClass} to="/posts/new">
            Add Post
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item">
          <NavLink className={linkClass} to={`/${loggedInUser._id}/posts`}>
            My Posts
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li className="main-navigation__list--item main-navigation__nav--user">
          <NavUser />
        </li>
      )}
    </ul>
  );
};

export default MainNavigation;
