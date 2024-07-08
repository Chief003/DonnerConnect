import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { firestore } from '../firebase'; // Adjust the path as necessary to your Firebase configuration file
import { useUserAuth } from "../context/UserAuthContext"; // Import the user auth context

const userInitialState = {
  firstName: '',
  lastName: '',
  birthday: '',
  email: '',
  avatarUrl: '',
  jobTitle: '',
  country: '',
  city: '',
  address: '',
  constituency: '',
};

export function AccountInfo() {
  const [user, setUser] = useState(userInitialState);
  const [avatarUrl, setAvatarUrl] = useState('');
  const { user: authUser } = useUserAuth(); // Get the current user from context

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
          setAvatarUrl(userData.avatarUrl || '');
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, [authUser]);

  const handlePictureUpload = async (event) => {
    if (!authUser) {
      console.log("User is not logged in");
      return; // Ensure user is logged in
    }

    const file = event.target.files[0];
    const lastName = user.lastName || authUser.uid; // Use last name or user ID if last name is not available
    const storageRef = ref(getStorage(), `avatars/${lastName}`); // Always use the same path to overwrite the existing file

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      // Get the URL of the uploaded file
      const url = await getDownloadURL(storageRef);
      setAvatarUrl(url);
      // Update the user's Firestore document with the new avatar URL
      const userDocRef = doc(firestore, "users", authUser.uid);
      await setDoc(userDocRef, { ...user, avatarUrl: url }, { merge: true });
      alert("Avatar updated successfully.");
    } catch (err) {
      alert("Failed to upload avatar: " + err.message);
    }
  };

  return (
    <Card sx={{ borderRadius: 10, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={avatarUrl} sx={{ height: '80px', width: '80px', left:'40px'}} />
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handlePictureUpload}
            />
            <label htmlFor="avatar-upload">
              <Button variant="contained" component="span" style={{top:'5px'}}>
                Upload picture
              </Button>
            </label>
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Arial, sans-serif' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Date of Birth: {user.birthday}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.address}, {user.city}, {user.constituency}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.jobTitle}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
export default AccountInfo;