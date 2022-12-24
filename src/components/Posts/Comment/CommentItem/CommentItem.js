import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { commentActions } from '../../../../store/comment-slice.js';

import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import './CommentItem.scss';

const CommentItem = (props) => {
  const currLoggedInUserId = useSelector((state) => state.user.userData._id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const creationDate = moment(props.createdAt).format('MMM  Do YYYY, hh:mm a');

  const commentEditHandler = () => {
    dispatch(commentActions.setCommentEditId(props.id));
  };

  const commentDltHandler = () => {
    dispatch(commentActions.setCommentDeleteId(props.id));
  };

  let dropDown;
  if (props.commentCreatorId === currLoggedInUserId) {
    dropDown = (
      <DropdownMenu
        className="comment-item__dropdown"
        onDelete={commentDltHandler}
        onEdit={commentEditHandler}
        dltModalMsg="Do you really want to delete this comment?"
      />
    );
  } else if (props.commentBlogAuthorId === currLoggedInUserId) {
    dropDown = (
      <DropdownMenu
        className="comment-item__dropdown"
        onDelete={commentDltHandler}
        dltModalMsg="Do you really want to delete this comment?"
      />
    );
  }

  return (
    <li className="comment-item__container">
      <main className="comment-item__main--content">
        <div className="comment-item__user-img--holder">
          <img
            className="comment-item__user-img"
            src={process.env.REACT_APP_BACKEND_URL + `/users/${props.userImg}`}
            alt="user-avatar"
          />
        </div>

        <div className="comment-item__content">
          <div className="comment-item__user-comment--holder">
            <div className="comment-item__user-date--holder">
              <p className="comment-item__user-name">
                {props.firstName} {props.lastName}
              </p>
              <p className="comment-item__comment-date">
                {/* July 25, 2022 at 09:40 am */}
                {creationDate}
              </p>
            </div>
            <p className="comment-item__comment">{props.comment}</p>
          </div>
        </div>
        {isLoggedIn && dropDown}
      </main>
    </li>
  );
};

export default CommentItem;
