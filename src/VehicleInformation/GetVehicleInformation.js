// import './GetClaim.css';
import { useState } from "react";
function GetVehicleInformation() {
    var [vehicleinformations, setVehicleInformations] = useState([{
        "vehicleId": 0,
        "make": "",
        "model": "",
        "year": 0,
        "vin": 0,
        "licensePlate": "",
        "color": "",
        "policyId": 0,
        "status": "",
        "purchaseDate": "",
        "purchasePrice": 0

    }]);
    var callAPI = () => {
        fetch("http://localhost:5146/api/VehicleInformation")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setVehicleInformations(res)
        });
    }

    return (
        <div className="body">
            <button className="btn btn-primary" onClick={callAPI}>Call API</button>
            {vehicleinformations.map((vehicleinformation) => (
                <div key={vehicleinformation.vehicleId} className="card">
                    <h2>Vehicle ID: {vehicleinformation.vehicleId}</h2>
                    <p>Make : {vehicleinformation.make}</p>
                    <p>Model: {vehicleinformation.model}</p>
                    <p>Year: {vehicleinformation.year}</p>
                    <p>VIN: {vehicleinformation.vin}</p>
                    <p>License Plate: {vehicleinformation.licensePlate}</p>
                    <p>Color: {vehicleinformation.color}</p>
                    <p>Policy ID: {vehicleinformation.policyId}</p>
                    <p>Status: {vehicleinformation.status}</p>
                    <p>Purchase Date: {vehicleinformation.purchaseDate}</p>
                    <p>Purchase Price: {vehicleinformation.purchasePrice}</p>
                </div>
            ))}
        </div>
    );
}

export default GetVehicleInformation;