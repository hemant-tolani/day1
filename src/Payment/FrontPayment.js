import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontPayment = () => {
  const navigate = useNavigate();

  const handleGetPayment = () => {
    navigate('/payment/get');
  };

  const handlePostPayment = () => {
    navigate('/payment/post');
  };

  return (
    <div>
      <button onClick={handleGetPayment}>GetPayment</button>
      <button onClick={handlePostPayment}>PostPayment</button>
    </div>
  );
};

export default FrontPayment;
