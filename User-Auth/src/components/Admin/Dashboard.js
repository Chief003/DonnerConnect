import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Profile from "../Profile"; // Assuming Profile component is imported
import Stats from "../Admin/Stats"; // Import the Stats component

const transitionDuration = 300; // Duration of the transition in ms

const AdminDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState('dashboard');
  const [transition, setTransition] = useState(false);

  const handleShowProfile = () => {
    setTransition(true);
    setTimeout(() => {
      setCurrentComponent('profile');
      setTransition(false);
    }, transitionDuration);
  };

  const handleShowDashboard = () => {
    setTransition(true);
    setTimeout(() => {
      setCurrentComponent('dashboard');
      setTransition(false);
    }, transitionDuration);
  };

  useEffect(() => {
    // Cleanup transition state when component unmounts
    return () => setTransition(false);
  }, []);

  const contentWrapperStyle = {
    transition: `opacity ${transitionDuration}ms ease-in-out`,
    opacity: transition ? 0 : 1,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundImage: `url('/images/bg-8.jpg')`, // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh' }}>
      <Navbar /> {/* Fixed Navbar */}
      <Sidebar 
        onShowProfile={handleShowProfile} 
        onShowDashboard={handleShowDashboard} 
      />
      <div style={{ flex: '1', marginLeft: '250px', paddingTop: '88px', paddingLeft: '20px' }}>
        {/* Main content area with transition */}
        <div style={contentWrapperStyle}>
          {currentComponent === 'profile' && <Profile />}
          {currentComponent === 'dashboard' && <Stats />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
