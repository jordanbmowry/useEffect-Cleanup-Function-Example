import React, { useState } from 'react';
import '../src/App.css';
import ProfileEdit from './ProfileEdit';

function App() {
  const [userId, setUserID] = useState(1);

  const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className='App'>
      {userIds.map((id) => (
        <button key={id} onClick={() => setUserID(id)}>
          User ID {id}
        </button>
      ))}
      <h2>User ID {userId}</h2>
      <ProfileEdit userId={userId} />
    </div>
  );
}

export default App;
