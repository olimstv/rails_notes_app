import React, { useEffect, useState } from 'react';
import { useAppState } from '../AppState';

const Auth = props => {
  const type = props.match.params.form;
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [userData, setUserData] = useState(null);
  const { state, dispatch } = useAppState();
  console.log('state :>> ', state);

  useEffect(() => {
    if (userData) {
      console.log('userData :>> ', userData);
      const { token, user } = userData;
      dispatch({ type: 'auth', payload: { token, username: user.username } });
      window.localStorage.setItem(
        'auth',
        JSON.stringify({ token, username: user.username })
      );
      props.history.push('/dashboard');
    }
  }, [userData]);

  const actions = {
    signup: () => {
      return fetch(`${state.url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(res => res.json());
    },
    login: () => {
      return fetch(`${state.url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(res => res.json());
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('formData :>> ', JSON.stringify(formData));
  };

  const handleSubmit = e => {
    e.preventDefault();

    actions[type]().then(data => {
      setUserData(data);
    });
  };

  return (
    <div className='container'>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <input type='submit' value={type} />
        </form>
      </div>
    </div>
  );
};
export default Auth;
