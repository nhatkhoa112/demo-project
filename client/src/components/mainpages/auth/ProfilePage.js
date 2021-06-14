import React from 'react';
import { useParams } from 'react-router-dom';
import './profilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import image from './image/rose-green.png';
import { Link, Redirect } from 'react-router-dom';

export const ProfilePage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(isAuthenticated);
  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="profile-page">
      <section className="section1">
        <div className="content">
          <img src={image} alt="rose" />
          <div className="content__title">Profile Info</div>
          <ol className="breadcrumbs-custom">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>ProfilePage</li>
          </ol>
        </div>
      </section>

      <div className="user-info">
        <div className="avatar">
          <img src={user.avatar} alt="avatar" />
        </div>
        <div className="content">
          <div className="name">
            Username: <span>{user.name}</span>
          </div>
          <div className="email">
            Email: <span>{user.email}</span>
          </div>
          <div className="action">
            Action:{' '}
            <span>
              <i className="fas fa-pen"></i>
            </span>{' '}
            <span>
              <i className="far fa-trash-alt"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
