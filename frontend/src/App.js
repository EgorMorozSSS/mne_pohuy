import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register'; // Импортируем компонент регистрации

function App() {
  const [response, setResponse] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // Состояние для отслеживания регистрации

  const handleClick = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:8000/api/');
      setResponse(result.data);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  // Обработчик успешной регистрации
  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
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
      {/* Передаем обработчик регистрации в компонент Register */}
      <Register onSuccess={handleRegistrationSuccess} />
      {isRegistered && <p>Registration successful! You can now log in.</p>}
    </div>
  );
}

export default App;
