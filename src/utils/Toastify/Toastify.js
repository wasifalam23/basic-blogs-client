import React from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, Slide } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Toastify.scss';

const Toastify = (props) => {
  return (
    <React.Fragment>
      {createPortal(
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Slide}
          limit="2"
        />,
        document.getElementById('toastify-root')
      )}
    </React.Fragment>
  );
};

export default Toastify;
