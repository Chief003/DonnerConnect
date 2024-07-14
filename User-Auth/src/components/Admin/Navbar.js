import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEnvelopeOpen, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { FiBell, FiSearch } from 'react-icons/fi'; // Importing icons from react-icons
import { useUserAuth } from "../../context/UserAuthContext"; // Import the user auth context
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { collection, query, orderBy, limit, getDocs, getDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase'; // Adjust the import path as needed
import Profile3 from "./Images/profile-picture-3.jpg";
import useFetchUser from "../useFetchUser"; // Import the custom hook
import moment from 'moment';

export default (props) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0); // State to track unread notifications
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const user = useFetchUser(); // Use the custom hook to get user data
  const navigate = useNavigate(); // Initialize useNavigate
  const { logOut } = useUserAuth();
  
  const fetchNotifications = async () => {
    const transactionsCollectionRef = collection(firestore, 'transactions');
    const transactionsQuery = query(transactionsCollectionRef, orderBy('date', 'desc'), limit(5));
    try {
      const querySnapshot = await getDocs(transactionsQuery);
      const notificationDataArray = [];
      let unreadCount = 0; // Track unread notifications

      for (const docSnapshot of querySnapshot.docs) {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const userDocRef = doc(firestore, 'users', data.userId);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const isRead = data.read || false; // Check if notification is read
            notificationDataArray.push({
              id: docSnapshot.id,
              sender: userData.firstName + " " + userData.lastName,
              image: userData.avatarUrl || Profile3, // Fallback to a default image if avatarUrl is not available
              time: moment(data.date.toDate()).fromNow(),
              message: `${userData.firstName} ${userData.lastName} has contributed Kshs ${data.amount}`,
              read: isRead,
            });

            if (!isRead) {
              unreadCount++; // Increment unread count
            }
          }
        } else {
          console.log('No such document!');
        }
      }

      setNotifications(notificationDataArray);
      setUnreadCount(unreadCount); // Update unread count state
    } catch (error) {
      console.error('Error fetching notification data:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markNotificationsAsRead = () => {
    setTimeout(() => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0); // Mark all notifications as read and reset unread count
      localStorage.setItem('unreadCount', '0');
    }, 300);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const Notification = (props) => {
    const { link, sender, image, time, message, read = false } = props;
    const readClassName = read ? "" : "text-danger";

    return (
      <ListGroup.Item action href={link} style={{ borderBottom: '1px solid #e9ecef' }}>
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src={image} className="user-avatar rounded-circle" style={{ width: '40px', height: '40px' }} />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{sender}</h4>
              </div>
              <div className="text-end">
                <small className={readClassName} style={{opacity: 0.7}}>{time}</small>
              </div>
            </div>
            <p className="font-small mt-1 mb-0" style={{opacity: 0.7}}>{message}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  const handleProfileClick = () => {
    // Navigate to /admin/dashboard when My Profile is clicked
    navigate('/admin');
  };

  return (
    <Navbar variant="dark" expanded style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, backgroundColor: '#343a40', paddingLeft: 0, paddingRight: '0.5rem', paddingBottom: 0 }}>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft:'1050px' }}>
          <Nav style={{ alignItems: 'center', display: 'flex' }}>
            <Dropdown as={Nav.Item} onToggle={markNotificationsAsRead}>
              <Dropdown.Toggle as={Nav.Link} style={{ color: '#fff', marginRight: '1rem', position: 'relative' }}>
                <span style={{ fontSize: '1rem' }}>
                  <FiBell className="bell-shake" />
                  {unreadCount > 0 && (
                    <span style={{ position: 'absolute', right: '-5px', top: '-5px', backgroundColor: '#ff5e5e', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem' }}>{unreadCount}</span>
                  )}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ top: '100%', marginTop: '0.5rem', paddingBottom: 0, paddingTop: 0, minWidth:'320px',left:'-150px', maxHeight: '400px', overflowY: 'auto' }}>
                <ListGroup className="list-group-flush">
                  <Nav.Link href="#" style={{ textAlign: 'center', color: '#007bff', fontWeight: 'bold', borderBottom: '1px solid #e9ecef', padding: '0.75rem 0' }}>
                    Notifications
                  </Nav.Link>

                  {notifications.slice(0, 3).map(n => <Notification key={`notification-${n.id}`} {...n} />)}

                  {!showAllNotifications && notifications.length > 3 && (
                    <Dropdown.Item style={{ textAlign: 'center', color: '#007bff', fontWeight: 'bold', padding: '0.75rem 0' }} onClick={() => setShowAllNotifications(true)}>
                      View all
                    </Dropdown.Item>
                  )}

                  {showAllNotifications && notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />)}
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} style={{ paddingTop: '0.25rem', paddingLeft: 0, paddingRight: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {user ? (
                    <>
                      <Image src={user.avatarUrl} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                      <div style={{ marginLeft: '0.5rem', color: '#fff', displayLgBlock: 'block' }}>
                        <span style={{ marginBottom: 0, fontSize: '0.875rem', fontWeight: 'bold' }}>{user.firstName} {user.lastName}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      
                      <div style={{ marginLeft: '0.5rem', color: '#fff', displayLgBlock: 'block' }}>
                        <span style={{ marginBottom: 0, fontSize: '0.875rem', fontWeight: 'bold' }}>Loading...</span>
                      </div>
                    </>
                  )}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ marginTop: '0.5rem', right: 0, left: 'auto' }}>
                <Dropdown.Item style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleProfileClick}>
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
