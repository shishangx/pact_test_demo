import React, { useState, useEffect } from 'react';
import { getUser } from './api';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(1).then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default App;
