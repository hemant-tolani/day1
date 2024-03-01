import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontDetail = () => {
  const navigate = useNavigate();

  const handleGetDetail = () => {
    navigate('/claim/get');
  };

  return (
    <div>
      <button onClick={handleGetDetail}>GetDetail</button>
    </div>
  );
};

export default FrontDetail;
