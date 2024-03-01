// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import backgroundImage from './Login.jpg'; // Importing the image

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loggedin, setLoggedin] = useState(false);
  
//   var navigate = useNavigate();

//   const login = (e) => {
//     e.preventDefault();
//     const user = {
//       username: username,
//       password: password,
//       role: "",
//       token: ""
//     };

//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user)
//     };

//     fetch("http://localhost:5146/api/User/Login", requestOptions)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return res.json();
//       })
//       .then(res => {
//         sessionStorage.setItem("token", res.token);
//         sessionStorage.setItem("username", res.username);
//         sessionStorage.setItem("role", res.role);
//         alert("Login success - " + res.username + ", Role: " + res.role);
//         // window.location.reload();
//         // navigate('/welcome/' + res.username);
//         // setLoggedin(true);
//         sessionStorage.setItem("loginSuccess", "true");

//   // Refresh the page after successful login
//   window.location.reload();

//   setLoggedin(true);
//       })
//       .catch(err => {
//         console.error(err);
//         alert("Login failed");
//         setLoggedin(false);
//       });
//   };
//   const styles = {
//     // container: {
//     //   backgroundColor: "#e9eff1",
//     //   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     //   color: "#4a4a4a",
//     //   display: "flex",
//     //   justifyContent: "center",
//     //   alignItems: "center",
//     //   height: "100vh",
//     //   width: "100%",
//     //   marginTop: '-140px',
//     // },
//     // divLogin: {
//     //   maxWidth: "400px",
//     //   margin: "50px auto",
//     //   padding: "20px",
//     //   backgroundColor: "rgb(237, 230, 244)", // Custom color for the card
//     //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     //   borderRadius: "8px",
//     //   width: "90%", // Responsive width
//     // },
//     // container: {
//     //   backgroundColor: "rgba(233, 239, 241, 0.8)", // Adjust the alpha value for desired transparency
//     //   backgroundImage: `url(${backgroundImage})`, // Using the imported image
//     //   backgroundSize: "cover", // Ensure the background covers the div
//     //   backgroundPosition: "center", // Center the background image
//     //   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     //   color: "#4a4a4a",
//     //   display: "flex",
//     //   justifyContent: "center",
//     //   alignItems: "center",
//     //   height: "100vh",
//     //   width: "100%",
//     //   marginTop: '-140px',
//     // },
//     // divLogin: {
//     //   maxWidth: "400px",
//     //   margin: "50px auto",
//     //   padding: "20px",
//     //   backgroundColor: "rgb(237, 230, 244)", // Consider adjusting for better visibility against the background image
//     //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     //   borderRadius: "8px",
//     //   width: "90%", // Responsive width
//     // },
//     // formControl: {
//     //   marginBottom: "20px",
//     //   padding: "10px",
//     //   border: "1px solid #cccccc",
//     //   borderRadius: "4px",
//     //   width: "100%",
//     //   boxSizing: "border-box",
//     // },
//     // btnSuccess: {
//     //   backgroundColor: "#6c5ce7", // Custom color for the login button
//     //   color: "white",
//     //   padding: "10px 20px",
//     //   border: "none",
//     //   borderRadius: "4px",
//     //   cursor: "pointer",
//     //   fontSize: "16px",
//     //   textTransform: "uppercase",
//     //   letterSpacing: "1px",
//     //   fontWeight: "bold",
//     //   outline: "none",
//     //   width: "100%", // Ensuring the button stretches to full width of its parent
//     //   marginTop: "10px", // Add some margin top for spacing
//     // },
//     // btnDanger: {
//     //   backgroundColor: "#f44336",
//     //   color: "white",
//     //   padding: "10px 20px",
//     //   border: "none",
//     //   borderRadius: "4px",
//     //   cursor: "pointer",
//     //   fontSize: "16px",
//     //   width: "100%", // Ensuring the button stretches to full width of its parent
//     //   marginTop: "10px", // Add some margin top for spacing
//     // },
//     // alert: {
//     //   padding: "15px",
//     //   marginBottom: "20px",
//     //   border: "1px solid transparent",
//     //   borderRadius: "4px",
//     // },
//     // alertSuccess: {
//     //   color: "#3c763d",
//     //   backgroundColor: "#dff0d8",
//     //   borderColor: "#d6e9c6",
//     // },
//     // alertPrimary: {
//     //   color: "#004085",
//     //   backgroundColor: "#cce5ff",
//     //   borderColor: "#b8daff",
//     // }
//     container: {
//       backgroundImage: `url(${backgroundImage})`, // Using the imported image
//       backgroundSize: "cover", // Ensure the background covers the div
//       backgroundPosition: "center", // Center the background image
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       color: "#4a4a4a",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       width: "100%",
//       marginTop: '-140px',
//       backgroundColor: "rgba(233, 239, 241, 0.8)", // Background color with transparency
//   },
//   divLogin: {
//       maxWidth: "400px",
//       margin: "50px auto",
//       padding: "20px",
//       backgroundColor: "rgba(237, 230, 244, 0.8)", // Adjusted for transparency
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       borderRadius: "8px",
//       width: "90%", // Responsive width
//   },
//   formControl: {
//       marginBottom: "20px",
//       padding: "10px",
//       border: "1px solid #cccccc",
//       borderRadius: "4px",
//       width: "100%",
//       boxSizing: "border-box",
//       backgroundColor: "rgba(255, 255, 255, 0.5)", // Input background with transparency
//   },
//   btnSuccess: {
//       backgroundColor: "rgba(108, 92, 231, 0.8)", // Button background with transparency
//       color: "white",
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "16px",
//       textTransform: "uppercase",
//       letterSpacing: "1px",
//       fontWeight: "bold",
//       outline: "none",
//       width: "100%", // Ensuring the button stretches to full width of its parent
//       marginTop: "10px", // Add some margin top for spacing
//   },
//   btnDanger: {
//       backgroundColor: "rgba(244, 67, 54, 0.8)", // Button background with transparency
//       color: "white",
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "16px",
//       width: "100%", // Ensuring the button stretches to full width of its parent
//       marginTop: "10px", // Add some margin top for spacing
//   },
//   alert: {
//       padding: "15px",
//       marginBottom: "20px",
//       border: "1px solid transparent",
//       borderRadius: "4px",
//       backgroundColor: "rgba(255, 255, 255, 0.8)", // Alert background with transparency
//   },
//   alertSuccess: {
//       color: "#3c763d",
//       backgroundColor: "rgba(223, 240, 216, 0.8)", // Success alert background with transparency
//       borderColor: "#d6e9c6",
//   },
//   alertPrimary: {
//       color: "#004085",
//       backgroundColor: "rgba(204, 229, 255, 0.8)", // Primary alert background with transparency
//       borderColor: "#b8daff",
//   }
//   };

// //   return (
// //     <div style={styles.container}>
// //       {loggedin ? <div style={{ ...styles.alert, ...styles.alertSuccess }}>Welcome, you have successfully logged in - {username}</div> : null}
// //       <div style={{ ...styles.alert, ...styles.alertPrimary, ...styles.divLogin }}>
// //         <form onSubmit={login}>
// //           <input placeholder='Enter your Username' style={styles.formControl} type="text" value={username}
// //             onChange={(e) => setUsername(e.target.value)} />
// //           <input placeholder='Enter your Password' style={styles.formControl} type="password" value={password}
// //             onChange={(e) => setPassword(e.target.value)} />
// //           <button type="submit" style={styles.btnSuccess}>Login</button>
// //           <button type="button" style={styles.btnDanger}>Cancel</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// return (
//   <div style={styles.container}>
//     {loggedin ? <div style={{ ...styles.alert, ...styles.alertSuccess }}>Welcome, you have successfully logged in - {username}</div> : null}
//     <div style={{ ...styles.alert, ...styles.alertPrimary, ...styles.divLogin }}>
//       <form onSubmit={login}>
//         <input placeholder='Enter your Username' style={styles.formControl} type="text" value={username}
//           onChange={(e) => setUsername(e.target.value)} />
//         <input placeholder='Enter your Password' style={styles.formControl} type="password" value={password}
//           onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit" style={styles.btnSuccess}>Login</button>
//         <button type="button" style={styles.btnDanger}>Cancel</button>
//       </form>
//     </div>
//   </div>
// );
// }

// export default Login;









/* new one from here it starts */




import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login(){
//     const videoStyles = {
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         minWidth: "100%",
//         minHeight: "100%",
//         width: "auto",
//         height: "auto",
//         zIndex: "-1",
//         transform: "translate(-50%, -50%)",
//         opacity: "0.7",
//         filter: "brightness(0.9) contrast(2.1)",
    
//       };

// return (


// <div>
// <video autoPlay loop muted style={videoStyles}>
//           <source src={bgImage} type="video/mp4" />
//         </video>
// </div>




const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  var navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const login = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      role: "",
      token: ""
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    fetch("http://localhost:5146/api/User/Login", requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(res => {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("username", res.username);
        sessionStorage.setItem("role", res.role);
        alert("Login success - " + res.username + ", Role: " + res.role);
        // window.location.reload();
        // navigate('/welcome/' + res.username);
        // setLoggedin(true);
        sessionStorage.setItem("loginSuccess", "true");

  // Refresh the page after successful login
  window.location.reload();

  setLoggedin(true);
      })
      .catch(err => {
        console.error(err);
        alert("Login failed");
        setLoggedin(false);
        setUsername("");
        setPassword("");
      });
  };

  

return(



<>
  <meta charSet="UTF-8" />
  <style
    dangerouslySetInnerHTML={{
      __html: "\n    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');\n*\n{\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Quicksand', sans-serif;\n}\nsection \n{\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 2px;\n  flex-wrap: wrap;\n  overflow: hidden;\n}\nsection::before \n{\n  content: '';\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: #6C5CE7;\n  animation: animate 5s linear infinite;\n}\n@keyframes animate \n{\n  0%\n  {\n    transform: translateY(-100%);\n  }\n  100%\n  {\n    transform: translateY(100%);\n  }\n}\nsection span \n{\n  position: relative;\n  display: block;\n  width: calc(6.25vw - 2px);\n  height: calc(6.25vw - 2px);\n  background: #181818;\n  z-index: 2;\n  transition: 1.5s;\n}\nsection span:hover \n{\n  background: #6C5CE7;\n  transition: 0s;\n}\n\nsection .signin\n{\n  position: absolute;\n  width: 400px;\n  background: #222;  \n  z-index: 1000;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 40px;\n  border-radius: 4px;\n  box-shadow: 0 15px 35px rgba(0,0,0,9);\n}\nsection .signin .content \n{\n  position: relative;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  gap: 40px;\n}\nsection .signin .content h2 \n{\n  font-size: 2em;\n  color: #6C5CE7;\n  text-transform: uppercase;\n}\nsection .signin .content .form \n{\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 25px;\n}\nsection .signin .content .form .inputBox\n{\n  position: relative;\n  width: 100%;\n}\nsection .signin .content .form .inputBox input \n{\n  position: relative;\n  width: 100%;\n  background: #333;\n  border: none;\n  outline: none;\n  padding: 25px 10px 7.5px;\n  border-radius: 4px;\n  color: #fff;\n  font-weight: 500;\n  font-size: 1em;\n}\nsection .signin .content .form .inputBox i \n{\n  position: absolute;\n  left: 0;\n  padding: 15px 10px;\n  font-style: normal;\n  color: #aaa;\n  transition: 0.5s;\n  pointer-events: none;\n}\n.signin .content .form .inputBox input:focus ~ i,\n.signin .content .form .inputBox input:valid ~ i\n{\n  transform: translateY(-7.5px);\n  font-size: 0.8em;\n  color: #fff;\n}\n.signin .content .form .links \n{\n  position: relative;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n}\n.signin .content .form .links a \n{\n  color: #fff;\n  text-decoration: none;\n}\n.signin .content .form .links a:nth-child(2)\n{\n  color: #6C5CE7;\n  font-weight: 600;\n}\n.signin .content .form .inputBox input[type=\"submit\"]\n{\n  padding: 10px;\n  background: #6C5CE7;\n  color: #000;\n  font-weight: 600;\n  font-size: 1.35em;\n  letter-spacing: 0.05em;\n  cursor: pointer;\n}\ninput[type=\"submit\"]:active\n{\n  opacity: 0.6;\n}\n@media (max-width: 900px)\n{\n  section span \n  {\n    width: calc(10vw - 2px);\n    height: calc(10vw - 2px);\n  }\n}\n@media (max-width: 600px)\n{\n  section span \n  {\n    width: calc(20vw - 2px);\n    height: calc(20vw - 2px);\n  }\n}\n body \n{\n  display: flex;\n  background: #000; \n overflow : hidden; \n margin-top: -100px;\n}\n "
        
        
    }}
  />
  <section >
    
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
    <span /> <span /> <span /> <span />




    <div className="signin">
            <div className="content">
                <h2>LogIn</h2>
                <form className="form" onSubmit={login}>
                    <div className="inputBox">
                        <input type="text" required="" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <i>Username</i>
                    </div>
                    <div className="inputBox" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
  <input 
    type={showPassword ? "text" : "password"} 
    required 
    value={password} 
    onChange={(e) => setPassword(e.target.value)}
    style={{ flex: 1, paddingRight: '30px' }} // Adjust padding to avoid overlap
    
  />
  <i>Password</i>
  <button 
    type="button" 
    onClick={togglePasswordVisibility} 
    style={{
      cursor: 'pointer', 
      background: 'transparent', 
      border: 'none', 
      position: 'absolute', 
      right: '10px', // Adjust as needed
      padding: '0',
      outline: 'none', // To remove focus border in some browsers
    }}
    aria-label="Toggle password visibility"
  >
    {showPassword ? '🚫' : '👁️'} {/* Toggle icon based on showPassword state */}
  </button>
</div>



                    <div className="links">
                    <a href="#" style={{textDecoration: 'none'}}>Forgot Password</a> <a href="/register" style={{textTransform: 'uppercase'}}>Register</a>
                    </div>
                    <div className="inputBox">
                        <input type="submit" defaultValue="Login" />
                    </div>
                </form>
            </div>
        </div>

  </section>
</>

);


}
export default Login;