import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FrontClaim.css'; // Ensure you have this CSS file for styling

const FrontClaim = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  // States for keeping track of user's policy and claim status
  const [userPolicies, setUserPolicies] = useState([]);
  const [userClaims, setUserClaims] = useState([]);

  useEffect(() => {
    // Fetch all policies and then filter for the current user
    fetch(`http://localhost:5146/api/Policy`)
      .then(res => res.json())
      .then(data => {
        const policies = data.filter(policy => policy.username === username);
        setUserPolicies(policies);
      })
      .catch(err => console.error("Error fetching policies:", err));

    // Fetch all claims and then filter for the current user
    fetch(`http://localhost:5146/api/Claim`)
      .then(res => res.json())
      .then(data => {
        const claims = data.filter(claim => claim.username === username);
        setUserClaims(claims);
      })
      .catch(err => console.error("Error fetching claims:", err));
  }, [username]);

  // Derived states based on user's policies and claims
  const hasActivePolicy = userPolicies.some(policy => policy.status === 'ACTIVE');
  const hasPendingClaim = userClaims.some(claim => claim.status === 'PENDING');
  const hasApprovedClaim = userClaims.some(claim => claim.status === 'APPROVED');

  const claimMethods = [
    { title: "View All Claims", description: "Retrieve a list of all claims.", path: "/claim/get", icon: "📄" },
    { title: "Submit New Claim", description: "Submit a new claim for processing.", path: "/claim/post", icon: "➕" },
  ];

  const handleNavigate = (path, isSubmitNewClaim = false) => {
    if (!hasActivePolicy) {
      alert('You do not have an active policy. Please activate a policy first.');
      return;
    }

    if (isSubmitNewClaim) {
      if (hasPendingClaim) {
        alert('Please wait till your previous claim to get approved.');
        return;
      }

      if (hasApprovedClaim) {
        alert('Please wait till your current claim expires.');
        return;
      }
    }

    navigate(path);
  };

  return (
    <div className="claim-container">
      {claimMethods.map((method, index) => (
        <div key={index} className="claim-card" onClick={() => handleNavigate(method.path, method.path === "/claim/post")}>
          <div className="claim-icon">{method.icon}</div>
          <h3>{method.title}</h3>
          <p>{method.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FrontClaim;
