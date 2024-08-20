import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register'; 
import Profile from './Profile';
import NewsForm from './NewsForm';
import NewsList from './NewsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news/create" element={<NewsForm />} />
        <Route path="/news" element={<NewsList />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);

  const handleClick = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:8000/api/');
      setResponse(result.data);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  const handleRegistrationSuccess = () => {
    navigate('/profile');  // Перенаправление на страницу профиля после успешной регистрации
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
      <Register onSuccess={handleRegistrationSuccess} />
    </div>
  );
}

export default App;
