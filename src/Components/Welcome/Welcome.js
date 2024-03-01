import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import bgImage from './video2.mp4';
import './animation.css';
function Welcome() {
    const navigate = useNavigate();

    // Function to handle navigation
    const handleNavigate = (path) => {
        navigate(path);
    };
    const [claims, setClaims] = useState([]);
    const [userDetails, setUserDetails] = useState(null); // State to hold the fetched user details
    const [payments, setPayments] = useState([]); 
    const [policy, setPolicy] = useState(null);
    const [policyAddOns, setPolicyAddOns] = useState([]);
    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [showApprovedMessage, setShowApprovedMessage] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const [isTabletView, setIsTabletView] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
    const role = sessionStorage.getItem('role'); // Assuming role is stored in sessionStorage
    const [hoveredCard, setHoveredCard] = useState("");
    const [expandedCard, setExpandedCard] = useState(null);
    const [showAdditionalContent, setShowAdditionalContent] = useState(false); // State to toggle between the initial and additional content
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [activeIndex, setActiveIndex] = useState(0); // State to keep track of which additional content to show

    // Function to cycle to the next content
    const nextContent = () => {
      setActiveIndex((current) => (current + 1) % 3); // Cycles through 0, 1, 2, then back to 0
    };
  
    // Function to cycle to the previous content
    const prevContent = () => {
      setActiveIndex((current) => (current + 2) % 3); // Cycles through 2, 1, 0, then back to 2
    };
  
    // Components for the slider
   

    // Function to toggle the expanded card
    const handleToggleCard = (cardName) => {
      setExpandedCard(prevCard => prevCard === cardName ? null : cardName);
    };
    
    const cardStyle = (card) => ({
        padding: "20px",
        margin: "10px",
        textAlign: "center",
        color: hoveredCard === card ? "white" : "black",
        cursor: "pointer",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: hoveredCard === card ? `url(${getCardBackgroundImage(card)})` : "none",
        border: "1px solid #ccc",
        borderRadius: "8px",
        transition: "transform 0.3s ease",
        transform: hoveredCard === card ? "scale(1.05)" : "scale(1)",
      });
    
      const getCardBackgroundImage = (card) => {
        switch (card) {
          case "userDetails":
            return "src\Components\Welcome\claim.jpg";
          case "claims":
            return "/path/to/claims-background.jpg";
          case "payments":
            return "/path/to/payments-background.jpg";
          // Add more cases for other cards
          default:
            return ""; // Default background image or none
        }
      };
    

    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      };
 
    
    
    
    useEffect(() => {
    const handleResize = () => {
        setIsMobileView(window.innerWidth < 768);
        setIsTabletView(window.innerWidth >= 768 && window.innerWidth < 1024);
      };
  
      // Add event listener
      window.addEventListener("resize", handleResize);
  
      window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    useEffect(() => {
     
        const username = sessionStorage.getItem('username'); // Get username from sessionStorage

        const fetchClaims = async () => {
            try {
                const response = await fetch(`http://localhost:5146/api/Claim`);
                if (!response.ok) {
                    throw new Error('Failed to fetch claims information');
                }
                const data = await response.json();
                const userClaims = data.filter(claim => claim.username === username); // Client-side filter
                setClaims(userClaims); // Set the filtered data to state
                const hasApprovedClaim = userClaims.some(claim => claim.status === 'APPROVED');
                if (hasApprovedClaim) {
                    setShowApprovedMessage(true);
                    setTimeout(() => setShowApprovedMessage(false), 5000);
                }
            } catch (error) {
                console.error("Error fetching claims information:", error);
            }
        };
        // Function to fetch user details specifically for the username
        const fetchUserDetails = async () => {
            try {
                // Directly request details for the specific user based on sessionStorage username
                const response = await fetch(`http://localhost:5146/api/Detail?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const data = await response.json();
                // Assuming the API returns an array, filter to ensure matching the username, or adjust based on API response structure
                const detailForUser = data.find(detail => detail.username === username);
                setUserDetails(detailForUser); // Set the fetched data to state
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        const fetchPayments = async () => {
            try {
                const response = await fetch(`http://localhost:5146/api/Payment?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch payment information');
                }
                const data = await response.json();
                const userPayments = data.filter(payment => payment.username === username);
                setPayments(userPayments);
            } catch (error) {
                console.error("Error fetching payment information:", error);
            }
        };

        const fetchPolicy = async () => {
            try {
                const response = await fetch(`http://localhost:5146/api/Policy?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch policy information');
                }
                const data = await response.json();
                // Assuming the API might return multiple policies, adjust as needed
                const userPolicy = data.find(p => p.username === username);
                setPolicy(userPolicy);
            } catch (error) {
                console.error("Error fetching policy information:", error);
            }
        };

        const fetchPolicyAddOns = async () => {
            try {
                const response = await fetch(`http://localhost:5146/api/PolicyAddOn?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch policy add-on information');
                }
                const data = await response.json();
                // Assuming the API returns multiple add-ons; filter for the current user
                const userPolicyAddOns = data.filter(addOn => addOn.username === username);
                setPolicyAddOns(userPolicyAddOns);
            } catch (error) {
                console.error("Error fetching policy add-on information:", error);
            }
        };

        const fetchVehicleInfo = async () => {
            try {
                const response = await fetch(`http://localhost:5146/api/VehicleInformation?username=${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch vehicle information');
                }
                const data = await response.json();
                // Assuming the API returns multiple vehicle information entries; filter for the current user
                const userVehicleInfo = data.filter(vehicle => vehicle.username === username);
                setVehicleInfo(userVehicleInfo);
            } catch (error) {
                console.error("Error fetching vehicle information:", error);
            }
        };


        fetchClaims();
        fetchUserDetails();
        fetchPayments();
        fetchPolicy();
        fetchPolicyAddOns();
        fetchVehicleInfo();
    }, []); // Empty dependency array ensures these effects run once on component mount
    const toggleDetail = (card) => {
        setShowDetail((prevDetails) => ({
          ...prevDetails,
          [card]: !prevDetails[card],
        }));
      };
      const [showDetail, setShowDetail] = useState({
        userDetails: false,
        claimsInfo: false,
        paymentsInfo: false,
        policyInfo: false,
        policyAddOnsInfo: false,
        vehicleInfo: false,
      });
    // Render user details based on the fetched data
    const renderUserDetails = () => {
        // Assuming userDetails state and showDetail state exist
        if (!userDetails) {
          return <p>Loading user details...</p>;
        }
        
        // Check if detailed view for userDetails should be shown
        if (showDetail.userDetails) {
          // Detailed view
          return (
            <div 
              onClick={() => toggleDetail("userDetails")}
              style={{ ...cardStyles, cursor: 'pointer' }} // Reuse cardStyles for consistency and add cursor style
            >
              <h4>User Details</h4>
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Department:</strong> {userDetails.department}</p>
              <p><strong>Access Level:</strong> {userDetails.accessLevel}</p>
              {/* Add more detailed information here as needed */}
            </div>
          );
        } else {
          // Summary view
          return (
            <div 
              onClick={() => toggleDetail("userDetails")}
              style={{ ...cardStyles, cursor: 'pointer' }} // Reuse cardStyles for consistency and add cursor style
            >
              User Details Summary
              {/* Provide a summary or reduced content here */}
            </div>
          );
        }
      };
      
      // const renderUserDetailss = () => {
      //   // Assuming userDetails state and showDetail state exist
      //   if (!userDetails) {
      //     return <p>Loading user details...</p>;
      //   }
        
      //   // Check if detailed view for userDetails should be shown
      //   if (showDetail.userDetails) {
      //     // Detailed view
      //     return (
      //       <div 
      //         onClick={() => toggleDetail("userDetails")}
      //         style={{ ...cardStyles, cursor: 'pointer' }} // Reuse cardStyles for consistency and add cursor style
      //       >
      //         <h4>User Details</h4>
      //         <p><strong>Name:</strong> {userDetails.name}</p>
      //         <p><strong>Department:</strong> {userDetails.department}</p>
      //         <p><strong>Access Level:</strong> {userDetails.accessLevel}</p>
      //         {/* Add more detailed information here as needed */}
      //       </div>
      //     );
      //   } else {
      //     // Summary view
      //     return (
      //       <div 
      //         onClick={() => toggleDetail("userDetails")}
      //         style={{ ...cardStyles, cursor: 'pointer' }} // Reuse cardStyles for consistency and add cursor style
      //       >
      //         User Details Summary
      //         {/* Provide a summary or reduced content here */}
      //       </div>
      //     );
      //   }
      // };
      

      const renderClaimsInfo = () => {
        if (claims.length === 0) {
          return "No claims information available.";
        }
      
        return showDetail.claimsInfo ? (
          <div 
            onClick={() => toggleDetail("claimsInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            {claims.map((claim, index) => (
              <div key={index}>
                <h4>Claims Information</h4>
                <p><strong>Policy ID:</strong> {claim.policyId}</p>
                <p><strong>Claim Type:</strong> {claim.claimType}</p>
                <p><strong>Date of Incident:</strong> {claim.dateOfIncident}</p>
                <p><strong>Date of Claim:</strong> {claim.dateOfClaim}</p>
                <p><strong>Status:</strong> {claim.status}</p>
                <p><strong>Description:</strong> {claim.description}</p>
                <p><strong>Claim Amount:</strong> {claim.claimAmount}</p>
              </div>
            ))}
          </div>
        ) : (
          <div 
            onClick={() => toggleDetail("claimsInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            Claims Info Summary
          </div>
        );
      };

      const renderPaymentsInfo = () => {
        if (payments.length === 0) {
          return <p>No payment information available for this user.</p>;
        }
      
        return showDetail.paymentsInfo ? (
          <div 
            onClick={() => toggleDetail("paymentsInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            {payments.map((payment, index) => (
              <div key={index}>
                <h4>Payment Information</h4>
                <p><strong>Claim ID:</strong> {payment.claimId}</p>
                <p><strong>Amount:</strong> {payment.amount}</p>
                <p><strong>Payment Date:</strong> {payment.paymentDate}</p>
                <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
                <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
                <p><strong>Status:</strong> {payment.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <div 
            onClick={() => toggleDetail("paymentsInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            Payments Info Summary
          </div>
        );
      };
      
      const renderPolicyInfo = () => {
        if (!policy) {
          return <p>No policy information available for this user.</p>;
        }
      
        return showDetail.policyInfo ? (
          <div 
            onClick={() => toggleDetail("policyInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            <h4>Policy Information</h4>
            <p><strong>Policy Number:</strong> {policy.policyNumber}</p>
            <p><strong>Type:</strong> {policy.type}</p>
            <p><strong>Issue Date:</strong> {policy.issueDate}</p>
            <p><strong>Expiry Date:</strong> {policy.expiryDate}</p>
            <p><strong>Premium:</strong> {policy.premium}</p>
            <p><strong>Status:</strong> {policy.status}</p>
            {/* Add more policy details here */}
          </div>
        ) : (
          <div 
            onClick={() => toggleDetail("policyInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            Policy Info Summary
          </div>
        );
      };
      

      const renderPolicyAddOnsInfo = () => {
        if (policyAddOns.length === 0) {
          return <p>No policy add-on information available for this user.</p>;
        }
      
        return showDetail.policyAddOnsInfo ? (
          <div 
            onClick={() => toggleDetail("policyAddOnsInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            <h4>Policy Add-On Information</h4>
            {policyAddOns.map((addOn, index) => (
              <div key={index}>
                <p><strong>Name:</strong> {addOn.name}</p>
                <p><strong>Description:</strong> {addOn.description}</p>
                <p><strong>Price:</strong> {addOn.price}</p>
                <p><strong>Policy ID:</strong> {addOn.policyId}</p>
              </div>
            ))}
          </div>
        ) : (
          <div 
            onClick={() => toggleDetail("policyAddOnsInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            Policy Add-Ons Summary
          </div>
        );
      };
      


      const renderVehicleInfo = () => {
        if (vehicleInfo.length === 0) {
          return <p>No vehicle information available for this user.</p>;
        }
      
        return showDetail.vehicleInfo ? (
          <div 
            onClick={() => toggleDetail("vehicleInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            <h4>Vehicle Information</h4>
            {vehicleInfo.map((vehicle, index) => (
              <div key={index}>
                <p><strong>Make:</strong> {vehicle.make}</p>
                <p><strong>Model:</strong> {vehicle.model}</p>
                <p><strong>Year:</strong> {vehicle.year}</p>
                <p><strong>VIN:</strong> {vehicle.vin}</p>
                <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
                <p><strong>Color:</strong> {vehicle.color}</p>
                <p><strong>Policy ID:</strong> {vehicle.policyId}</p>
                <p><strong>Status:</strong> {vehicle.status}</p>
                <p><strong>Purchase Date:</strong> {vehicle.purchaseDate}</p>
                <p><strong>Purchase Price:</strong> {vehicle.purchasePrice}</p>
              </div>
            ))}
          </div>
        ) : (
          <div 
            onClick={() => toggleDetail("vehicleInfo")}
            style={{ ...cardStyles, cursor: 'pointer' }}
          >
            Vehicle Info Summary
          </div>
        );
      };

      const initialContents = [
        renderUserDetails,
        renderClaimsInfo,
        renderPaymentsInfo,
      ];
      
      const additionalContents = [
        renderPolicyInfo,
        renderPolicyAddOnsInfo,
        renderVehicleInfo,
      ];
    
      // Function to toggle between initial and additional content
      const toggleContent = () => {
        setShowAdditionalContent(!showAdditionalContent);
      };
    

    const adminStyles = {
        container: {
            marginTop: '100px',
        },

        welcomeContainer: {
            fontFamily: 'Arial, sans-serif',
            width: '100%',
            maxWidth: 'none',
            marginTop: '1150px', // Increased margin top for more space
            padding: '20px',
            color: 'white', // Assuming you want the text color to be white for better contrast
            overflow: 'hidden', // Ensuring that the container doesn't clip content
            backgroundColor: '#5E4DB4',
            marginTop: isMobileView ? '270px' : isTabletView ? '-30px' : '-50px', // Adjusted for mobile, tablet, and default views
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center the cards horizontally
            gap: '20px', // Space between cards
            marginBottom: '20px',
        },
        alertSuccess: {
            textAlign: 'center',
            marginBottom: '30px',
            color: 'black',
            backgroundColor: '#AED9E0',
            borderColor: '#c3e6cb',
            padding: '10px',
            borderRadius: '4px',
        },
        contentContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            overflow: 'auto', // Allowing content to be scrollable if it overflows
        },
        infoColumn: {
            flex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        actionColumn: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        },
        card: {
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '20px',
            marginBottom: '20px',
            overflow: 'hidden', // Ensuring content in cards doesn't overflow
            width: '90%', // Make cards take up most of the container width
            maxWidth: '600px', // But don't let them grow too large
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '20px',
            margin: '0 auto', // Center cards horizontally
            display: 'flex',
            flexDirection: 'column',
            gap: '10px', // Space between items in the card
        },
        actionBtn: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#38D2CB',
            color: 'black',
            marginBottom: '15px',
        },
    };
  
    const userStyles = {

        // container: {
        //     // Set a light gray background for the entire page to contrast the cards
        //     backgroundColor: 'black',
        //     minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
        //     paddingTop: isMobileView ? '50px' : isTabletView ? '70px' : '-10px', // Adjust top padding based on the view
        // },

        container: {
            marginTop: '1900px',
        },

        welcomeContainer: {
            fontFamily: 'Arial, sans-serif',
            width: '100%',
            maxWidth: 'none',
            marginTop: isMobileView ? '60px' : isTabletView ? '-70px' : '-70px',
            padding: '20px',
            color: 'white',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
          },
        alertSuccess: {
            textAlign: 'center',
            marginBottom: '30px',
            color: 'black',
            backgroundColor: '#AED9E0',
            borderColor: '#c3e6cb',
            padding: '10px',
            borderRadius: '4px',
        },
        contentContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            overflow: 'auto', // Allowing content to be scrollable if it overflows
        },
        infoColumn: {
            flex: 3,
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
        },
        actionColumn: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        },
        card: {
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '20px',
            marginBottom: '20px',
            overflow: 'hidden', // Ensuring content in cards doesn't overflow
            width: '90%', // Make cards take up most of the container width
            maxWidth: '600px', // But don't let them grow too large
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '20px',
            margin: '0 auto', // Center cards horizontally
            display: 'flex',
            flexDirection: 'column',
            gap: '10px', // Space between items in the card
        },
        actionBtn: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#38D2CB',
            color: 'black',
            marginBottom: '15px',
        },
  };
  const styles = role === 'admin' ? adminStyles : userStyles;

    const username = sessionStorage.getItem('username'); // Get username from sessionStorage
  
// return (
    // <div style={styles.welcomeContainer}>
    // <h1 style={styles.alertSuccess}>Hello - {sessionStorage.getItem('username')}</h1>
    // <div style={styles.contentContainer}>
    //   <div style={styles.infoColumn}>
    //             {renderUserDetails()}
    //             {renderClaimsInfo()}
    //             {renderPaymentsInfo()}
    //             {renderPolicyInfo()}
    //             {renderPolicyAddOnsInfo()}
    //             {renderVehicleInfo()}
    //         </div>
    //         <div style={styles.actionColumn}>
    //       <button style={styles.actionBtn} onClick={() => navigate('/policy')}>
    //                 ADD Policy
    //             </button>
    //             <button style={styles.actionBtn} onClick={() => navigate('/claim')}>
    //                 Retrieve Claim
    //             </button>
    //             <button style={{ ...styles.actionBtn, marginBottom: '0' }} onClick={() => navigate('/policyaddon')}>
    //                 ADD PolicyAddOn
    //             </button>
    //         </div>
    //     </div>
    // </div>
   
// );

// }

// export default Welcome;


// return (
//     <div style={{ position: "relative", width: "100%", height: "100vh" }}>
//       <video autoPlay loop muted style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: -1 }}>
//         <source src="/path/to/your/video.mp4" type="video/mp4" />
//       </video>
//       <div style={{ position: "relative", zIndex: 1, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <h1>Hello, {sessionStorage.getItem("username")}</h1>
//         <div onMouseEnter={() => setHoveredCard("userDetails")} onMouseLeave={() => setHoveredCard("")} style={cardStyle("userDetails")}>
//           User Details
//         </div>
//         <div onMouseEnter={() => setHoveredCard("claims")} onMouseLeave={() => setHoveredCard("")} style={cardStyle("claims")}>
//           Claims Info
//         </div>
//         <div onMouseEnter={() => setHoveredCard("payments")} onMouseLeave={() => setHoveredCard("")} style={cardStyle("payments")}>
//           Payments Info
//         </div>
//         {/* Add more cards as needed */}
//       </div>
//     </div>
//   );
// }

// export default Welcome;

// return (
//     <>
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         overflow: 'hidden',
//         zIndex: -1,
//       }}>
//         <video autoPlay loop muted style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           opacity: 0.5,
//         }}>
//           <source src={bgImage} type="video/mp4" />
//         </video>
//       </div>

//       <div style={styles.welcomeContainer}>
//         <h1 style={styles.alertSuccess}>Hello - {sessionStorage.getItem('username')}</h1>
//         <div style={styles.contentContainer}>
//           <div style={styles.infoColumn}>
//             {renderUserDetails()}
//             {renderClaimsInfo()}
//             {renderPaymentsInfo()}
//             {renderPolicyInfo()}
//             {renderPolicyAddOnsInfo()}
//             {renderVehicleInfo()}
//           </div>
//           <div style={styles.actionColumn}>
//             <button style={styles.actionBtn} onClick={() => navigate('/policy')}>ADD Policy</button>
//             <button style={styles.actionBtn} onClick={() => navigate('/claim')}>Retrieve Claim</button>
//             <button style={{ ...styles.actionBtn, marginBottom: '0' }} onClick={() => navigate('/policyaddon')}>ADD PolicyAddOn</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Welcome;

useEffect(() => {
  // Ensure body can scroll if content exceeds viewport height
  document.body.style.overflow = 'auto';

  return () => {
    // Optionally, clean up by setting overflow to a specific value when the component unmounts
    // document.body.style.overflow = 'hidden'; // Only if you want to restrict scrolling globally after unmount
  };
}, []);


const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    color: "white",
    textAlign: "center",
    
  };

  const buttonRowStyles = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "20px 0",
  };

  const cardContainerStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px",
  };

  const cardStyles = {
    width: "100%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
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
  // const greetingStyles = {
  //   animation: `slideFadeIn 1s ease-out forwards, float 3s ease-in-out 1s infinite`,
  //   marginTop: '-150px',
  //   color: 'black',
  // };

  const greetingStyles = {
   animation: `slideFadeIn 1s ease-out forwards, float 3s ease-in-out 1s infinite`,
    position: 'absolute',
    top: '90px', // Assuming nav bar is 50px high, adjust as needed
    left: '10px',
    zIndex: 2, // Ensure it's above the video
    animation: `slideFadeIn 1s ease-out forwards, float 3s ease-in-out 1s infinite`,
    color: '#8B1212',
    fontWeight: 'bold',
    top: isMobile ? '230px' : '90px', // Adjust based on your nav bar height
    fontFamily: "'Lucida Handwriting', 'Courier New', cursive", // Apply font family
  };

  const buttonStyles = {
    //animation: 'buttonBounce 0.5s ease-in-out infinite',
    animation: "pulse 1.5s infinite",
    cursor: 'pointer',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    border: 'none',
    background: '#D8D03C',
    color: 'black',
    fontWeight: 'bold',
    '@media (max-width: 768px)': { // Tablet and below
      padding: '8px 16px', // Slightly smaller padding for smaller screens
    },
    '@media (max-width: 480px)': { // Mobile
      padding: '6px 12px', // Even smaller padding for mobile screens
    }
  };

  return (
    <>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
      }}>
        <video autoPlay loop muted style={videoStyles}>
          <source src={bgImage} type="video/mp4" />
        </video>
      </div>

      <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}
    </style>
    <div style={{...containerStyles, zIndex: 1}}> {/* Make sure this div is visible above the video */}
      <h1 style={greetingStyles}>Hey... {sessionStorage.getItem('username')}</h1>
      <div style={buttonRowStyles}>
          <button style={buttonStyles} onClick={() => navigate('/policy')}>ADD Policy</button>
          <button style={buttonStyles} onClick={() => navigate('/claim')}>Retrieve Claim</button>
          <button style={buttonStyles} onClick={() => navigate('/policyaddon')}>Add PolicyAddOn</button>
        </div>
        <div style={cardContainerStyles}>
          {/* Display initial or additional content based on the toggle state */}
          {showAdditionalContent ? additionalContents.map((Content, index) => (
            <div key={index} style={cardStyles}>{Content()}</div>
          )) : initialContents.map((Content, index) => (
            <div key={index} style={cardStyles}>{Content()}</div>
          ))}
        </div>
        <br />
        <br />
        <br />
        <button onClick={toggleContent}>{showAdditionalContent ? "Previous" : "Next"}</button>

      </div>
    </>
  );
}

export default Welcome;