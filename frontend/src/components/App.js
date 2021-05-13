import React, { useState } from 'react';
import { Route, Switch } from 'react-router';
import { useAppState } from '../AppState';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Nav from './Nav';

export const App = props => {
  const { state, dispatch } = useAppState();
  useState(() => {
    const auth = JSON.parse(window.localStorage.getItem('auth'));

    if (auth) {
      dispatch({ type: 'auth', payload: auth });
      props.history.push('/dashboard');
    } else {
      props.history.push('/');
    }
  }, []);
  return (
    <>
      <Route path='/' component={Nav} />

      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/auth/:form' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </>
  );
};
