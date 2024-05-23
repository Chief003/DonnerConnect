import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const VerifyEmail = () => {
  const { user, sendVerificationEmail } = useUserAuth();

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
      alert("Verification email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Failed to send verification email. Please try again later.");
    }
  };

  return (
    <div className="p-4 box">
      <h2>Email Verification</h2>
      <p>
        A verification email has been sent to <strong>{user?.email}</strong>. Please check your inbox and verify your email address to continue.
      </p>
      <Button onClick={handleResendEmail}>Resend Verification Email</Button>
      <div className="mt-3">
        <Link to="/" className="btn btn-secondary">Back to Login</Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
