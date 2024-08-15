import React, { useState } from 'react';
import axios from 'axios';

function Profile() {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Функция для обработки загрузки изображения
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            resizeImage(file, 800, 800, (resizedBlob) => {
                setProfileImage(resizedBlob);
            });
        }
    };

    // Функция для сжатия изображения
    const resizeImage = (file, maxWidth, maxHeight, callback) => {
        const img = document.createElement('img');
        const canvas = document.createElement('canvas');
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Сжатие по ширине и высоте
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);

                // Преобразование в Blob для отправки на сервер
                canvas.toBlob(callback, file.type);
            };
        };
        reader.readAsDataURL(file);
    };

    // Функция для отправки формы
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        if (profileImage) {
            formData.append('profile_image', profileImage, 'profile_image.png');
        }

        try {
            // Замените `your_auth_token` на ваш реальный токен
            const response = await axios.put('http://127.0.0.1:8000/profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${your_auth_token}`, // Добавьте токен в заголовки
                },
            });

            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Save Profile</button>
                {error && <p>{error}</p>}
                {success && <p>Profile updated successfully!</p>}
            </form>
        </div>
    );
}

export default Profile;
