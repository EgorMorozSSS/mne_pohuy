import React, { useState, useEffect } from 'react';
import './NewsList.scss'; // Import the SCSS file

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [editMode, setEditMode] = useState(null); // Track which item is being edited
    const [formData, setFormData] = useState({ title: '', content: '' }); // Data for the form

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
                setNews(prevNews => prevNews.filter(item => item.id !== id));
            } else {
                console.error('Error deleting news');
            }
        })
        .catch(error => console.error('Error deleting news:', error));
    };

    const startEdit = (item) => {
        setEditMode(item.id);
        setFormData({ title: item.title, content: item.content });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/news/${editMode}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            setNews(prevNews => prevNews.map(item => item.id === data.id ? data : item));
            setEditMode(null);
            setFormData({ title: '', content: '' });
        })
        .catch(error => console.error('Error updating news:', error));
    };

    return (
        <div className="news-list-container">
            <h1>News List</h1>
            <ul className="news-list">
                {news.map(item => (
                    <li key={item.id} className="news-item">
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        <p className="date"><em>{new Date(item.created_at).toLocaleString()}</em></p>
                        <button onClick={() => startEdit(item)}>Edit</button>
                        <button onClick={() => deleteNews(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editMode && (
                <div className="edit-form">
                    <h2>Edit News</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Content:</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Update</button>
                        <button type="button" className="cancel-button" onClick={() => setEditMode(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NewsList;
