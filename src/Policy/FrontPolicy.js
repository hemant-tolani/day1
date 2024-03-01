import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fire from './fire.jpg';
import flood from './flood.jpeg';
import accident from './accident.jpg';
import theft from './theft.jpg';
import third from './3rd.jpg';
import bgImage from './policy_space.mp4';

const FrontPolicy = () => {
  const navigate = useNavigate();
  const [hasActivePolicy, setHasActivePolicy] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null); // Add state to track hover
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    fetch(`http://localhost:5146/api/Policy?username=${username}`)
      .then(res => res.json())
      .then(data => {
        const activePolicy = data.find(policy => policy.username === username && policy.status === 'ACTIVE');
        setHasActivePolicy(!!activePolicy);
      })
      .catch(err => console.error("Error fetching user's policies:", err));
  }, [username]);

  const handleNavigate = (policyCode) => {
    if (hasActivePolicy) {
      alert('You already have an active policy. Other policies can be availed after the expiry of the current policy.');
    } else {
      navigate('/policy/post', { state: { policyCode } });
    }
  };

  const policies = [
    { name: 'Accident Insurance', description: 'Covers costs from accidents...', policyCode: 'ACCINSU', image: accident },
    { name: 'Theft Insurance', description: 'Offers coverage in the event of your vehicle’s theft...', policyCode: 'THEFTINSU', image: theft },
    { name: 'Fire Insurance', description: 'Protects against damages caused by fire...', policyCode: 'FIREINSU', image: fire },
    { name: 'Flood Insurance', description: 'Covers damage to your vehicle caused by flooding...', policyCode: 'FLOODINSU', image: flood },
    { name: 'Third-Party Liability Insurance', description: 'Provides coverage for damages or injuries you cause to another person...', policyCode: '3rdPartyINSU', image: third },
  ];

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

  const policyContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
  };

  const policyCardStyle = {
    position: 'relative',
    width: '300px',
    height: '200px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    marginTop: '90px',
  };

  const policyNameOverlayStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    opacity: 0,
    transition: 'background-color 0.3s ease, opacity 0.3s ease',
    textAlign: 'center',
    padding: '20px',
  };

  const policyNameOverlayHoverStyle = {
    ...policyNameOverlayStyle,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
  };

  return (
    <div className="policy-container" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <video autoPlay loop muted style={videoStyles}>
        <source src={bgImage} type="video/mp4" />
      </video>

      {policies.map((policy, index) => (
        <div
          key={index}
          className="policy-card"
          onClick={() => handleNavigate(policy.policyCode)}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          style={{
            position: 'relative',
            width: '300px',
            height: '200px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
            backgroundImage: `url(${policy.image})`,
          }}
        >
          {hoverIndex === index && (
            <div
              className="policy-name-overlay"
              style={{
                position: 'absolute',
                top: 20, // Align top edge with the card's top edge
                left: 20, // Align left edge with the card's left edge
                right: 20, // Align right edge with the card's right edge
                bottom: 20, // Align bottom edge with the card's bottom edge
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center content vertically
                alignItems: 'center', // Center content horizontally
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
                color: '#fff',
                textAlign: 'center',
                padding: '10px',
                borderRadius: '10px',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{policy.name}</div>
              <div style={{ fontSize: '10px' }}>{policy.description}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FrontPolicy;