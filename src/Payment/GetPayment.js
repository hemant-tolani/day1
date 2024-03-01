// import './GetClaim.css';
import { useState } from "react";
function GetPayment() {
    var [payments, setPayments] = useState([{
        "paymentId": 0,
        "claimId": 0,
        "claim": "",
        "amount": 0,
        "paymentDate": "",
        "transactionId": "",
        "paymentMethod": "",
        "status":""

    }]);
    var callAPI = () => {
        fetch("http://localhost:5146/api/Payment")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setPayments(res)
        });
    }

    return (
        <div className="body">
            <button className="btn btn-primary" onClick={callAPI}>Call API</button>
            {payments.map((payment) => (
                <div key={payment.paymentId} className="card">
                    <h2>Payment ID: {payment.paymentId}</h2>
                    <p>Claim ID: {payment.claimId}</p>
                    <p>Amount: {payment.amount}</p>
                    <p>Payment Date: {payment.paymentDate}</p>
                    <p>Transaction ID: {payment.transactionId}</p>
                    <p>Payment Method: {payment.paymentMethod}</p>
                    <p>Status: {payment.status}</p>
                </div>
            ))}
        </div>
    );
}

export default GetPayment;