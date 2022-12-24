import React from 'react';
import { useNavigate } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Container from '../utils/Container/Container';
import PostList from '../components/Posts/PostList/PostList';
import Button from '../components/FormElements/Button/Button';
import LoadingBar from '../utils/LoadingBar/LoadingBar';

const Posts = (props) => {
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
    <React.Fragment>
      {props.isLoading && <LoadingBar />}
      <Container title="All Posts" button={addPostBtn}>
        <PostList />
      </Container>
    </React.Fragment>
  );
};

export default Posts;
