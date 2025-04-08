import React, { createContext, useContext, useState } from 'react';

// Create Sidebar Context
const SidebarContext = createContext();

// Custom hook to use Sidebar context
export const useSidebar = () => useContext(SidebarContext);

// Sidebar Provider component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setIsmobileSidebarOpen] = useState(false);


  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  // Toggle sidebar visibility
  const toggleMobileSidebar = () => {
    setIsmobileSidebarOpen(prevState => !prevState);
    // console.log(mobileSidebarOpen)
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, toggleMobileSidebar, mobileSidebarOpen, setIsmobileSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
