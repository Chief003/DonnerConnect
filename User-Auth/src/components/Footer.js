import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import Font Awesome icons
import sofaImg from '../images/sofa.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="mb-5">
          <Col lg={4}>
            <p className="mb-5">Help us build a better future for our children.</p>
            <ul className="list-unstyled custom-social">
              <li><a href="#"><FaFacebook /></a></li> {/* Facebook */}
              <li><a href="#"><FaTwitter /></a></li> {/* Twitter */}
              <li><a href="#"><FaInstagram /></a></li> {/* Instagram */}
              <li><a href="#"><FaLinkedin /></a></li> {/* LinkedIn */}
            </ul>
          </Col>
          <Col lg={4}>
            <h3>Subscribe</h3>
            <div className="subscription-form">
              <Form>
                <Form.Control type="email" placeholder="Email address" />
                <Button type="submit" className="mt-3">Subscribe</Button>
              </Form>
            </div>
          </Col>
          <Col lg={4}>
            <h3>Explore</h3>
            <Row>
              <Col>
                <ul className="list-unstyled">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
