import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Claim.css'; // Ensure you have the corresponding CSS file for styling

function Claim() {
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username'); // Retrieve username from sessionStorage
    const [activePolicy, setActivePolicy] = useState(null);
    const [dateOfIncident, setDateOfIncident] = useState(new Date().toISOString().slice(0, 10));
    const [dateOfClaim, setDateOfClaim] = useState(new Date().toISOString().slice(0, 10));
    const [description, setDescription] = useState("");
    const [claimAmount, setClaimAmount] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch the active policy for the current user
        fetch(`http://localhost:5146/api/Policy?username=${username}`)
            .then(response => response.json())
            .then(policies => {
                const activePolicy = policies.find(policy => policy.username === username && policy.status === "ACTIVE");
                if (activePolicy) {
                    setActivePolicy(activePolicy);
                } else {
                    setError("No active policy found.");
                }
            })
            .catch(err => {
                console.error("Failed to fetch policy:", err);
                setError("Error fetching policy details.");
            });
    }, [username]);

    const handleSubmitClaim = (e) => {
        e.preventDefault();

        if (!activePolicy) {
            setError("No active policy to submit claim against.");
            return;
        }

        const claimData = {
            policyId: activePolicy.policyId,
            claimType: activePolicy.type, // Assuming 'type' is available in your policy object
            dateOfIncident,
            dateOfClaim,
            description,
            claimAmount,
            status: "PENDING",
            username,
        };

        fetch("http://localhost:5146/api/Claim", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(claimData),
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to submit claim.");
            return response.json();
        })
        .then(() => {
            setSubmissionMessage("Your claim has been submitted successfully. We will contact you soon.");
            setTimeout(() => navigate("/welcome/{username}"), 10000);
        })
        .catch(error => {
            console.error("Error submitting claim:", error);
            setError("Failed to submit claim.");
        });
    };

    return (
        <div className="claim-container">
            <h2>Submit a New Claim</h2>
            {error && <div className="error-message">{error}</div>}
            {activePolicy && (
                <form onSubmit={handleSubmitClaim} className="claim-form">
                    <h4>Active Policy Number: {activePolicy.policyNumber}</h4>
                    <h5>Claim Type: {activePolicy.type}</h5>
                    <div className="form-group">
                        <label>Date of Incident</label>
                        <input type="date" className="form-control" value={dateOfIncident} onChange={(e) => setDateOfIncident(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Date of Claim</label>
                        <input type="date" className="form-control" value={dateOfClaim} onChange={(e) => setDateOfClaim(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Claim Amount</label>
                        <input type="number" className="form-control" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Claim</button>
                    {submissionMessage && <div className="submission-message">{submissionMessage}</div>}
                </form>
            )}
            {!activePolicy && !error && <p>Loading policy details...</p>}
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
}

export default Claim;
