import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { useNavigate } from 'react-router-dom';

import DropdownMenu from '../DropdownMenu/DropdownMenu';

import './PostItem.scss';
import { postActions } from '../../../store/post-slice';

const PostItem = (props) => {
  const currUserId = useSelector((state) => state.user.userData._id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const postPubDate = moment(props.pubDate).format('Do MMM YYYY');

  const dltPostHandler = () => {
    dispatch(postActions.setDeletePostId(props.id));
  };

  const editPostHandler = () => {
    navigate(`/posts/${props.id}`);
  };

  const readMoreHandler = () => {
    navigate(`/details/${props.id}`);
  };

  const dropDownBtns =
    props.authorId === currUserId && isLoggedIn ? (
      <DropdownMenu
        className="post-item__dropdown"
        onDelete={dltPostHandler}
        onEdit={editPostHandler}
        dltModalMsg="Do you really want to delete this post?"
      />
    ) : null;

  return (
    <li className="post-item__container">
      <header className="post-item__header">
        <img
          className="post-item__image"
          src={process.env.REACT_APP_BACKEND_URL + `/blogs/${props.img}`}
          alt="post"
        />
      </header>
      <main className="post-item__content--main">
        <p className="post-item__pub-date">Published on {postPubDate}</p>
        {dropDownBtns}
        <h3 className="post-item__title" title={props.title}>
          {props.title}
        </h3>
        <p className="post-item__descrp">{props.descr}</p>
        <button
          type="button"
          className="post-item__read-more--btn"
          onClick={readMoreHandler}
        >
          Read Post
        </button>

        <footer className="post-item__footer">
          <div className="post-item__author--box">
            <img
              className="post-item__author--avatar"
              src={
                process.env.REACT_APP_BACKEND_URL + `/users/${props.authorAv}`
              }
              alt="author-avatar"
            />
            <p className="post-item__author--name">
              {props.authorFirstName} {props.authorLastName}
            </p>
          </div>

          <div className="post-item__comment--box">
            <span className="post-item__comment--count">
              {props.comments.length}
            </span>
            <p className="post-item__comment--text">Comments</p>
          </div>
        </footer>
      </main>
    </li>
  );
};

export default PostItem;
