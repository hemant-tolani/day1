// import { useState } from "react";

// function PostPayment() {
//     var [claims, setClaims] = useState([]);
//     var [claimId, setClaimId] = useState("");
//     var [amount, setAmount] = useState("");
//     var [paymentDate, setPaymentDate] = useState(new Date());
//     var [transactionId, setTransactionId] = useState("");
//     var [paymentMethod, setPaymentMethod] = useState("");
//     var [status, setStatus] = useState("");

    
//     var temp_payment = {};

//     var paym =()=>{
//         temp_payment.claimId = claimId;
//         temp_payment.amount = amount;
//         temp_payment.paymentDate = paymentDate;
//         temp_payment.transactionId = transactionId;
//         temp_payment.paymentMethod = paymentMethod;
//         temp_payment.status = "PROCESSED";
//         console.log(temp_payment);
//                 var requestOptions = {
//             method : 'POST',
//             headers : {'Content-Type':'application/json'},
//             body : JSON.stringify(temp_payment)
//         }
//         console.log(requestOptions);

//         fetch("http://localhost:5146/api/Payment",requestOptions)
//         .then(res => res.json())
//         .then(res=>console.log(res))
//         .catch(err => console.log(err));

//     };

    


//     var getClaims =  ()=>{
//         fetch("http://localhost:5146/api/Claim")
//         .then(res=>res.json())
//         .then(res=>{
//             setClaims(res);
//             console.log(claims);
//         });
//     }

//     return(
       
//         <div className="alert alert-success divregister">
      
//         <button onClick={getClaims} className="btn btn-primary">Get Claims</button>
//         <label className="form-control">Claim</label>
//         <select className="form-control" onChange={(e)=>setClaimId(e.target.value)}>
//             <option value="0">--Select a Claim--</option>
//             {claims.map((claim)=>
//             <option key={claim.claimId} value={claim.claimId}>{claim.claimType}</option>)}
//         </select>
   
       
//         <label className="form-control">Amount</label>
//         <input className="form-control" type="number" value={amount} 
//         onChange={(e)=>setAmount(e.target.value)}/>

//         <label className="form-control">Payment Date</label>
//         <input className="form-control" type="datetime-local" value={paymentDate} 
//         onChange={(e)=>setPaymentDate(e.target.value)}/>

//         <label className="form-control">Transaction ID</label>
//         <input className="form-control" type="number" value={transactionId} 
//         onChange={(e)=>setTransactionId(e.target.value)}/>

//         <label className="form-control">Payment Method</label>
//         <select className="form-control" onChange={(e)=>setPaymentMethod(e.target.value)}>
//             <option value="">--select payment method--</option>
//             <option value="CreditCard">Credit Card</option>
//             <option value="UPI">UPI</option>
//             <option value="Cash">Cash</option>
//         </select>
        
//         <button onClick={paym} className="btn btn-success">Submit Information</button>
//         <button className="btn btn-danger">Cancel</button>

       


//         </div>
//     );


// }
// export default PostPayment;


// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';

// function PostPayment() {
//     const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [claims, setClaims] = useState([]);
//     const claimId = null;
//     const [amount, setAmount] = useState(location.state?.amount || "");
//     const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 16)); // Format for datetime-local input
//     const [transactionId, setTransactionId] = useState("");
//     const [paymentMethod, setPaymentMethod] = useState("");
//     const [status, setStatus] = useState("PROCESSED"); // Assuming status is always "PROCESSED" when posting
//     const username = sessionStorage.getItem('username');

//     useEffect(() => {
//         getClaims();
//     }, []);

//     const getClaims = () => {
//         fetch("http://localhost:5146/api/Claim")
//             .then(res => res.json())
//             .then(res => {
//                 setClaims(res);
//             })
//             .catch(err => console.log(err));
//     };

//     const handleClaimChange = (e) => {
//         // const selectedClaimId = e.target.value;
//         // setClaimId(selectedClaimId);

//         // Fetch the claim to get the policyId
//         // fetch(`http://localhost:5146/api/Claim/${selectedClaimId}`)
//             // .then(res => res.json())
//             // .then(claimData => {
//                 // Use the policyId from the claim to fetch the policy and set the premium as the amount
//             //     fetch(`http://localhost:5146/api/Policy/${claimData.policyId}`)
//             //         .then(res => res.json())
//             //         .then(policyData => {
//             //             setAmount(policyData.premium); // Assuming the policy object has a premium field
//             //         })
//             //         .catch(err => console.log(err));
//             // })
//             // .catch(err => console.log(err));
//     };

//     const paym = () => {
//         const temp_payment = {
//             claimId,
//             amount,
//             paymentDate,
//             transactionId,
//             paymentMethod,
//             status,
//             username
//         };
//         console.log(temp_payment);
//         const requestOptions = {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(temp_payment)
//         };
//         console.log(requestOptions);

//         fetch("http://localhost:5146/api/Payment", requestOptions)
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return res.json();
//         })
//         .then(res => {
//             console.log(res);
//             setIsPaymentSuccessful(true); // Set success message to display
//             setTimeout(() => {
//                 navigate('/welcome'); // Redirect to Welcome page after a delay
//             }, 3000); // Adjust delay as needed
//         })
//         .catch(err => {
//             console.log(err);
//             // Optionally handle the error
//         });
//     };

//     return (
//         <div className="alert alert-success divregister">
//             {/* <button onClick={getClaims} className="btn btn-primary">Get Claims</button>
//             <label className="form-control">Claim</label>
//             <select className="form-control" value={claimId} onChange={handleClaimChange}>
//                 <option value="">--Select a Claim--</option>
//                 {claims.map((claim) => (
//                     <option key={claim.claimId} value={claim.claimId}>{claim.claimType}</option>
//                 ))}
//             </select> */}

//             <label className="form-control">Amount</label>
//             <input className="form-control" type="number" value={amount} readOnly />

//             <label className="form-control">Payment Date</label>
//             <input className="form-control" type="datetime-local" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />

//             <label className="form-control">Transaction ID</label>
//             <input className="form-control" type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />

//             <label className="form-control">Payment Method</label>
//             <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//                 <option value="">--select payment method--</option>
//                 <option value="CreditCard">Credit Card</option>
//                 <option value="UPI">UPI</option>
//                 <option value="Cash">Cash</option>
//             </select>

//             <button onClick={paym} className="btn btn-success">Submit Information</button>
//             <button className="btn btn-danger">Cancel</button>
//         </div>
//     );
// }

// export default PostPayment;







import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function PostPayment() {
    const uu = sessionStorage.getItem("username");
    const location = useLocation();
    const navigate = useNavigate();
    const [claims, setClaims] = useState([]);
    const [amount, setAmount] = useState(location.state?.amount || "");
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 16));
    const [transactionId, setTransactionId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [status, setStatus] = useState("PROCESSED");
    const username = sessionStorage.getItem('username');
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    useEffect(() => {
        getClaims();
    }, []);

    const getClaims = () => {
        fetch("http://localhost:5146/api/Claim")
            .then(res => res.json())
            .then(res => {
                setClaims(res);
            })
            .catch(err => console.log(err));
    };

    const paym = () => {
        const temp_payment = {
            amount,
            paymentDate,
            transactionId,
            paymentMethod,
            status,
            username
        };
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(temp_payment)
        };

        fetch("http://localhost:5146/api/Payment", requestOptions)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(res => {
                console.log(res);
                setIsPaymentSuccessful(true); // Set success message to display
                setTimeout(() => {
                    navigate('/welcome/{uu}'); // Redirect to Welcome page after a delay
                }, 3000); // Adjust delay as needed
            })
            .catch(err => {
                console.log(err);
                // Optionally handle the error
            });
    };

    return (
        <div className="alert alert-success divregister">
            {isPaymentSuccessful ? (
                <div className="payment-success-message">
                    Your payment is successful, and your policy is now active. You will be redirected shortly.
                </div>
            ) : (
                <>
                    <label className="form-control">Amount</label>
                    <input className="form-control" type="number" value={amount} readOnly />

                    <label className="form-control">Payment Date</label>
                    <input className="form-control" type="datetime-local" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />

                    <label className="form-control">Transaction ID</label>
                    <input className="form-control" type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />

                    <label className="form-control">Payment Method</label>
                    <select className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">--select payment method--</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash">Cash</option>
                    </select>

                    <button onClick={paym} className="btn btn-success">Submit Information</button>
                    <button className="btn btn-danger">Cancel</button>
                </>
            )}
        </div>
    );
}

export default PostPayment;
