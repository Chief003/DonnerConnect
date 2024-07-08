import React, { useRef, useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Popconfirm } from 'antd'; // Import Popconfirm from Ant Design
import { firestore } from '../firebase'; // Adjust the import path as needed
import { doc, getDoc } from 'firebase/firestore';

const HeaderSection = () => {
  const { logOut, user } = useUserAuth(); // Assuming user object is available from context
  const navigate = useNavigate();
  const toast = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setAvatarUrl(userData.avatarUrl || null);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };

    fetchAvatarUrl();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have logged out', life: 3000 });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="Furni navigation bar">
      <div className="container">
        <a className="navbar-brand" href="#">DonorConnect<span>.</span></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsFurni"
          aria-controls="navbarsFurni"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsFurni">
          <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li className="active"><a className="nav-link" href="/home">Home</a></li>
            <li><a className="nav-link" href="#">About us</a></li>
            <li><a className="nav-link" href="#">Contact us</a></li>
          </ul>
          <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
            <li>
              <Link className="nav-link" to="/account">
                {avatarUrl ? (
                  <Avatar image={avatarUrl} size="xlarge" shape="circle" />
                ) : (
                  <Avatar image="" size="xlarge" shape="circle" />
                )}
              </Link>
            </li>
            <li>
              {/* Use Popconfirm from Ant Design */}
              <Popconfirm
                title="Are you sure you want to log out?"
                onConfirm={handleLogout}
                okText="Yes"
                cancelText="No"
              >
                <Button label="Logout" className="p-button-outlined" style={{color:'black',borderRadius:'10px',marginTop:'8px'}}/>
              </Popconfirm>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSection;
