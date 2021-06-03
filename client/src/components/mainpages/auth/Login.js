import React, { useState } from 'react';
import './login.css';
import $ from 'jquery';
import image1 from './image/undraw_maker_launch_crhe.svg';
import image2 from './image/undraw_press_play_bx2d.svg';

export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    err: '',
    success: '',
  });

  const [isSignUp, setIsSignUp] = useState(false);

  console.log(isSignUp);

  return (
    <div className={isSignUp ? 'container sign-up-mode  ' : 'container'}>
      <div className="forms-container">
        <div className="signin-signup">
          <form autocomplete="new-password" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                autocomplete="new-password"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                autocomplete="new-password"
                type="password"
                placeholder="Password"
              />
            </div>
            <input type="submit" defaultValue="Login" className="btn solid" />
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
          <form autocomplete="new-password" className="sign-up-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                autocomplete="new-password"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                autocomplete="new-password"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock" />
              <input
                autocomplete="new-password"
                type="password"
                placeholder="Password"
              />
            </div>
            <input type="submit" defaultValue="Sign up" className="btn solid" />
            <p className="social-text">Or Sign Up with social platforms</p>
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
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ? </h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Assumenda, laboriosam.
            </p>

            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
          </div>
          <img src={image1} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ? </h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Assumenda, laboriosam.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </button>
          </div>
          <img src={image2} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};
