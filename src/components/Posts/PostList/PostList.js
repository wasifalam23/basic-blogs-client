import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from '../../../store/post-slice';
import useHttp from '../../../hooks/http-hook';
import { toast } from 'react-toastify';

import PostItem from '../PostItem/PostItem';
import './PostList.scss';

const PostList = (props) => {
  const postsData = useSelector((state) => state.post.postData);

  const { sendRequest: deletePost } = useHttp();

  const dispatch = useDispatch();

  const postDeleteId = useSelector((state) => state.post.deletePostId);

  useEffect(() => {
    if (!postDeleteId) return;

    const deletedPostData = (data) => {
      if (data.status === 'success') {
        toast.success('Post is deleted successfully');
        dispatch(postActions.setPostChanged());
        dispatch(postActions.setDeletePostId(null));
      } else {
        toast.error(toast.message);
      }
    };

    deletePost(
      {
        url:
          process.env.REACT_APP_BACKEND_URL + `/api/v1/blogs/${postDeleteId}`,
        method: 'DELETE',
      },
      deletedPostData
    );
  }, [dispatch, postDeleteId, deletePost]);

  return (
    <ul className="post-list__container">
      {props.myPosts &&
        postsData
          .filter((post) => post.author._id === props.loggedInUserId)
          .map((post) => {
            return (
              <PostItem
                key={post._id}
                id={post.id}
                img={post.image}
                pubDate={post.createdAt}
                title={post.title}
                descr={post.description}
                authorId={post.author._id}
                authorAv={post.author.photo}
                authorFirstName={post.author.firstName}
                authorLastName={post.author.lastName}
                comments={post.comments}
              />
            );
          })}

      {!props.myPosts &&
        postsData.map((post) => {
          return (
            <PostItem
              key={post._id}
              id={post.id}
              img={post.image}
              pubDate={post.createdAt}
              title={post.title}
              descr={post.description}
              authorId={post.author._id}
              authorAv={post.author.photo}
              authorFirstName={post.author.firstName}
              authorLastName={post.author.lastName}
              comments={post.comments}
            />
          );
        })}
    </ul>
  );
};

export default PostList;
