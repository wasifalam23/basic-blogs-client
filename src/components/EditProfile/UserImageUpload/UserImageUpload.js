import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import defaultUserImg from '../../../assets/default.jpg';
import { faTimes, faCamera } from '@fortawesome/free-solid-svg-icons';

import './UserImageUpload.scss';

const UserImageUpload = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };

  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const resetBtnHandler = () => {
    props.reset();
    setIsHovered(false);
  };

  const resetBtn = (
    <div className="user-upload__reset-img--box">
      <button
        type="button"
        className="user-upload__reset--btn"
        onClick={resetBtnHandler}
      >
        <FontAwesomeIcon className="user-upload__cross-icon" icon={faTimes} />
      </button>
    </div>
  );

  const image = (
    <div
      className="user-upload__image--holder"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <img className="user-upload__image" src={props.url} alt="user" />
      {isHovered && resetBtn}
    </div>
  );

  const defaultImg = (
    <img
      className="user-upload__image-add--icon"
      src={defaultUserImg}
      alt="add-img-icon"
    />
  );

  return (
    <div className={`user-upload__container ${props.className}`}>
      <input
        style={{ display: 'none' }}
        id={props.id}
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={props.inputRef}
        onChange={props.onInputChange}
        key={props.inputKey}
      />

      <main className="user-upload__preview">
        {props.url && image}
        {!props.url && defaultImg}

        <button
          type="button"
          className="user-upload__pick-img--btn"
          onClick={props.onPickImg}
        >
          <FontAwesomeIcon
            icon={faCamera}
            className="user-upload__pick--icon"
          />
        </button>
      </main>
    </div>
  );
};

export default UserImageUpload;
