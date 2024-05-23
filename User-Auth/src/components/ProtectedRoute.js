import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);

  if (!user) {
    // Redirect the user to the login page if they are not authenticated
    return <Navigate to="/" />;
  }

  if (!user.emailVerified) {
    // Redirect to a page that instructs the user to verify their email
    return <Navigate to="/verify-email" />;
  }

  // Render the children (protected content) if the user is authenticated and email is verified
  return children;
};

export default ProtectedRoute;
