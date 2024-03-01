import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import personal from './personal.jpg';
import rental from './rental.jpg';
import road from './road.jpg';
import windshield from './windshield.jpg';
import bgImage from './v2.mp4';

const FrontPolicyAddOn = () => {
  const navigate = useNavigate();
  const [hasActivePolicy, setHasActivePolicy] = useState(false);
  const [canSelectAddOn, setCanSelectAddOn] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // To track hovered card
  const username = sessionStorage.getItem('username');

  const policyAddOns = [
    {
      name: 'Roadside Assistance',
      description: 'Immediate assistance for breakdowns, tire changes, and towing.',
      price: '50',
      image: road,
    },
    {
      name: 'Windshield Repair',
      description: 'Covers the cost of repairing or replacing your vehicle’s windshield.',
      price: '30',
      image: windshield,
    },
    {
      name: 'Rental Reimbursement',
      description: 'Reimburses the cost of a rental vehicle while your car is being repaired.',
      price: '40',
      image: rental,
    },
    {
      name: 'Personal Item Coverage',
      description: 'Covers personal items in your vehicle up to a specified limit.',
      price: '25',
      image: personal,
    },
  ];

  useEffect(() => {
    // Fetch all policies to check if the user has an active policy
    fetch(`http://localhost:5146/api/Policy`)
      .then(response => response.json())
      .then(data => {
        const userPolicies = data.filter(policy => policy.username === username);
        const activePolicy = userPolicies.some(policy => policy.status === 'ACTIVE');
        setHasActivePolicy(activePolicy);
      })
      .catch(err => console.error("Error fetching policies:", err));

    // Fetch all policy add-ons to check if the user already has a policy add-on
    fetch(`http://localhost:5146/api/PolicyAddOn`)
      .then(response => response.json())
      .then(data => {
        // Check if any add-on is associated with the username
        const hasAddOn = data.some(addOn => addOn.username === username);
        // User can select an add-on only if they have an active policy and no add-ons
        setCanSelectAddOn(hasActivePolicy && !hasAddOn);
      })
      .catch(err => console.error("Error fetching policy add-ons:", err));
  }, [username, hasActivePolicy]);

  const handleSelectAddOn = (selectedAddOn) => {
    if (!hasActivePolicy) {
      alert('You do not have an active policy. Please activate a policy first.');
      return;
    }
    if (!canSelectAddOn) {
      alert('You cannot avail another Policy Add-On.');
      return;
    }
    // Proceed to navigate with selected add-on details
    navigate('/policyaddon/post', { state: { ...selectedAddOn, username } });
  };



const policyContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'center',
};

const policyCardStyle = (isHovered) => ({
  border: '1px solid #ddd',
  borderRadius: '8px',
  width: '250px',
  textAlign: 'center',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  transform: isHovered ? 'scale(1.05)' : 'none',
  boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
  // backgroundImage: isHovered ? 'none' : `url(${isHovered ? '' : addOn.image})`, // Conditional image display
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px', // Adjust height as necessary
  padding: isHovered ? '20px' : '0', // Remove padding when not hovered
  overflow: 'hidden',
});

const infoStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background for readability
  width: '100%',
  height: '100%',
  opacity: hoveredIndex !== null ? 1 : 0, // Only show when hovered
  transition: 'opacity 0.2s ease',
};

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
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  }}>

<video autoPlay loop muted style={videoStyles}>
          <source src={bgImage} type="video/mp4" />
        </video>
    {policyAddOns.map((addOn, index) => (
      <div 
        key={index} 
        style={{
          marginTop: '145px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          width: '350px',
          textAlign: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          cursor: 'pointer',
          overflow: 'hidden', // Ensure the content doesn't overflow
          position: 'relative', // For absolute positioning of details
          ...(index === hoveredIndex ? {
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          } : {})
        }}
        onClick={() => handleSelectAddOn(addOn)}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <img src={addOn.image} alt={addOn.name} style={{ width: '100%', display: 'block', transition: 'opacity 0.2s ease', opacity: index === hoveredIndex ? 0.3 : 1 }} />
        {index === hoveredIndex && (
          <div style={{
            position: 'absolute',
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            padding: '20px',
            textAlign: 'center',
            fontSize: '10px',
            borderRadius: '20px',
          }}>
            <h5>{addOn.name}</h5>
            <p>{addOn.description}</p>
            <p style={{fontWeight: 'bold'}}>Price: ${addOn.price}</p>
          </div>
        )}
      </div>
    ))}
  </div>
);
};

export default FrontPolicyAddOn;


//   return (
//     <div className="policy-container">
//       {policyAddOns.map((addOn, index) => (
//         <div key={index} className="policy-card" onClick={() => handleSelectAddOn(addOn)}>
//           <h3>{addOn.name}</h3>
//           <p>{addOn.description}</p>
//           <p>Price: ${addOn.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FrontPolicyAddOn;

