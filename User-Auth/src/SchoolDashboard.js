// AdminDashboard.js
import React, { useState } from "react";
import Navbar from "../Admin/Navbar";
import Sidebar from "../Admin/Sidebar";
import Profile from "../Profile"; // Assuming Profile component is imported


const SchoolAminDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  

  const handleShowProfile = () => {
    setShowProfile(true);
    
  };

  const handleShowDashboard = () => {
    setShowProfile(false);
  
  };

  const handleShowUsers = () => {
    setShowProfile(false);
    
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar /> {/* Fixed Navbar */}
      <Sidebar 
        onShowProfile={handleShowProfile} 
        onShowDashboard={handleShowDashboard} 
        
      />
      <div style={{ flex: '1', marginLeft: '250px', paddingTop: '88px', paddingLeft: '20px' }}>
        {/* Main content area */}
        {showProfile && <Profile />}
        {!showProfile && <div>Main Dashboard Content</div>}
        
      </div>
    </div>
  );
};

export default SchoolAminDashboard;
