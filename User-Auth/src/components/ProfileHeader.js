import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the path as necessary to your Firebase configuration file
import { useUserAuth } from "../context/UserAuthContext"; // Import the user auth context
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Button, Dropdown, Space } from 'antd'; // Import necessary components from Ant Design

const userInitialState = {
  firstName: '',
  lastName: '',
  avatarUrl: '',
};

const ProfileHeader = () => {
  const [user, setUser] = useState(userInitialState);
  const { user: authUser, logOut } = useUserAuth(); // Get the current user and logOut function from context
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!authUser) {
        console.log("User is not logged in");
        return; // Ensure user is logged in
      }

      const userId = authUser.uid; // Get the user ID from the authenticated user
      console.log("User ID:", userId);

      const userDocRef = doc(firestore, "users", userId);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User Data:", userData);
          setUser(userData);
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, [authUser]);

  if (!authUser) {
    return null; // Don't render anything if the user is not logged in
  }

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleNavigateToTransactions = () => {
    navigate('/user-transactions'); // Navigate to the user transactions page
  };

  const menuItems = [
    {
      key: '1',
      label: 'Back to Home',
      onClick: () => navigate('/home')
    },
    {
      key: '2',
      label: 'Reset Password',
      onClick: handleResetPassword
    },
    {
      key: '3',
      label: 'View History',
      onClick: handleNavigateToTransactions
    },
    {
      key: '4',
      label: 'Logout',
      onClick: handleLogout
    }
  ];

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}
    >
      <Avatar
        src={user.avatarUrl}
        alt={`${user.firstName} ${user.lastName}`}
        sx={{ height: '60px', width: '60px' }}
      />
      <Typography variant="h6" sx={{ fontFamily: 'Arial, sans-serif' }}>
        {user.firstName} {user.lastName}
      </Typography>
      <Space wrap>
        <Dropdown menu={{ items: menuItems }} placement="bottom" arrow>
          <Button>Options</Button>
        </Dropdown>
      </Space>
    </Stack>
  );
};

export default ProfileHeader;
