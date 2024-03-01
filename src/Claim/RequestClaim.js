import React, { useState, useEffect } from 'react';

function RequestClaim() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  // Fetch claims with PENDING status
  const fetchClaims = () => {
    fetch('http://localhost:5146/api/Claim')
      .then((res) => res.json())
      .then((data) => {
        // Assuming the API returns all claims, filter for PENDING status here or adjust based on API
        const pendingClaims = data.filter(claim => claim.status === "PENDING");
        setClaims(pendingClaims);
      })
      .catch((err) => console.error('Error fetching claims:', err));
  };

  // Update claim status and remove from UI
  const updateClaimStatus = (id, newStatus) => {
    console.log(`Updating status for claim ID: ${id} to ${newStatus}`); // Debugging

    fetch(`http://localhost:5146/api/Claim/${id}/ChangeStatus`, {
      method: 'POST', // Ensure method matches your API requirement
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStatus), // Sending newStatus as a string directly
    })
    .then((res) => {
        window.location.reload()
      if (!res.ok) {
        throw new Error(`Failed to update claim status for ID: ${id}. Response status: ${res.status}`);
      }
      // Update UI: Remove the claim with updated status
      setClaims(prevClaims => prevClaims.filter(claim => claim.id !== id));
    })
    .catch((err) => console.error('Error updating claim status:', err));
  };

  return (
    <div className="claims-container">
      {claims.map((claim) => (
        <div key={claim.claimId} className="claim-card">
          <h5>Claim ID: {claim.claimId}</h5>
          <p>Status: {claim.status}</p>
          <button onClick={() => updateClaimStatus(claim.claimId, 'APPROVED')} className="btn btn-success">
            Approve
          </button>
          <button onClick={() => updateClaimStatus(claim.claimId, 'REJECTED')} className="btn btn-danger">
            Reject
          </button>
        </div>
      ))}
      {claims.length === 0 && <p>No PENDING claims to display.</p>}
    </div>
  );
}

export default RequestClaim;
