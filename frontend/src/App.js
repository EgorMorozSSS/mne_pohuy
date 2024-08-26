
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Добавляем импорт Link
import Register from './Register'; 
import Profile from './Profile';
import NewsForm from './NewsForm';
import NewsList from './NewsList';
import CookieConsent from './CookieConsent';
import './Home.scss';  // Подключаем файл стилей

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/news/create" element={<NewsForm />} />
        <Route path="/news" element={<NewsList />} />
      </Routes>

      {/* Компонент уведомления о Cookies */}
      <CookieConsent />
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <nav className="navigation">
        <ul>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/news/create">Create News</Link></li>
          <li><Link to="/news">News List</Link></li>
        </ul>
      </nav>

      <div className="content">
        <h1>Welcome to the News Portal</h1>
        <p>Explore the latest news or create your own articles!</p>
      </div>
    </div>
  );
}

export default App;
