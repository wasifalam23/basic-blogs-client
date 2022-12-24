import React from 'react';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import Button from '../../components/FormElements/Button/Button';
import Backdrop from '../Backdrop/Backdrop';
import './ConfirmModal.scss';

const ModalOverlay = (props) => {
  return (
    <div className="confirm-modal__container">
      <header className="confirm-modal__header">
        <FontAwesomeIcon
          className="confirm-modal__warning-icon"
          icon={faExclamationCircle}
        />
        <h3 className="confirm-modal__title">{props.title}</h3>
      </header>
      <div className="confirm-modal__content">
        <p className="confirm-modal__message">{props.message}</p>
      </div>
      <footer className="confirm-modal__footer">
        <Button
          onClick={props.onCancel}
          className="confirm-modal__btn--cancel"
          type="button"
        >
          Cancel
        </Button>

        <Button
          onClick={props.onConfirm}
          type="button"
          className="confirm-modal__btn--confirm"
        >
          Confirm
        </Button>
      </footer>
    </div>
  );
};

const ConfirmModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          onCancel={props.onCancel}
          className="confirm-modal__backdrop"
        />,
        document.getElementById('backdrop-root')
      )}

      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
          title={props.title}
          message={props.message}
        />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default ConfirmModal;
