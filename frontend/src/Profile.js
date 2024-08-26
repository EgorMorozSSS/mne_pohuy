import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';  // Импортируем компонент шапки

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/profile/', {
          headers: {
            'Authorization': `Token ${token}`,  // Использование токена в заголовке
          },
        });
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError('Failed to fetch profile data.');
        console.error(err);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <>
      <Header />  {/* Добавляем шапку */}
      <div>
        <h2>Profile</h2>
        {error && <p>{error}</p>}
        <div>
          <strong>Username:</strong> {username}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
      </div>
    </>
  );
}

export default Profile;
