import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from './document.mp4';

function PostVehicleInformation(){
    var [make, setMake] = useState("");
    var [model, setModel] = useState("");
    var [year, setYear] = useState("");
    var [vin, setVin] = useState("");
    var [licensePlate, setLicensePlate] = useState("");
    var [color, setColor] = useState("");
    var [policyId, setPolicyId] = useState("");
    var [status, setStatus] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");
    var [purchaseDate, setPurchaseDate] = useState(new Date());
    var [purchasePrice, setPurchasePrice] = useState("");
    const username = sessionStorage.getItem('registeredUsername');
    const navigate = useNavigate(); // For redirection

    const vi = () => {
        const temp_vehicleinformation = {
            make,
            model,
            year,
            vin,
            licensePlate,
            color,
            policyId: null, // Assuming this should be set to null as per your code
            status: "APPROVED",
            purchaseDate,
            purchasePrice,
            username: sessionStorage.getItem('registeredUsername'),
        };

        fetch("http://localhost:5146/api/VehicleInformation", {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(temp_vehicleinformation)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to save vehicle information');
            }
            return res.json();
        })
        .then(res => {
            console.log(res);
            // Set submission message and schedule redirection
            setSubmissionMessage("Successfully saved all information, kindly login. Wait for 5 seconds you will automatically get redirected.");
            setTimeout(() => {
                navigate('/login');
                sessionStorage.clear();
            }, 5000); // Redirect after 5 seconds
        })
        .catch(err => {
            console.error(err);
            // Optionally, handle/display errors here
        });
    };
  
    var changename =(eventargs)=>{
        setMake(eventargs.target.value)
    }

    const styles = {
        container: {
            backgroundColor: "rgb(237, 230, 244)",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            width: "100%", // Responsive width
            margin: "0 auto", // Centering the form
        },
        formControl: {
            width: "100%",
            padding: "6px",
            marginBottom: "8px",
            fontSize: "14px",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            color: "#495057",
            backgroundColor: "#fff",
        },
        button: {
            fontSize: "14px",
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "5px",
            marginRight: "5px",
        },
        btnSuccess: {
            backgroundColor: "#6c5ce7",
            color: "#fff",
        },
        btnDanger: {
            backgroundColor: "#dc3545",
            color: "#fff",
        },
        alertInfo: {
            padding: "8px",
            borderRadius: "4px",
            marginTop: "10px",
            backgroundColor: "#d1ecf1",
            color: "#0c5460",
        }
    };
    const videoStyles = {
        position: "fixed",
        top: "50%",
        left: "50%",
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: "-1",
        transform: "translate(-50%, -50%)",
        opacity: "0.7",
        filter: "brightness(0.9) contrast(2.1)",
    
      };

    return (
        <div style={styles.container}>
            <video autoPlay loop muted style={videoStyles}>
          <source src={bgImage} type="video/mp4" />
        </video>
            <input placeholder='Vehicle Brand' style={styles.formControl} type="text" value={make} onChange={changename} />
            <input placeholder='Vehicle Model' style={styles.formControl} type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            <input placeholder='Year of Vehicle' style={styles.formControl} type="number" value={year} onChange={(e) => setYear(e.target.value)} />
            <input placeholder='VIN Number of Vehicle' style={styles.formControl} type="text" value={vin} onChange={(e) => setVin(e.target.value)} />
            <input placeholder='License Plate of Vehicle' style={styles.formControl} type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
            <input placeholder='Colour of Vehicle' style={styles.formControl} type="text" value={color} onChange={(e) => setColor(e.target.value)} />
            <input placeholder='Date of Purchase' style={styles.formControl} type="datetime-local" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            <input placeholder='Price of Vehicle' style={styles.formControl} type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            <button onClick={vi} style={{ ...styles.button, ...styles.btnSuccess }}>Submit Information</button>
            <button style={{ ...styles.button, ...styles.btnDanger }}>Cancel</button>
            {submissionMessage && <div style={styles.alertInfo}>{submissionMessage}</div>}
        </div>
    );
}

export default PostVehicleInformation;