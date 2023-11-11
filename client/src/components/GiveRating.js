import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GiveRating = ({ roomId, previousRating, bookingId }) => {
  const [rating, setRating] = useState(null); // Initialize rating as null
  const [isLoading, setIsLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleRatingChange = (newRating) => {
    
    setRating(newRating);
    axios
      .post('/api/bookings/rateroom', { roomId, value:newRating,bookingId },config) 
      .then((response) => {
        console.log('Rating updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating rating:', error);
      });
  };


  return (
    <div>
      <b>Rate Room:</b>
      {previousRating != 0 ? (
        [1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= previousRating ? 'star-filled' : 'star-empty'}
          >
            <span className="star">★</span>
          </span>
        ))
      ): (
        [1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star-filled' : 'star-empty'}
            onClick={() => handleRatingChange(star)}
          >
            <span className="star">★</span>
          </span>
        ))
      )}
    </div>
  );
};

export default GiveRating;
