import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css'; // Assuming your CSS file is named App.css. Adjust the import as necessary.
import bgImage from './register.mp4';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const role = "user";
  const [name, setName] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Apply the background image to the body when the component mounts
  //   const originalBackground = document.body.style.background;
  //   document.body.style.background = `url(${image}) no-repeat center center fixed`;
  //   document.body.style.backgroundSize = 'cover';
  //   // Applying a semi-transparent overlay
  //   document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
  //   document.body.style.backgroundBlendMode = 'overlay';

  //   // Revert to the original background when the component unmounts
  //   return () => {
  //     document.body.style.background = originalBackground;
  //   };
  // }, []);
  // Inline styles
  const styles = {
      container: {
        background: "url(${bgImage})",
        backgroundSize: 'cover',
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        alignContent: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        overflow: 'hidden',
        marginTop: '10px',
      },
      card: {
        padding: "20px",
        background: "rgba(237, 230, 244, 0.5)", // Adjusted for semi-transparency
        borderRadius: "10px", // Consistency in design
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Optional: softer shadow for better blending
      },
    cardTitle: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "30px",
      textAlign: "center",
      color: "#333",
      textTransform: 'uppercase',
    },
    formGroup: {
      marginBottom: "20px",
    },
    formLabel: {
      display: "block",
      marginBottom: "10px",
      fontSize: "16px",
      color: "#333",
      fontWeight: "bold",
    },
    formControl: {
      width: "100%",
      padding: "12px 20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
       background: "#F1EAEA",
      marginBottom: "10px", // Added to ensure spacing between inputs
    },
    btnPrimary: {
      display: "block",
      width: "100%",
      padding: "10px 0",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#6c5ce7", // Semi-transparent background
      color: "#ffffff",
      marginTop: "20px", // Adjusted for spacing
    },
    
    alertDanger: {
      color: "#721c24",
      backgroundColor: "#f8d7da",
      border: "1px solid #f5c6cb",
      borderRadius: "4px",
      padding: "10px",
      marginBottom: "20px",
      textAlign: "center",
    },
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
  const register = async () => {
    // Fetch all user details first to check username availability
    try {
      const response = await fetch(`http://localhost:5146/api/Detail`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const userDetails = await response.json();
      // Check if the username is already taken
      const isUsernameTaken = userDetails.some(detail => detail.username === username);
      if (isUsernameTaken) {
        setRegistrationError("Username already taken. Please try another one.");
        return; // Stop the registration process if username is not available
      }

      // Proceed with registration if username is available
      const employee = {
        username,
        password,
        role,
        name,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      };

      const registerResponse = await fetch("http://localhost:5146/api/User", requestOptions);
      if (!registerResponse.ok) {
        throw new Error('Registration failed');
      }
      console.log(await registerResponse.json());
      sessionStorage.setItem('registeredUsername', username);
      navigate('/document/post', { state: { username } }); // Redirect on successful registration

    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationError("Registration failed due to an error. Please try again.");
    }
  };
  return (
    

    <div style={styles.container} className="">
      <video autoPlay loop muted style={videoStyles}>
          <source src={bgImage} type="video/mp4" />
        </video>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Register</h3>
        {registrationError && <div style={styles.alertDanger}>{registrationError}</div>}
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="username">Username</label>
          <input
            style={styles.formControl}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="password">Password</label>
          <input
            style={styles.formControl}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="role">Role</label>
          <select
            style={styles.formControl}
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">--Select Role--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel} htmlFor="name">Name</label>
          <input
            style={styles.formControl}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button style={styles.btnPrimary} type="button" onClick={register}>
          Register
        </button>
      </div>
    </div>
    
  );
}

export default Register;

