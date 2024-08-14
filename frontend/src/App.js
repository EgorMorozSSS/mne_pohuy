import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';

function App() {
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:8000/api/');
      setResponse(result.data);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  return (
    <div className="App">
      <h1>Hello, React!</h1>
      <button onClick={handleClick}>Send Request</button>
      {response && (
        <div>
          <h2>Response from Backend:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      <Register />
    </div>
  );
}

export default App;
