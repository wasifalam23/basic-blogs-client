import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './Container.scss';

const Container = (props) => {
  const navigate = useNavigate();

  return (
    <div className={`container ${props.className}`}>
      <header className="container__header">
        <div className="container__title-nav--holder">
          <h3 className="container__title">{props.title}</h3>
          {props.navBack && (
            <button
              className="container__nav-back--btn"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="container__nav-back--icon"
              />
              {props.navBack}
            </button>
          )}
        </div>
        {props.button && props.button}
      </header>
      {props.children}
    </div>
  );
};

export default Container;
