import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { commentActions } from '../../../../store/comment-slice';
import { postActions } from '../../../../store/post-slice';
import './CommentList.scss';
import CommentItem from '../CommentItem/CommentItem';
import useHttp from '../../../../hooks/http-hook';

const CommentList = (props) => {
  const { sendRequest: deleteComment } = useHttp();

  const commentDeleteId = useSelector((state) => state.comment.commentDeleteId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!commentDeleteId) return;

    const deletedCommentData = (data) => {
      if (data.status === 'success') {
        toast.success('comment is deleted successfully');
        dispatch(postActions.setPostChanged());
        dispatch(commentActions.setCommentChanged());
        dispatch(commentActions.setCommentDeleteId(null));
      } else {
        toast.error(data.message);
      }
    };

    deleteComment(
      {
        url:
          process.env.REACT_APP_BACKEND_URL +
          `/api/v1/comments/${commentDeleteId}`,
        method: 'DELETE',
      },
      deletedCommentData
    );
  }, [commentDeleteId, deleteComment, dispatch]);

  return (
    <ul className="comment-list__container">
      {props.comments.map((comment) => {
        return (
          <CommentItem
            key={comment._id}
            id={comment._id}
            commentCreatorId={comment.user._id}
            commentBlogAuthorId={comment.blog.author._id}
            userImg={comment.user.photo}
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
            comment={comment.comment}
            createdAt={comment.createdAt}
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
