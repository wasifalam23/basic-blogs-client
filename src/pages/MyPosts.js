import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Container from '../utils/Container/Container';
import PostList from '../components/Posts/PostList/PostList';
import Button from '../components/FormElements/Button/Button';

const MyPosts = () => {
  const posts = useSelector((state) => state.post.postData);
  const { userId: loggedInUserId } = useParams();
  const myPosts = posts.filter((post) => post.author._id === loggedInUserId);

  const navigate = useNavigate();
  const addPostBtnClickHandler = () => {
    navigate('/posts/new');
  };

  const addPostBtn = (
    <Button icon={faPlus} onClick={addPostBtnClickHandler}>
      Add New Post
    </Button>
  );

  return (
    <Container title="My Posts" button={addPostBtn}>
      {myPosts.length === 0 ? (
        <p className="my-posts-page__alt--text">
          You currenly don't have any post created.
        </p>
      ) : (
        <PostList myPosts loggedInUserId={loggedInUserId} />
      )}
    </Container>
  );
};

export default MyPosts;
