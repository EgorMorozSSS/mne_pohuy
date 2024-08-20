import React, { useState, useEffect } from 'react';

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/news/')
            .then(response => response.json())
            .then(data => setNews(data))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    const deleteNews = (id) => {
        fetch(`http://localhost:8000/news/${id}/delete/`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted news from the list
                setNews(prevNews => prevNews.filter(item => item.id !== id));
            } else {
                console.error('Error deleting news');
            }
        })
        .catch(error => console.error('Error deleting news:', error));
    };

    return (
        <div>
            <h1>News List</h1>
            <ul>
                {news.map(item => (
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <p><em>{new Date(item.created_at).toLocaleString()}</em></p>
                        <button onClick={() => deleteNews(item.id)}>Delete</button> {/* Delete button */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsList;
