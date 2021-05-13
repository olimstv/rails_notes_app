import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useAppState } from '../AppState';
import Form from '../components/Form';

const Dashboard = props => {
  const { state, dispatch } = useAppState();
  const { token, url, notes, username } = state;

  const getNotes = async () => {
    const response = await fetch(`${url}/notes/`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`
      }
    });
    const fetchedNotes = await response.json();
    dispatch({ type: 'getNotes', payload: fetchedNotes });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const loaded = () => (
    <div className='dashboard'>
      <h1>{username}'s Notes</h1>
      <Link to='/dashboard/new'>
        <button>New Note </button>
      </Link>
      <Route
        path='/dashboard/:action'
        render={rp => <Form {...rp} getNotes={getNotes} />}
      />
      <ul>
        {notes.map(note => (
          <div className='note' key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <button
              onClick={() => {
                dispatch({ type: 'select', payload: note });
                props.history.push('/dashboard/edit');
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                fetch(`${url}/notes/${note.id}`, {
                  method: 'DELETE',
                  headers: {
                    Authorization: `bearer ${token}`
                  }
                }).then(() => {
                  getNotes();
                });
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
  return notes ? loaded() : <h1>Loading...</h1>;
};
export default Dashboard;
