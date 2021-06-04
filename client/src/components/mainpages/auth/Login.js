import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../redux/actions';
import './login.css';
import image1 from './image/image3.svg';
import image2 from './image/image4.svg';
import { motion } from 'framer-motion';

export const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [isSignUp, setIsSignUp] = useState(false);
  const clear = () => {
    setUser({
      email: '',
      password: '',
      name: '',
      avatarUrl: '',
    });
  };
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    avatarUrl: '',
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(user));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authActions.register(user));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
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
                  <i className="fab fa-twitter" />
                </button>
                <button className="social-icon">
                  <i className="fab fa-google" />
                </button>
                <button className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </button>
              </div>
            </form>
            <form
              autoComplete="new-password"
              className="sign-up-form"
              onSubmit={handleSignUp}
            >
              <h2 className="title">Sign in</h2>
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
            <img src={image2} className="image" alt="" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
