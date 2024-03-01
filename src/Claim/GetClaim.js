import React, { useState, useEffect } from "react";

function GetClaim() {
    const [claims, setClaims] = useState([]);
    const username = sessionStorage.getItem('username'); // Retrieve the current user's username

    useEffect(() => {
        // Automatically call the API when the component mounts
        fetch("http://localhost:5146/api/Claim")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Filter the claims for the current user based on username
                const userClaims = data.filter(claim => claim.username === username);
                setClaims(userClaims); // Set the filtered claims
            })
            .catch(error => {
                console.error("Error fetching claims:", error);
            });
    }, [username]); // Depend on username to refetch if it changes

    return (
        <div className="body">
            <h2>My Claims</h2>
            {claims.length > 0 ? (
                claims.map((claim) => (
                    <div key={claim.claimId} className="card">
                        <h3>Claim ID: {claim.claimId}</h3>
                        <p>Policy ID: {claim.policyId}</p>
                        <p>Claim Type: {claim.claimType}</p>
                        <p>Date of Incident: {claim.dateOfIncident}</p>
                        <p>Date of Claim: {claim.dateOfClaim}</p>
                        <p>Status: {claim.status}</p>
                        <p>Description: {claim.description}</p>
                        <p>Claim Amount: {claim.claimAmount}</p>
                    </div>
                ))
            ) : (
                <p>You currently have no claims.</p>
            )}
        </div>
    );
}

export default GetClaim;
