import React from 'react';
import './Backdrop.scss';

const Backdrop = (props) => {
  return (
    <div className={`backdrop ${props.className}`} onClick={props.onCancel} />
  );
};

export default Backdrop;
