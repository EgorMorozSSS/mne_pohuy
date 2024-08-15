import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !profileImage) {
      setError('Please provide both a name and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('profile_image', profileImage);

    try {
      await axios.post('http://127.0.0.1:8000/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label>Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Profile Preview" width="100" />}
        </div>
        <button type="submit">Save Profile</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
}

export default Profile;
