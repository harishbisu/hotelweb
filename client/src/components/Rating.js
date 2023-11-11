import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rating= ({ roomId }) => {
  const [rating, setRating] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const token = JSON.parse(localStorage.getItem('token'));

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  useEffect(() => {
    axios.get(`/api/bookings/fetchrating/${roomId}`,config) 
      .then((response) => {
        const previousRating = response.data.value;
        const prevCount = response.data.count;
        setRating(previousRating);
        setCount(prevCount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching rating:', error);
        setIsLoading(false);
      });
  },[roomId]);

  if (isLoading) {
    return <div>
      Rating:
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={'star-empty'}
        >
          <span className="star">★</span>
        </span>
      ))}
      ({0})
    </div>;
  }

  return (
    <div>
      Rating:
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'star-filled' : 'star-empty'}
        >
          <span className="star">★</span>
        </span>
      ))}
      ({count})
    </div>
  );
};

export default Rating;
