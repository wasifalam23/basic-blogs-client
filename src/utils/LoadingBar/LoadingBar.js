import React from 'react';
import ReactDOM from 'react-dom';
import './LoadingBar.scss';

const LoadingBar = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className=" loading-bar__container">
          <div className="loading-bar__spinner"></div>
          <p className="loading-bar__text">Loading...</p>
        </div>,
        document.getElementById('loading-root')
      )}
    </React.Fragment>
  );
};

export default LoadingBar;
