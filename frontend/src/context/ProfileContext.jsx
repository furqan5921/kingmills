import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../baseURL"; // Use axiosInstance instead of axios

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    username: "Demo",
    walletBalance: 0,
    email: "",
    userId: "",
    referalId: "",
  });

  const fetchNameWallet = async () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      console.error("User data not found in localStorage");
      return;
    }
    const objectId = JSON.parse(userData);
    const id = objectId.id; // Extract the user ID
    try {
      const res = await axiosInstance.get(`/api/name/${id}`);
      setProfile({
        userId: id,
        referalId: res.data.referalId,
        email: res.data.email,
        walletBalance: res.data.wallet || 0, // Fix: Use walletBalance
        username: res.data.username,
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchNameWallet();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, fetchNameWallet }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook for using profile context
export const useProfile = () => useContext(ProfileContext);
