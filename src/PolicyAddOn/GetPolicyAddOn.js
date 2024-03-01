// import './GetClaim.css';
import { useState } from "react";
function GetPolicyAddOn() {
    var [policyaddons, setPolicyAddOns] = useState([{
        "addOnId": 0,
        "name": "",
        "description": "",
        "price": 0,
        "policyId": 0

    }]);
    var callAPI = () => {
        fetch("http://localhost:5146/api/PolicyAddOn")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setPolicyAddOns(res)
        });
    }

    return (
        <div className="body">
            <button className="btn btn-primary" onClick={callAPI}>Call API</button>
            {policyaddons.map((policyaddon) => (
                <div key={policyaddon.policyId} className="card">
                    <h2>PolicyAddOn ID: {policyaddon.addOnId}</h2>
                    <p>Name : {policyaddon.name}</p>
                    <p>Description: {policyaddon.description}</p>
                    <p>Price: {policyaddon.price}</p>
                    <p>Policy ID: {policyaddon.policyId}</p>
                </div>
            ))}
        </div>
    );
}

export default GetPolicyAddOn;