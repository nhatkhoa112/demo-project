import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../redux/actions';
import './activationPage.css';

export const ActivationPage = () => {
  const { active_token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.verifyEmail(active_token));
  }, [active_token, dispatch]);

  return (
    <div className="active-page">
      <div className="infor-card">
        <h4>
          Thanks you to verify the email. If you verify email successfully, you
          can explorer our website
        </h4>
        <Link to="/"> Back to Home page </Link>
      </div>
    </div>
  );
};
