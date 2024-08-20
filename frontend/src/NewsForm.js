// NewsForm.js

import React, { useState } from 'react';

const NewsForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const news = { title, content };

        fetch('http://localhost:8000/news/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(news),
        })
        .then(response => response.json())
        .then(data => {
            console.log('News created:', data);
            // Очистка формы после создания новости
            setTitle('');
            setContent('');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit">Create News</button>
        </form>
    );
};

export default NewsForm;
