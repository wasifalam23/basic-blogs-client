import React from 'react';
import Container from '../utils/Container/Container';
import AddPostForm from '../components/AddPost/AddPostForm/AddPostForm';

const AddPost = () => {
  return (
    <Container title="Add New Post" className="add-post-page__container">
      <AddPostForm />
    </Container>
  );
};

export default AddPost;
