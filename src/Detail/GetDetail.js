import './Detail.css';
import { useState } from "react";
function GetDetail() {
    var [details, setDetails] = useState([{
        "detailId": 0,
        "name": "",
        "department": "",
        "accessLevel": 0,
        "username": "",
        "user": ""
    }]);
    var callAPI = () => {
        fetch("http://localhost:5146/api/Detail")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setDetails(res)
        });
    }

    return (
        <div className="body">
            <button className="btn btn-primary" onClick={callAPI}>Call API</button>
            {details.map((detail) => (
                <div key={detail.detailId} className="card">
                    <h2>ID: {detail.detailId}</h2>
                    <p>Name: {detail.name}</p>
                    <p>Department: {detail.department}</p>
                    <p>Username: {detail.username}</p>
                    <p>Access Level: {detail.accessLevel}</p>
                    <p>User: {detail.user}</p>
                </div>
            ))}
        </div>
    );
}

export default GetDetail;

// function Detail(){
//    var [details,setDetails] = useState([{
//     "detailId": 0,
//     "name": "",
//     "department": "",
//     "accessLevel": 0,
//     "username": "",
//     "user": ""
//     }]);
//     var callAPI = ()=>{
//         fetch("http://localhost:5146/api/Detail")
//         .then(res=>res.json())
//         .then(res=>{
//             console.log(res);
//             setDetails(res)
//         });
//     }
    
//     return(
        
//         <div className="body">
//             <br />
//             <button className="btn btn-primary" onClick={callAPI}>Call API</button>
//             <br />
//             <br />
//             {details.map((detail)=>
//                 <div key={detail.detailId} >
//                     <h2>ID : {detail.detailId}</h2>
//                     <br/>
//                     Name : {detail.name}
//                     <br />
//                     Department : {detail.department}
//                     <br/>
//                     Username : {detail.username}
//                     <br/>
//                     AccessLevel : {detail.accessLevel}
//                     <br/>
//                     User : {detail.user}
//                     <hr/>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Detail;