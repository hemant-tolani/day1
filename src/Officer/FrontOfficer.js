import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontOfficer = () => {
  const navigate = useNavigate();

  const handleGetOfficer = () => {
    navigate('/officer/get');
  };

  const handlePostOfficer = () => {
    navigate('/officer/post');
  };

  return (
    <div>
      <button onClick={handleGetOfficer}>GetOfficer</button>
      <button onClick={handlePostOfficer}>PostOfficer</button>
    </div>
  );
};

export default FrontOfficer;
