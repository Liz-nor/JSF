import React, { useEffect } from 'react';

const FetchAPI = () => {
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return null;
};

export default FetchAPI;
