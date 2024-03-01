import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


function Menu() {
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");
  const isLoggedIn = sessionStorage.getItem("token") !== null;
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const styles = {
    nav: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      backgroundColor: '#333',
      display: 'flex',
      justifyContent: isMobileView ? 'space-around' : 'center',
      flexWrap: 'wrap',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    navItem: {
      padding: isMobileView ? '10px' : '10px 13px',
      width: isMobileView ? '100%' : 'auto',
      textAlign: isMobileView ? 'center' : 'left',
    },
    navLink: {
      display: 'block',
      padding: '10px 20px',
      textDecoration: 'none',
      color: 'white',
      transition: 'background-color 0.3s ease',
    },
    containerPadding: {
      paddingTop: '70px',
    },
  };

  return (
    <div style={styles.containerPadding}>
      <ul style={styles.nav}>
        {!isLoggedIn ? (
          <>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to='/home'>⌂ Home</Link>
            </li>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to='/login'>➜] Login</Link>
            </li>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to='/register'>✎ Register</Link>
            </li>
            
          </>
          
        ) : (
          <>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to='/logout'>Logout</Link>
            </li>
            <li style={styles.navItem}>
              <Link style={styles.navLink} to={`/welcome/${username}`}>Home</Link>
            </li>
            {role === "admin" && (
              <>
                <li style={styles.navItem}>
                  <Link style={styles.navLink} to='/officer'>Officer</Link>
                </li>
                <li style={styles.navItem}>
                  <Link style={styles.navLink} to='/detail'>Detail</Link>
                </li>
                <li style={styles.navItem}>
                  <Link style={styles.navLink} to='/issue'>Issues</Link>
                </li>
                <li style={styles.navItem}>
                  <Link style={styles.navLink} to='/claim/request'>Claim Request</Link>
                </li>
              </>
            )}
            {role === "user" && (
              <li style={styles.navItem}>
                <Link style={styles.navLink} to='/contact'>Contact</Link>
              </li>
            )}
          </>
        )}
      </ul>
      {/* Apply padding to the main content container */}
      <div style={styles.containerPadding}>
        <Outlet />
      </div>
    </div>
  );
}

export default Menu;
