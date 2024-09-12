// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/news/create">Create News</Link></li>
                    <li><Link to="/news">News List</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
