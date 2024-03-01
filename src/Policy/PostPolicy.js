import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


function PostPolicy() {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate

    const [policyNumber, setPolicyNumber] = useState("");
    const [type, setType] = useState("");
    const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 16)); // Format for datetime-local input
    const [expiryDate, setExpiryDate] = useState(new Date().toISOString().slice(0, 16)); // Format for datetime-local input
    const [premium, setPremium] = useState("");
    const [status, setStatus] = useState("ACTIVE"); // Assuming status is always "ACTIVE" when posting
    const username = sessionStorage.getItem('username');
    const [users, setUsers] = useState([]);
    const policyCode = location.state?.policyCode;

    useEffect(() => {
        console.log("Received policy code:", policyCode); // Check if policyCode is received
        getUsers();
    
        if (policyCode) {
            setPolicyNumber(policyCode);
        }
    }, [location, policyCode]);

    const handleTypeChange = (event) => {
        const selectedType = event.target.value;
        setType(selectedType);
        // Automatically set premium based on type of vehicle
        switch (selectedType) {
            case "car":
                setPremium(500);
                break;
            case "truck":
                setPremium(1000);
                break;
            case "campervan":
                setPremium(1500);
                break;
            default:
                setPremium(""); // Reset or set to default premium if needed
                break;
        }
    };

    const p = () => {
        const temp_policy = {
            policyNumber,
            type,
            issueDate,
            expiryDate,
            premium,
            status,
            username
        };
        console.log(temp_policy);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(temp_policy)
        };
        console.log(requestOptions);

        fetch("http://localhost:5146/api/Policy", requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(res => {
            console.log(res);
            
            navigate('/payment/post', { state: { amount: premium } }); // Pass premium as amount
        })
        .catch(err => {
            console.log(err);
            // Optionally handle the error, maybe set an error state, show a message, etc.
        });
    };


   

    const getUsers = () => {
        fetch("http://localhost:5146/api/Detail")
            .then(res => res.json())
            .then(res => {
                setUsers(res);
                console.log(users);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="alert alert-success divregister">
             <label htmlFor="policyNumber">Policy Number</label>
      <input
        type="text"
        id="policyNumber"
        value={policyNumber}
        onChange={(e) => setPolicyNumber(e.target.value)}
        // Other necessary props
      />

            <label className="form-control">Type of Vehicle</label>
            <select className="form-control" value={type} onChange={handleTypeChange}>
                <option value="">--select type--</option>
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="campervan">Camper Van</option>
            </select>

            <label className="form-control">Issue Date</label>
            <input className="form-control" type="datetime-local" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />

            <label className="form-control">Expiry Date</label>
            <input className="form-control" type="datetime-local" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />

            <label className="form-control">Premium</label>
            <input className="form-control" type="number" value={premium} readOnly />
            <br />

            <button onClick={p} className="btn btn-success">Submit Information</button>
            <button className="btn btn-danger">Cancel</button>
        </div>
    );
}

export default PostPolicy;
