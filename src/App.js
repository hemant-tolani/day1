import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Weather from './Weather/Weather';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';
import Error from './Components/Error/Error';
import First from './First';
import Menu from './Components/Menu/Menu';
import PostClaim from './Claim/Claim';
import GetClaim from './Claim/GetClaim';
import FrontClaim from './Claim/FrontClaim';
import FrontPayment from './Payment/FrontPayment';
import GetPayment from './Payment/GetPayment';
import PostPayment from './Payment/PostPayment';
import GetPolicy from './Policy/GetPolicy';
import PostPolicy from './Policy/PostPolicy';
import FrontPolicy from './Policy/FrontPolicy';
import FrontPolicyAddOn from './PolicyAddOn/FrontPolicyAddOn';
import GetPolicyAddOn from './PolicyAddOn/GetPolicyAddOn';
import PostPolicyAddOn from './PolicyAddOn/PostPolicyAddOn';
import FrontVehicleInformation from './VehicleInformation/FrontVehicleInformation';
import GetVehicleInformation from './VehicleInformation/GetVehicleInformation';
import PostVehicleInformation from './VehicleInformation/PostVehicleInformation';
import FrontOfficer from './Officer/FrontOfficer';
import GetOfficer from './Officer/GetOfficer';
import PostOfficer from './Officer/PostOfficer';
import FrontDetail from './Detail/FrontDetail';
import GetDetail from './Detail/GetDetail';
import Welcome from './Components/Welcome/Welcome';
import Logout from './Components/Logout/Logout';
import Register from './Components/RegisterUser/Register';
import GetClaimById from './Claim/GetClaimById';
import Contact from './Components/Contact/Contact';
import Issue from './Components/Contact/Issue';
import PostDocument from './Components/Document/PostDocument';
import RequestClaim from './Claim/RequestClaim';
function App() {
  useEffect(() => {
    // Check if the loginSuccess flag is set in sessionStorage
    const loginSuccess = sessionStorage.getItem("loginSuccess");
    const username = sessionStorage.getItem("username");

    if (loginSuccess === "true") {
      // Clear the flag to prevent unintended redirections in future reloads
      sessionStorage.removeItem("loginSuccess");

      // Use window.location.href for redirection to avoid React Router issues after reload
      window.location.href = `/welcome/${username}`;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
        <Route index element={<First />} />
          <Route path= "home" index element={<First />} />
          <Route path="login" element={<Login />} />
          <Route path="claim" element={<FrontClaim />} />
          <Route path="payment" element={<FrontPayment />} />
          <Route path="policy" element={<FrontPolicy />} />
          <Route path="policyaddon" element={<FrontPolicyAddOn />} />
          <Route path="vehicleinformation" element={<FrontVehicleInformation />} />
          <Route path="officer" element={<FrontOfficer />} />
          <Route path="detail" element={<FrontDetail />} />
          <Route path="register" element={<Register />} />
          <Route path="document/post" element={<PostDocument/> } />
          <Route path="vehicleinformation/post" element={<PostVehicleInformation />} />
          <Route element={<PrivateRoute />}>
            <Route path="weather" element={<Weather />} />
            <Route path="claim/get" element={<GetClaim />} />
            <Route path="claim/post" element={<PostClaim />} />
            <Route path="payment/get" element={<GetPayment />} />
            <Route path="payment/post" element={<PostPayment />} />
            <Route path="policy/get" element={<GetPolicy />} />
            <Route path="policy/post" element={<PostPolicy />} />
            <Route path="policyaddon/get" element={<GetPolicyAddOn />} />
            <Route path="policyaddon/post" element={<PostPolicyAddOn />} />
            <Route path="vehicleinformation/get" element={<GetVehicleInformation />} />
            <Route path="vehicleinformation/post" element={<PostVehicleInformation />} />
            <Route path="officer/get" element={<GetOfficer />} />
            <Route path="officer/post" element={<PostOfficer />} />
            <Route path="detail/get" element={<GetDetail />} />
            <Route path="welcome/:un" element={<Welcome />} />
            <Route path="logout" element={<Logout />} />
            <Route path="/claim/getById" element={<GetClaimById />} />
            <Route path="contact" element={<Contact />} />
            <Route path="issue" element={<Issue />} />
            <Route path="claim/request" element={<RequestClaim />} />
           

          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
