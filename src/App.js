import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useHttp from './hooks/http-hook';
import { postActions } from './store/post-slice';
import { userActions } from './store/user-slice';
import { authActions } from './store/auth-slice';

import Header from './components/Header/Header';
import Posts from './pages/Posts';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';
import EditMyProfile from './pages/EditMyProfile';
import Auth from './pages/Auth';
import MyPosts from './pages/MyPosts';
import Toastify from './utils/Toastify/Toastify';
import FallBack from './pages/FallBack';

const App = () => {
  const { sendRequest: checkIsLoggedIn } = useHttp();
  const { sendRequest: fetchPosts, isLoading: fetchingPosts } = useHttp();
  const { sendRequest: getCurrentUser } = useHttp();

  const postChanged = useSelector((state) => state.post.postChanged);
  const userChanged = useSelector((state) => state.user.userChanged);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInState = (data) => {
      dispatch(authActions.setIsLoggedIn(data));
    };

    checkIsLoggedIn(
      { url: process.env.REACT_APP_BACKEND_URL + '/api/v1/users/isLoggedIn' },
      loggedInState
    );
  }, [dispatch, checkIsLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loggedInUserData = (data) => {
      if (data.status === 'success') {
        dispatch(userActions.storeUserData(data.data.user));
      } else {
        console.log(data);
      }
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + '/api/v1/users/me',
    };

    getCurrentUser(reqConfig, loggedInUserData);
  }, [getCurrentUser, dispatch, userChanged, isLoggedIn]);

  useEffect(() => {
    const receivedPostData = (data) => {
      dispatch(postActions.storePostData(data.data.blogs));
    };

    const reqConfig = {
      url: process.env.REACT_APP_BACKEND_URL + '/api/v1/blogs',
    };

    fetchPosts(reqConfig, receivedPostData);
  }, [fetchPosts, dispatch, postChanged, isLoggedIn]);

  return (
    <BrowserRouter>
      <Toastify />
      <Header />
      <Routes>
        <Route path="/" element={<Posts isLoading={fetchingPosts} />} />
        <Route path="/details/:postId" element={<PostDetails />} />
        <Route
          path="/posts/new"
          element={isLoggedIn ? <AddPost /> : <FallBack />}
        />
        <Route
          path="/posts/:postId"
          element={isLoggedIn ? <EditPost /> : <FallBack />}
        />
        <Route
          path="/:userId/posts"
          element={isLoggedIn ? <MyPosts /> : <FallBack />}
        />

        <Route
          path="/auth"
          element={!isLoggedIn ? <Auth /> : <Navigate to="/" replace />}
        />

        <Route
          path="/user-update"
          element={isLoggedIn ? <EditMyProfile /> : <FallBack />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
