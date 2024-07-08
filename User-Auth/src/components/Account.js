// src/components/Account.js
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ProfileHeader from './ProfileHeader'; // Import ProfileHeader component
import {AccountDetailsForm} from './AccountDetailsForm'; // Adjust import
import {AccountInfo} from './AccountInfo'; // Adjust import
import { useUserAuth } from '../context/UserAuthContext';
import { ref, get, set } from 'firebase/database';
import { database } from '../firebase';

export default function Account() {
  const { user } = useUserAuth();
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (user) {
        const userRef = ref(database, 'users/' + user.uid + '/accountDetails');
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setAccountDetails(snapshot.val());
        } else {
          console.log("No data available");
        }
      }
    };

    fetchAccountDetails();
  }, [user]);

  const saveAccountDetails = async (details) => {
    if (user) {
      const userRef = ref(database, 'users/' + user.uid + '/accountDetails');
      await set(userRef, details);
    }
  };

  return (
    <Stack spacing={3}>
      <ProfileHeader /> {/* Include ProfileHeader component here */}
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <AccountInfo details={accountDetails} />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <AccountDetailsForm onSave={saveAccountDetails} />
        </Grid>
      </Grid>
    </Stack>
  );
}
