import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { commentActions } from '../../../store/comment-slice';
import { postActions } from '../../../store/post-slice';
import { toast } from 'react-toastify';

import { VALIDATE_TEXT_REQUIRED } from '../../FormElements/validator';

import useHttp from '../../../hooks/http-hook';
import useForm from '../../../hooks/form-hook';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CommentList from '../Comment/CommentList/CommentList';

import Input from '../../FormElements/Input/Input';
import Button from '../../FormElements/Button/Button';
import './PostInfo.scss';

const PostInfo = () => {
  const [post, setPost] = useState(null);

  const commentChanged = useSelector((state) => state.comment.commentChanged);
  const commentEditId = useSelector((state) => state.comment.commentEditId);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const { sendRequest: getPostById } = useHttp();
  const { sendRequest: createComment, isLoading: savingComment } = useHttp();
  const { sendRequest: getCommentById } = useHttp();
  const { sendRequest: updateComment, isLoading: updatingComment } = useHttp();

  const {
    value: enteredComment,
    setEnteredValue: setComment,
    valueChangeHandler: commentChangeHandler,
    valueBlurHandler: commentBlurHandler,
    isValid: commentIsValid,
    hasError: commentHasError,
    reset: resetComment,
  } = useForm(VALIDATE_TEXT_REQUIRED);

  const { postId } = useParams();

  useEffect(() => {
    if (!postId) return;

    const receivedData = (data) => {
      if (data.status === 'success') {
        setPost(data.data.blog);
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + `/api/v1/blogs/${postId}`,
    };
    getPostById(reqConfig, receivedData);
  }, [getPostById, postId, commentChanged]);

  useEffect(() => {
    if (!commentEditId) return;

    const commentData = (data) => {
      if (data.status === 'success') {
        setComment(data.data.comment.comment);
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url:
        process.env.REACT_APP_BACKEND_URL + `/api/v1/comments/${commentEditId}`,
      method: 'GET',
    };

    getCommentById(reqConfig, commentData);
  }, [commentEditId, getCommentById, setComment, dispatch]);

  const pubDate = moment(post?.createdAt).format('Do MMM YYYY');

  const commentSubmitHandler = (e) => {
    e.preventDefault();

    if (!commentIsValid) return;

    if (commentEditId) {
      const updatedCommentData = (data) => {
        if (data.status === 'success') {
          dispatch(commentActions.setCommentChanged());
          dispatch(commentActions.setCommentEditId(null));
          resetComment();
        } else {
          toast.error(data.message);
        }
      };

      const reqConfig = {
        url:
          process.env.REACT_APP_BACKEND_URL +
          `/api/v1/comments/${commentEditId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: enteredComment,
        }),
      };

      updateComment(reqConfig, updatedCommentData);

      return;
    }

    const createdCommentData = (data) => {
      if (data.status === 'success') {
        dispatch(postActions.setPostChanged());
        dispatch(commentActions.setCommentChanged());
        resetComment();
      } else {
        toast.error(data.message);
      }
    };

    const reqConfig = {
      url:
        process.env.REACT_APP_BACKEND_URL + `/api/v1/blogs/${postId}/comments`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: enteredComment,
      }),
    };

    createComment(reqConfig, createdCommentData);
  };

  return (
    <React.Fragment>
      {post && (
        <main className="post-info__container">
          <header className="post-info__header">
            <div className="post-info__author--box">
              <img
                className="post-info__author--avatar"
                src={
                  process.env.REACT_APP_BACKEND_URL +
                  `/users/${post.author.photo}`
                }
                alt="author-avatar"
              />
              <p className="post-info__author--name">
                {post.author.firstName} {post.author.lastName}
              </p>
            </div>
            <p className="post-info__pub-date">{pubDate}</p>
          </header>

          <main className="post-info__content--main">
            <div className="post-info__post-img--holder">
              <img
                className="post-info__post-img"
                src={process.env.REACT_APP_BACKEND_URL + `/blogs/${post.image}`}
                alt="post"
              />
            </div>
            <h2 className="post-info__title">{post.title}</h2>
            <p className="post-info__descrp">{post.description}</p>
          </main>

          <section className="post-info__comment--section">
            <div className="post-info__comment-logo-title--box">
              <FontAwesomeIcon
                className="post-info__comment--icon"
                icon={faCommentAlt}
              />
              <h3 className="post-info__comment--title">
                Comments ({post.comments.length})
              </h3>
            </div>
            <CommentList comments={post.comments} />
            {isLoggedIn && (
              <div>
                <form
                  onSubmit={commentSubmitHandler}
                  className="post-info__comment--form-control"
                >
                  <Input
                    field="textarea"
                    id="comment"
                    placeholder="Write your comment here"
                    type="text"
                    value={enteredComment}
                    onChange={commentChangeHandler}
                    onBlur={commentBlurHandler}
                    hasError={commentHasError}
                    errorMsg="Comment must not be empty"
                  />
                  {savingComment || updatingComment ? (
                    <Button
                      type="submit"
                      className="post-info__comment--submit-btn"
                      disabled
                    >
                      Saving...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="post-info__comment--submit-btn "
                    >
                      Save
                    </Button>
                  )}
                </form>
              </div>
            )}
          </section>
        </main>
      )}
    </React.Fragment>
  );
};

export default PostInfo;
