// Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage or any other sign of user's session
    sessionStorage.clear();
    // Optionally, you can also set a flag or a message to show the user has been logged out
    // For example, using sessionStorage or state management library

    window.location.href = 'http://localhost:3000/home'; // Redirect to login page after clearing the session
}, []);

  // Optionally, show a message or loader while logging out
  return (
    <div>Logging out...</div>
  );
};

export default Logout;
