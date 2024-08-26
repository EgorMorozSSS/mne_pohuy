import React, { useState, useEffect } from 'react';
import './NewsList.scss';
import Header from './Header';  // Импортируем компонент шапки

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [editMode, setEditMode] = useState(null); // Режим редактирования
    const [formData, setFormData] = useState({ title: '', content: '' }); // Данные формы
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const [totalPages, setTotalPages] = useState(1); // Общее количество страниц

    useEffect(() => {
        fetch(`http://localhost:8000/news/?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                setNews(data.results); // Используем data.results для PageNumberPagination
                setTotalPages(Math.ceil(data.count / 10)); // Общее количество страниц
            })
            .catch(error => console.error('Error fetching news:', error));
    }, [currentPage]);

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

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <Header /> {/* Добавляем шапку */}
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

                {/* Пагинация */}
                <div className="pagination">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>

                {/* Форма редактирования */}
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
        </>
    );
};

export default NewsList;
