import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { firestore } from "../firebase"; // Adjust the import path as needed
import { doc, setDoc, getDoc } from "firebase/firestore";
import { DatePicker } from 'antd'; // Import DatePicker from Ant Design
import { useUserAuth } from "../context/UserAuthContext"; // Import the user auth context
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the styles

export const AccountDetailsForm = () => {
  // State for user details
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    birthday: null, // Use null for DatePicker initial value
    gender: "",
    email: "",
    phone: "",
    address: "",
    addressNumber: "",
    city: "",
    constituency: "",
    zip: ""
  });

  const { user } = useUserAuth(); // Get the current user from context

  // Fetch user details from Firestore on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user) return; // Ensure user is logged in

      const userId = user.uid; // Get the user ID from the authenticated user
      const userDocRef = doc(firestore, "users", userId);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Handle date change for Ant Design DatePicker
  const handleDateChange = (date, dateString) => {
    setUserDetails({ ...userDetails, birthday: dateString });
  };

  // Handle phone number change
  const handlePhoneChange = (phone) => {
    setUserDetails({ ...userDetails, phone });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) return; // Ensure user is logged in

    const userId = user.uid; // Get the user ID from the authenticated user
    const userDocRef = doc(firestore, "users", userId);

    try {
      await setDoc(userDocRef, userDetails);
      alert("Details saved successfully.");
    } catch (err) {
      alert("Failed to save details: " + err.message);
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={userDetails.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                  name="lastName"
                  value={userDetails.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <DatePicker
                  onChange={handleDateChange}
                  value={userDetails.birthday ? moment(userDetails.birthday, "MM/DD/YYYY") : null}
                  format="MM/DD/YYYY"
                  placeholder="Select date"
                  className="custom-form-control" // Apply custom class for styling
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={userDetails.gender}
                  onChange={handleChange}
                  defaultValue="0"
                >
                  <option value="0">Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <PhoneInput
                  country={'ke'}
                  value={userDetails.phone}
                  onChange={handlePhoneChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="No."
                  name="addressNumber"
                  value={userDetails.addressNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="City"
                  name="city"
                  value={userDetails.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Select constituency</Form.Label>
                <Form.Select
                  id="constituency"
                  name="constituency"
                  value={userDetails.constituency}
                  onChange={handleChange}
                  defaultValue="0"
                >
                  <option value="0">Constituency</option>
                  <option value="Madaraka">Madaraka</option>
                  <option value="Embakasi East">Embakasi East</option>
                  <option value="Upper Hill">Upper Hill</option>
                  <option value="Karen">Karen</option>
                  <option value="Westlands">Westlands</option>
                  <option value="Kibera">Kibera</option>
                  <option value="Embakasi West">Embakasi West</option>
                  <option value="Embakasi South">Embakasi South</option>
                  <option value="Makadara">Makadara</option>
                  <option value="Imaara Daima">Imaara Daima</option>
                  <option value="Riruta">Riruta</option>
                  <option value="Juja">Juja</option>
                  <option value="Nairobi West">Nairobi West</option>
                  <option value="Kayole">Kayole</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ZIP"
                  name="zip"
                  value={userDetails.zip}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Save All</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default AccountDetailsForm;