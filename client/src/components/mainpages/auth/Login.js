import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../redux/actions';
import { Redirect } from 'react-router-dom';
import './login.css';
import image1 from './image/image3.svg';
import image2 from './image/image4.svg';
import { motion } from 'framer-motion';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

export const Login = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let imageUpload = [];
  let [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    avatar: '',
  });
  let dispatch = useDispatch();
  let [isSignUp, setIsSignUp] = useState(false);
  let [image, setImage] = useState([]);
  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'kohaku121',
      uploadPreset: 'ml_default',
    },
    (error, result) => {
      if (result.event === 'success') {
        imageUpload.push({
          public_id: result.info.public_id,
          url: result.info.secure_url,
        });
        setImage(imageUpload);
        setUser({ ...user, avatar: imageUpload[0].url });
      }
    }
  );

  let handleOpenWidget = (e) => {
    e.preventDefault();
    widget.open();
  };

  let clear = () => {
    setUser({
      email: '',
      password: '',
      name: '',
      avatar: '',
    });
  };

  let handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(user));
  };

  let handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authActions.register(user));
  };

  const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const loginWithFacebook = (response) => {
    console.log('hello');
    dispatch(authActions.loginFacebookRequest(response));
  };

  const loginWithGoogle = (response) => {};

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className={'login-page '}
    >
      <div className={isSignUp ? 'container sign-up-mode  ' : 'container'}>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handleSignIn}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  autoComplete="new-password"
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <input
                type="submit"
                defaultValue="Login"
                className="btn solid"
                onClick={handleSignIn}
              />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <button className="social-icon">
                  <i className="fab fa-facebook-f" />
                </button>

                <button className="social-icon">
                  <i className="fab fa-google" />
                </button>
                {/* <FacebookLogin
                  appId={FB_APP_ID}
                  fields="name,email,picture"
                  callback={loginWithFacebook}
                  icon="fa-facebook"
                  onFailure={(err) => {
                    console.log('FB LOGIN ERROR:', err);
                  }}
                  containerStyle={{
                    textAlign: 'center',
                    backgroundColor: '#3b5998',
                    borderColor: '#3b5998',
                    flex: 1,
                    display: 'flex',
                    color: '#fff',
                    cursor: 'pointer',
                    marginBottom: '3px',
                  }}
                  buttonStyle={{
                    flex: 1,
                    textTransform: 'none',
                    padding: '12px',
                    background: 'none',
                    border: 'none',
                  }}
                />

                <GoogleLogin
                  className="google-btn d-flex justify-content-center"
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login with Google"
                  onSuccess={loginWithGoogle}
                  onFailure={(err) => {
                    console.log('GOOGLE LOGIN ERROR:', err);
                  }}
                  cookiePolicy="single_host_origin"
                /> */}
              </div>
            </form>
            <form
              autoComplete="new-password"
              className="sign-up-form"
              onSubmit={handleSignUp}
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Username"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  autoComplete="new-password"
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <div className="avatar-field">
                {user.avatar ? (
                  <img src={user.avatar} alt="" width="50px" height="50px" />
                ) : (
                  <button onClick={handleOpenWidget}>
                    <i className="fas fa-plus"></i>
                    <div>Avatar</div>
                  </button>
                )}
              </div>
              <input
                type="submit"
                defaultValue="Sign up"
                className="btn solid"
                onClick={handleSignUp}
              />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ? </h3>
              <p>You don't have a account. Let register now.</p>

              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => {
                  clear();
                  setIsSignUp(true);
                }}
              >
                Sign up
              </button>
            </div>
            <img src={image1} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ? </h3>
              <p>You had the account, let sign in and join with us.</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => {
                  clear();
                  setIsSignUp(false);
                }}
              >
                Sign in
              </button>
            </div>
            <motion.img src={image2} className="image" alt="" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
