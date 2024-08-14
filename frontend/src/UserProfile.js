import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Fetch the user profile when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarChange = async (event) => {
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);

    try {
      await axios.patch('http://127.0.0.1:8000/api/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Update the profile after uploading the avatar
      const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProfile(response.data);
      setAvatar(response.data.avatar);
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {profile ? (
        <div>
          <p><strong>Name:</strong> {profile.user.username}</p>
          <p><strong>Email:</strong> {profile.user.email}</p>
          <div>
            <img
              src={avatar ? `http://127.0.0.1:8000${avatar}` : 'https://via.placeholder.com/150'}
              alt="Avatar"
              style={{ width: '150px', height: '150px' }}
            />
            <input type="file" onChange={handleAvatarChange} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
