import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Color from "./Color/Color";
import { ProfileProvider } from "./context/ProfileContext";
import HomePage from "./HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import RegistrationPage from "./UserLogin/SignUp";
import UserLogin from "./UserLogin/UserLogin";

const App = () => {
  return (
    
    <>
      <ProfileProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route
            path="/color"
            element={
              <ProtectedRoute>
                <Color />
              </ProtectedRoute>
            }
          />
          {/* <Route path ="/admin/random-numbers" element={<AdminRandomNumbers />} />
        <Route path ="/admin/manage-bets" element={<GetBetData />} />
        <Route path ="/admin/refaral-codes" element={<AdminReferralCodes />} />
        <Route path ="/admin/login" element={<AdminLogin />} />
        <Route path ="/admin/dashboard" element={<DashBoard />} /> */}
        </Routes>
      </ProfileProvider>
    </>
  );
};

export default App;
