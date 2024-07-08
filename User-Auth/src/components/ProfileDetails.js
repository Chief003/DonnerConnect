import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const ProfileDetails = ({ userDetails, saveUserDetails }) => {
  const [details, setDetails] = useState(userDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUserDetails(details);
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="h5">Account Details</Card.Title>
        <p className="text-sm">Here you can update your account details.</p>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={details.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Also your last name"
                  name="lastName"
                  value={details.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={details.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your home address"
                  name="address"
                  value={details.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="City"
                  name="city"
                  value={details.city}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={details.country}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="constituency">
                <Form.Label>Constituency</Form.Label>
                <Form.Select
                  id="constituency"
                  name="constituency"
                  value={details.constituency}
                  onChange={handleChange}
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
                  value={details.zip}
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

export default ProfileDetails;
