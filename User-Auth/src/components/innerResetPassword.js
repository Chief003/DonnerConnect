// src/components/InnerForgotPassword.js
import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const InnerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! If the email exists in our system, you will receive a password reset email shortly.");
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError("No user found with this email address.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="p-4 box">
      <h2 className="mb-3">Reset Password</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </div>
      </Form>
      <div className="d-grid gap-2 mt-3">
        <Button variant="secondary" onClick={() => navigate('/account')}>
          Back to Profile
        </Button>
      </div>
    </div>
  );
};

export default InnerForgotPassword;
