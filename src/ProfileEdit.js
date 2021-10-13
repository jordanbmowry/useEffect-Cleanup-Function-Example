import React, { useState, useEffect } from 'react';

function ProfileEdit({ userId }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState({
    message: '',
  });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: abortController.signal }
        );
        const userFromAPI = await response.json();
        setUser(userFromAPI);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error);
        }
      }
    }
    loadUsers();
    return () => abortController.abort();
  }, [userId]);

  useEffect(() => {
    if (user.username) {
      document.title = `${user.username} : Edit Profile`;
    } else {
      document.title = 'Edit Profile';
    }
  }, [user]);

  const changeHandler = ({ target }) => {
    setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${user.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(user),
      }
    );
    const savedData = await response.json();
    alert(`Saved user info! Id: ${savedData.id}`);
  };

  const valueToReturn = user.id ? (
    <React.Fragment>
      <form name='profileEdit' onSubmit={submitHandler}>
        <div>
          <label htmlFor='username'>User Name:</label>
          <input
            id='username'
            name='username'
            type='text'
            value={user.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            name='email'
            type='email'
            value={user.email}
            onChange={changeHandler}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      <div>
        <h3>{error.name}</h3>
        <p>{error.message}</p>
      </div>
    </React.Fragment>
  ) : (
    'Loading...'
  );
  console.log(user);
  return valueToReturn;
}

export default ProfileEdit;
