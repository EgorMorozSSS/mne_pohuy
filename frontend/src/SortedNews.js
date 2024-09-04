import React, { useState, useEffect } from 'react';

const SortedNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8001/api/sorted-news/';

    const fetchNews = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const fetchComments = async (newsId) => {
    const commentsUrl = `http://127.0.0.1:8001/api/news/${newsId}/comments/`;

    try {
      const response = await fetch(commentsUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [newsId]: data
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleShowComments = (newsId) => {
    setSelectedNewsId(newsId);
    fetchComments(newsId);
  };

  const handleCreateComment = async (newsId) => {
    const commentsUrl = `http://127.0.0.1:8001/api/news/${newsId}/comments/`;

    try {
      const response = await fetch(commentsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newComment })
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      // После создания комментария обновляем список комментариев
      fetchComments(newsId);
      setNewComment('');  // Очищаем поле ввода
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Sorted News</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <small>{new Date(item.created_at).toLocaleDateString()}</small>
            <button onClick={() => handleShowComments(item.id)}>
              Show Comments
            </button>

            {selectedNewsId === item.id && comments[item.id] && (
              <div>
                <h3>Comments:</h3>
                <ul>
                  {comments[item.id].map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                  ))}
                </ul>

                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a new comment"
                />
                <button onClick={() => handleCreateComment(item.id)}>
                  Add Comment
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortedNews;
