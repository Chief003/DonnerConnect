import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button, Form, Alert } from "react-bootstrap";

const LockScreen = ({ onUnlock }) => {
  const { user, logIn } = useUserAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(user.email, password);
      onUnlock();
    } catch (err) {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="lock-screen">
      <div className="lock-screen-content">
        <h2>Session Locked</h2>
        <p>Please enter your password to unlock.</p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleUnlock}>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Unlock
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LockScreen;
