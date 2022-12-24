import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '../../../utils/ConfirmModal/ConfirmModal';
import Backdrop from '../../../utils/Backdrop/Backdrop';
import './DropdownMenu.scss';

const DropdownMenu = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dltConfirmModalIsOpen, setDltConfirmModalIsOpen] = useState(false);

  const menuOpenHandler = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menuCloseHandler = () => {
    setIsMenuOpen(false);
  };

  const editBtnClickHander = () => {
    props.onEdit();
    setIsMenuOpen(false);
  };

  const dltBtnClickHander = () => {
    setDltConfirmModalIsOpen(true);
    setIsMenuOpen(false);
  };

  const dltModalConfirmHandler = () => {
    props.onDelete();
    setDltConfirmModalIsOpen(false);
  };

  const dltModalCancleHandler = () => {
    setDltConfirmModalIsOpen(false);
  };

  return (
    <div className={`dropdown__container ${props.className}`}>
      {dltConfirmModalIsOpen && (
        <ConfirmModal
          title="Are you sure ?"
          message={props.dltModalMsg}
          onConfirm={dltModalConfirmHandler}
          onCancel={dltModalCancleHandler}
        />
      )}
      <div className="dropdown__content">
        <button
          type="button"
          className="dropdown__action--btn"
          onClick={menuOpenHandler}
        >
          <FontAwesomeIcon
            className="dropdown__action--icon"
            icon={faEllipsisH}
          />
        </button>

        {isMenuOpen && (
          <React.Fragment>
            <Backdrop
              className="dropdown__backdrop"
              onCancel={menuCloseHandler}
            />
            <div className="dropdown__btn--holder">
              {props.onEdit && (
                <button
                  className="dropdown__edit--btn"
                  onClick={editBtnClickHander}
                >
                  Edit
                </button>
              )}
              <button
                className="dropdown__delete--btn"
                onClick={dltBtnClickHander}
              >
                Delete
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
