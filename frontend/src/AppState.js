import React, { useContext, useReducer } from 'react';

// ----------------------
// INITIAL STATE
// ----------------------
const initialState = {
  url: 'https://omnotesreactrailsbackend.herokuapp.com', // change to https: on a prod
  // url: 'http://localhost:8080/',
  token: null,
  username: null,
  email: null,
  notes: null,
  new: {
    id: 0,
    title: '',
    body: ''
  },
  edit: {
    id: 0,
    title: '',
    body: ''
  }
};

// ----------------------
// REDUCER
// ----------------------
// action = {type: "", payload: }
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'auth':
      newState = { ...state, ...action.payload };
      return newState;
      break;
    case 'logout':
      newState = { ...state, token: null, username: null, email: null };
      window.localStorage.removeItem('auth');
      return newState;
      break;
    case 'getNotes':
      newState = { ...state, notes: action.payload };
      return newState;
      break;
    case 'select':
      newState = { ...state, edit: action.payload };
      return newState;
      break;
    default:
      return state;
      break;
  }
};

// ----------------------
// AppContext
// ----------------------
const AppContext = React.createContext(null);

// ----------------------
// AppState Component
// ----------------------
export const AppState = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
// ----------------------
// useAppState hook
// ----------------------
export const useAppState = () => {
  return React.useContext(AppContext);
};
