import { useState, useEffect } from "react";

function Issue() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch("http://localhost:5146/api/Contact")
            .then(res => res.json())
            .then(res => {
                // Filter contacts to include only those with isSolved === "PENDING"
                const pendingContacts = res.filter(contact => contact.isSolved === "PENDING");
                setContacts(pendingContacts);
            })
            .catch(err => console.error("Error fetching contacts:", err));
    };

    const updateContactAsSolved = (username) => {
        // Sending a PUT request to the endpoint configured in your backend
        fetch(`http://localhost:5146/api/Contact/${username}/solve`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify("SOLVED") // Sending the new isSolved status as a string in the request body
        })
        .then(res => {
            if (res.ok) {
                // If the update is successful, filter the contacts to remove the updated one from the UI
                setContacts(prevContacts => prevContacts.filter(contact => contact.username !== username));
            } else {
                throw new Error('Failed to update contact.');
            }
        })
        .catch(err => console.error("Error updating contact:", err));
    };

    // const updateContactAsSolved = (username) => {
    //     // First, update the contact's status to SOLVED
    //     fetch(`http://localhost:5146/api/Contact/${username}/solve`, {
    //         method: 'PUT',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify("SOLVED") // Adjust according to your backend's expected format
    //     })
    //     .then(res => {
    //         if (!res.ok) {
    //             throw new Error('Failed to update contact.');
    //         }
    //         console.log(`Contact ${username} marked as solved.`);
    //         // After successful update, proceed to delete the contact
    //         return fetch(`http://localhost:5146/api/Contact/${username}`, {
    //             method: 'DELETE'
    //         });
    //     })
    //     .then(res => {
    //         if (!res.ok) {
    //             throw new Error('Failed to delete contact.');
    //         }
    //         // After successful deletion, remove the contact from the UI
    //         setContacts(prevContacts => prevContacts.filter(contact => contact.username !== username));
    //         console.log(`Contact ${username} deleted successfully.`);
    //     })
    //     .catch(err => console.error("Error processing contact:", err));
    // };
    

    return (
        <div className="body">
            {contacts.length > 0 ? (
                contacts.map((contact) => (
                    <div key={contact.id} className="card">
                        <h5>Username: {contact.username}</h5>
                        <h6>Problem: {contact.problem}</h6>
                        <button className="btn btn-danger" onClick={() => updateContactAsSolved(contact.username)}>Solve & Delete</button>
                    </div>
                ))
            ) : (
                <p>No issues to display.</p>
            )}
        </div>
    );
}

export default Issue;




// import { useState, useEffect } from "react";

// function Issue() {
//     const [contacts, setContacts] = useState([]);

//     useEffect(() => {
//         fetchContacts();
//     }, []);

//     const fetchContacts = () => {
//         fetch("http://localhost:5146/api/Contact")
//             .then(res => res.json())
//             .then(res => {
//                 // Assuming "isSolved" is a property that indicates if the issue is solved
//                 const pendingContacts = res.filter(contact => contact.isSolved === "PENDING");
//                 setContacts(pendingContacts);
//             })
//             .catch(err => console.error("Error fetching contacts:", err));
//     };

//     const updateContactAsSolved = (username) => {
//         fetch(`http://localhost:5146/api/Contact/${username}/solve`, {
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json'},
//             // Ensure your backend expects the isSolved status in the desired format
//             body: JSON.stringify({ isSolved: "SOLVED" })
//         })
//         .then(res => {
//             if (res.ok) {
//                 console.log(`Contact ${username} marked as solved.`);
//                 // Wait for 1 minute before deleting
//                 setTimeout(() => {
//                     deleteContact(username);
//                 }, 60000); // 60,000 milliseconds = 1 minute
//             } else {
//                 throw new Error('Failed to mark contact as solved.');
//             }
//         })
//         .catch(err => console.error("Error updating contact status:", err));
//     };

//     const deleteContact = (username) => {
//         fetch(`http://localhost:5146/api/Contact/${username}`, {
//             method: 'DELETE'
//         })
//         .then(res => {
//             if (res.ok) {
//                 // Remove the contact from the UI after successful deletion
//                 setContacts(prevContacts => prevContacts.filter(contact => contact.username !== username));
//                 console.log(`Contact ${username} deleted successfully.`);
//             } else {
//                 throw new Error('Failed to delete contact.');
//             }
//         })
//         .catch(err => console.error("Error deleting contact:", err));
//     };

//     return (
//         <div className="body">
//             {contacts.length > 0 ? (
//                 contacts.map((contact) => (
//                     <div key={contact.id} className="card">
//                         <h5>Username: {contact.username}</h5>
//                         <h6>Problem: {contact.problem}</h6>
//                         <button className="btn btn-danger" onClick={() => updateContactAsSolved(contact.username)}>Solve & Delete</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No issues to display.</p>
//             )}
//         </div>
//     );
// }

// export default Issue;
