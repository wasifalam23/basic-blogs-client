import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postActions } from '../../../store/post-slice';

import { toast } from 'react-toastify';
import useHttp from '../../../hooks/http-hook';

import { VALIDATE_TEXT_REQUIRED } from '../../FormElements/validator';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import useForm from '../../../hooks/form-hook';
import useUpload from '../../../hooks/upload-hook';
import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import PostImageUpload from '../PostImageUpload/PostImageUpload';

import './AddPostForm.scss';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const { sendRequest: postData, isLoading: postingData } = useHttp();
  const { sendRequest: updateData, isLoading: updatingData } = useHttp();
  const { sendRequest: getDataById } = useHttp();

  const {
    imgFile,
    imgFilePickedRef,
    previewUrl,
    setPreviewUrl,
    pickImgHandler,
    imgPickedHandler,
    inputKey,
    resetImgFile,
  } = useUpload();

  const {
    value: enteredTitle,
    setEnteredValue: setTitle,
    valueChangeHandler: titleChangeHandler,
    valueBlurHandler: titleBlurHandler,
    isValid: titleIsValid,
    hasError: titleHasError,
    reset: resetTitle,
  } = useForm(VALIDATE_TEXT_REQUIRED);

  const {
    value: enteredDescr,
    setEnteredValue: setDescr,
    valueChangeHandler: descrChangeHandler,
    valueBlurHandler: descrBlurHandler,
    isValid: descrIsValid,
    hasError: descrHasError,
    reset: resetDescr,
  } = useForm(VALIDATE_TEXT_REQUIRED);

  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const postData = (data) => {
      const { title, description, image } = data.data.blog;

      setPreviewUrl(process.env.REACT_APP_BACKEND_URL + `/blogs/${image}`);

      setTitle(title);
      setDescr(description);
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + `/api/v1/blogs/${postId}`,
    };

    getDataById(reqConfig, postData);
  }, [postId, getDataById, setDescr, setPreviewUrl, setTitle]);

  let formIsValid = false;
  if (titleIsValid && descrIsValid) {
    formIsValid = true;
  }

  const resetForm = () => {
    resetImgFile();
    resetTitle();
    resetDescr();
  };

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;

    const formData = new FormData();

    if (imgFile) formData.append('image', imgFile);
    formData.append('title', enteredTitle);
    formData.append('description', enteredDescr);

    if (postId) {
      const updatedPostData = (data) => {
        if (data.status === 'success') {
          dispatch(postActions.setPostChanged());
          toast.success('Post is updated successfully');
          resetForm();
        } else {
          toast.error(data.message);
        }
      };

      const reqConfig = {
        url: process.env.REACT_APP_BACKEND_URL + `/api/v1/blogs/${postId}`,
        method: 'PATCH',
        body: formData,
      };

      updateData(reqConfig, updatedPostData);

      return;
    }

    const createdPostData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        toast.success('Post is added successfully');
        resetForm();
      } else {
        toast.error(data.message);
      }
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + '/api/v1/blogs',
      method: 'POST',
      body: formData,
    };

    postData(reqConfig, createdPostData);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="add-post__container">
        <div className="add-post__img--input">
          <PostImageUpload
            url={previewUrl}
            inputRef={imgFilePickedRef}
            onInputChange={imgPickedHandler}
            onPickImg={pickImgHandler}
            inputKey={inputKey}
            reset={resetImgFile}
          />
        </div>

        <div className="add-post__text--inputs">
          <Input
            field="input"
            id="title"
            placeholder="Give a title"
            type="text"
            className="add-post__input--title"
            value={enteredTitle}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
            hasError={titleHasError}
            errorMsg="Title must not be empty!"
          />
          <Input
            field="textarea"
            id="description"
            placeholder="Give a description..."
            type="text"
            className="add-post__input--description"
            value={enteredDescr}
            onChange={descrChangeHandler}
            onBlur={descrBlurHandler}
            hasError={descrHasError}
            errorMsg="Description must not be empty"
          />
        </div>
        {postingData || updatingData ? (
          <Button
            type="submit"
            className="add-post__publish--btn"
            icon={faPaperPlane}
            disabled
          >
            Publishing...
          </Button>
        ) : (
          <Button
            type="submit"
            className="add-post__publish--btn"
            icon={faPaperPlane}
          >
            Publish
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddPostForm;
