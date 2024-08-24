// ./components/CookieConsent.js

import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли дано согласие на использование Cookies
    const cookiesAccepted = getCookie('cookies_accepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie('cookies_accepted', 'true', 365); // Сохраняем Cookie на 365 дней
    setIsVisible(false); // Скрываем уведомление
  };

  // Функция для установки Cookies
  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  // Функция для получения Cookies
  const getCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  if (!isVisible) {
    return null; // Если уведомление не нужно, ничего не рендерим
  }

  return (
    <div style={cookieStyle}>
      <p>Мы используем файлы cookie для улучшения вашего опыта. Нажмите "Принять", если вы согласны.</p>
      <button onClick={acceptCookies} style={buttonStyle}>Принять</button>
    </div>
  );
};

// Примитивные стили (можете настроить CSS отдельно)
const cookieStyle = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: 'white',
  padding: '15px',
  textAlign: 'center',
  zIndex: '9999',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  marginLeft: '10px',
};

export default CookieConsent;
