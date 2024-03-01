import React from 'react';
import { useNavigate } from 'react-router-dom';

const FrontVehicleInformation = () => {
  const navigate = useNavigate();

  const handleGetVehicleInformation = () => {
    navigate('/vehicleinformation/get');
  };

  const handlePostVehicleInformation = () => {
    navigate('/vehicleinformation/post');
  };

  return (
    <div>
      <button onClick={handleGetVehicleInformation}>GetVehicleInformation</button>
      <button onClick={handlePostVehicleInformation}>PostVehicleInformation</button>
    </div>
  );
};

export default FrontVehicleInformation;


