// import './GetClaim.css';
import { useState } from "react";
function GetPolicy() {
    var [policies, setPolicies] = useState([{
        "policyId": 0,
        "policyNumber": "",
        "type": "",
        "issueDate": "",
        "expiryDate": "",
        "premium": 0,
        "status": "",
        "username":""

    }]);
    var callAPI = () => {
        fetch("http://localhost:5146/api/Policy")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setPolicies(res)
        });
    }

    return (
        <div className="body">
            <button className="btn btn-primary" onClick={callAPI}>Call API</button>
            {policies.map((policy) => (
                <div key={policy.policyId} className="card">
                    <h2>Policy ID: {policy.policyId}</h2>
                    <p>Policy Number: {policy.policyNumber}</p>
                    <p>Type: {policy.type}</p>
                    <p>Issue Date: {policy.issueDate}</p>
                    <p>Expiry Date: {policy.expiryDate}</p>
                    <p>Premium: {policy.premium}</p>
                    <p>Status: {policy.status}</p>
                    <p>Username: {policy.username}</p>
                </div>
            ))}
        </div>
    );
}

export default GetPolicy;