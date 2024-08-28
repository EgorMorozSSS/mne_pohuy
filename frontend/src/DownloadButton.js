import React from 'react';

const DownloadButton = () => {
  const handleDownload = () => {
    fetch('http://127.0.0.1:5000/download')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'hello.txt');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(err => console.error('Ошибка при загрузке файла:', err));
  };

  return (
    <button onClick={handleDownload}>Скачать файл</button>
  );
};

export default DownloadButton;
