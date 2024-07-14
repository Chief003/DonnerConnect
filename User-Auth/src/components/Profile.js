import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useUserAuth } from '../context/UserAuthContext';
import { ref, get, set } from 'firebase/database';
import { database } from '../firebase';
import ProfileHeader from './ProfileHeader';
import AccountDetailsForm from './AccountDetailsForm';
import AccountInfo from './AccountInfo';

const Profile = () => {
  const { user } = useUserAuth();
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    constituency: '',
    zip: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const userRef = ref(database, 'users/' + user.uid + '/accountDetails');
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserDetails(snapshot.val());
        } else {
          console.log('No data available');
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  const saveUserDetails = async (details) => {
    if (user) {
      const userRef = ref(database, 'users/' + user.uid + '/accountDetails');
      await set(userRef, details);
    }
  };

  return (
    <Container className="bg-image" style={{
      backgroundImage: `url('/images/bg-8.jpg')`, // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensures background covers entire viewport height
      paddingTop: '80px' // Adjust padding as needed
    }}>
      <Row>
        <Col lg={8} md={10} xs={12}>
          <AccountDetailsForm 
            userDetails={userDetails}
            saveUserDetails={saveUserDetails}
          />
        </Col>
        <Col lg={4} md={6} xs={12}>
          <AccountInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
