import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from './document.mp4';


function PostDocument() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [filePath, setFilePath] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('registeredUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadedDate = new Date().toISOString();
    const isArchived = false;
    const documentData = {
      name,
      type,
      filePath,
      uploadedDate,
      isArchived,
      username,
    };

    fetch("http://localhost:5146/api/Document/UploadDocument", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documentData),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to upload document');
      }
      return response.json();
    })
    .then((data) => {
      console.log("Document uploaded successfully:", data);
      navigate('/vehicleinformation/post');
    })
    .catch((error) => {
      console.error("Error uploading document:", error);
    });
  };

  // Inline styles
  const styles = {
    container: {
      background: "rgb(237, 230, 244)",
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      maxWidth: '600px',
      margin: '40px auto',
    },
    title: {
      color: '#333',
      fontSize: '24px',
      marginBottom: '20px',
      textTransform: 'uppercase',
    },
    label: {
      fontWeight: '600',
      color: '#555',
      marginBottom: '5px',
      fontWeight: "bold",
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      lineHeight: 1.5,
      color: '#495057',
      backgroundColor: '#fff',
      backgroundClip: 'padding-box',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    button: {
      color: 'white',
      backgroundColor: '#6c5ce7',
      borderColor: '#007bff',
      padding: '10px 15px',
      fontSize: '16px',
      borderRadius: '4px',
      cursor: 'pointer',
      lineHeight: 1.5,
      width: '100%',
      display: 'block',
      marginTop: '16px', // Adjusted for consistency
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
      <h2 style={styles.title}>Upload Document</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="documentName" style={styles.label}>Name</label>
          <input
            type="text"
            id="documentName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="documentType" style={styles.label}>Type</label>
          <input
            type="text"
            id="documentType"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.input}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="filePath" style={styles.label}>File Path</label>
          <input
            type="text"
            id="filePath"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default PostDocument;
