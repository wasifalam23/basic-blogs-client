import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainNavigation from './MainNavigation/MainNavigation';
import Backdrop from '../../utils/Backdrop/Backdrop';
import './Header.scss';
import SideDrawer from './SideDrawer/SideDrawer';

const Header = () => {
  const [boxShadow, setBoxShadow] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const giveBoxShadow = () => {
    if (window.scrollY >= 100) {
      setBoxShadow(true);
    } else {
      setBoxShadow(false);
    }
  };

  window.addEventListener('scroll', giveBoxShadow);

  const burgerClickHandler = () => {
    setDrawerIsOpen((prev) => !prev);
  };

  const backdropCloseHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <header className={`header ${boxShadow && 'header__box-shadow'}`}>
      <nav className="header__nav">
        {drawerIsOpen && (
          <Backdrop
            className="header__backdrop"
            onCancel={backdropCloseHandler}
          />
        )}

        <Link to="/" className="header__logo">
          Basic Blogs
        </Link>

        <MainNavigation />
        <SideDrawer
          drawerIsOpen={drawerIsOpen}
          onCancel={backdropCloseHandler}
        />

        <div className="header__burger" onClick={burgerClickHandler}>
          <div
            className={`${
              drawerIsOpen && 'header__burger--line1'
            } header__burger--item`}
          />
          <div
            className={`${
              drawerIsOpen && 'header__burger--line2'
            } header__burger--item`}
          />
          <div
            className={`${
              drawerIsOpen && 'header__burger--line3'
            } header__burger--item`}
          />
          <div />
        </div>
      </nav>
    </header>
  );
};

export default Header;
