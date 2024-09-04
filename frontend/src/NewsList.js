import React, { useState, useEffect } from 'react';
import './NewsList.scss';
import Header from './Header';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [comments, setComments] = useState({}); // Комментарии по каждой новости
    const [newComment, setNewComment] = useState(''); // Новый комментарий
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showComments, setShowComments] = useState({}); // Состояние для показа комментариев

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    const fetchNews = async () => {
        try {
            const response = await fetch(`http://localhost:8000/news/?page=${currentPage}`);
            const data = await response.json();
            setNews(data.results);
            setTotalPages(Math.ceil(data.count / 10));
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const fetchComments = async (newsId) => {
        try {
            const response = await fetch(`http://localhost:8000/news/${newsId}/comments/`);
            const data = await response.json();
            if (Array.isArray(data) && data.every(comment => typeof comment === 'object' && 'id' in comment && 'content' in comment && 'created_at' in comment)) {
                setComments(prevComments => ({
                    ...prevComments,
                    [newsId]: data
                }));
            } else {
                console.error('Expected an array of comment objects with id, content, and created_at, but got:', data);
                throw new Error('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const toggleComments = async (newsId) => {
        if (!showComments[newsId]) {
            if (!comments[newsId]) {
                await fetchComments(newsId);
            }
        }
        setShowComments(prevState => ({
            ...prevState,
            [newsId]: !prevState[newsId]
        }));
    };

    const addComment = async (newsId) => {
        if (newComment.trim() === '') {
            console.error('Comment content cannot be empty');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8000/news/${newsId}/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newComment.trim() }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                throw new Error(errorData.detail || 'Error adding comment');
            }
            const data = await response.json();
            setComments(prevComments => ({
                ...prevComments,
                [newsId]: [
                    ...(prevComments[newsId] || []), 
                    data
                ]
            }));
            setNewComment(''); // Очистить поле ввода
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    
    return (
        <>
            <Header />
            <div className="news-list-container">
                <h1>News List</h1>
                <ul className="news-list">
                    {news.map(item => (
                        <li key={item.id} className="news-item">
                            <h2>{item.title}</h2>
                            <p>{item.content}</p>
                            <p className="date">
                                <em>{new Date(item.created_at).toLocaleString()}</em>
                            </p>
                            <button onClick={() => toggleComments(item.id)}>
                                {showComments[item.id] ? 'Hide Comments' : 'Show Comments'}
                            </button>
    
                            {showComments[item.id] && (
                                <div className="comments-section">
                                    <ul>
                                        {comments[item.id] && comments[item.id].length > 0 ? comments[item.id].map(comment => (
                                            <li key={comment.id}>
                                                <p>{comment.content}</p>
                                                <p className="date">
                                                    <em>{new Date(comment.created_at).toLocaleString()}</em>
                                                </p>
                                            </li>
                                        )) : <li>No comments yet.</li>}
                                    </ul>
    
                                    <div className="add-comment">
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Add a comment"
                                        />
                                        <button onClick={() => addComment(item.id)}>Add Comment</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
    
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default NewsList;
