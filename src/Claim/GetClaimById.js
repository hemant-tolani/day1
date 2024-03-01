import React, { useState } from 'react';

function GetClaimById() {
  const [claimId, setClaimId] = useState('');
  const [claimDetails, setClaimDetails] = useState(null);

  const handleInputChange = (event) => {
    setClaimId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Fetch claim details by claim ID using the input value
    fetch(`http://localhost:5146/api/Claim/${claimId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Example authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => setClaimDetails(data))
      .catch((error) => {
        console.error('Error fetching claim details:', error);
        setClaimDetails(null); // Reset claim details on error
      });
  };

  return (
    <div>
      <h2>Enter Claim ID to View Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={claimId}
          onChange={handleInputChange}
          placeholder="Enter Claim ID"
        />
        <button type="submit">Get Claim Details</button>
      </form>
      <h2>Claim Details</h2>
      {claimDetails ? (
        <div>
          <p><strong>Description:</strong> {claimDetails.description}</p>
          <p><strong>Status:</strong> {claimDetails.status}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No claim details found for this ID.</p>
      )}
    </div>
  );
}

export default GetClaimById;
