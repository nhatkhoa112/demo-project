import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateAdminRoute = ({ ...rest }) => {
  const { role } = useSelector((state) => state.auth.user);
  if (role === 1) return <Route {...rest} />;
  delete rest.component;
  return <Route {...rest} render={() => <Redirect to="/" />} />;
};
