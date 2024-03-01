import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import bgImage from './Components/Welcome/video1.mp4';


function First(){
    const videoStyles = {
        position: "fixed",
        top: "50%",
        left: "50%",
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: "-1",
        transform: "translate(-50%, -50%)",
        opacity: "0.7",
        filter: "brightness(0.9) contrast(2.1)",
    
      };

return (


<div>
<video autoPlay loop muted style={videoStyles}>
          <source src={bgImage} type="video/mp4" />
        </video>
</div>


);


}
export default First;