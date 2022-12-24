import React from 'react';
import { useLocation } from 'react-router-dom';

import Container from '../utils/Container/Container';
import PostInfo from '../components/Posts/PostInfo/PostInfo';

const PostDetails = () => {
  const prevRoute = useLocation();

  return (
    <Container
      title="Post Details"
      navBack="back"
      className="post-details-page__container"
    >
      <PostInfo />
    </Container>
  );
};

export default PostDetails;
