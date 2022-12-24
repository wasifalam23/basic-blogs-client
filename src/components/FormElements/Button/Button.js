import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.scss';

const Button = (props) => {
  return (
    <button
      className={`button ${props.className} ${
        props.disabled && 'button__disabled'
      }`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.icon && (
        <FontAwesomeIcon className="button__icon" icon={props.icon} />
      )}
      {props.children}
    </button>
  );
};

export default Button;
