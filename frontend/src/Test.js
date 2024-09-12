// mne_pohuy/src/components/Test.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/api/data/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Test;
