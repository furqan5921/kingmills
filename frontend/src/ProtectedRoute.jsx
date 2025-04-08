import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [navigate]);

  return <>{children}</>; 
};

export default ProtectedRoute;
