import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

import './PostImageUpload.scss';

const PostImageUpload = (props) => {
  const image = (
    <div className="post-upload__img--holder">
      <header className="post-upload__img--header">
        <button
          type="button"
          className="post-upload__img--edit-btn"
          onClick={props.onPickImg}
        >
          <FontAwesomeIcon
            icon={faPen}
            className="post-upload__img--edit-icon"
          />
          <span className="post-upload__img--edit-text">Edit</span>
        </button>
        <button
          type="button"
          className="post-upload__img--cross-btn"
          onClick={props.reset}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="post-upload__img--cross-icon"
          />
        </button>
      </header>
      <img className="post-upload__img--image" src={props.url} alt="post" />
    </div>
  );

  const pickImage = (
    <div className="post-upload__pick--holder" onClick={props.onPickImg}>
      <div className="post-upload__pick--img-holder">
        <FontAwesomeIcon
          icon={faImage}
          className="post-upload__pick--img-icon"
        />
      </div>
      <p className="post-upload__pick--text">Pick an image</p>
    </div>
  );

  return (
    <div className="post-upload__container">
      <input
        style={{ display: 'none' }}
        id={props.id}
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={props.inputRef}
        onChange={props.onInputChange}
        key={props.inputKey}
      />

      <main className="post-upload__preview">
        {props.url && image}
        {!props.url && pickImage}
      </main>
    </div>
  );
};

export default PostImageUpload;
