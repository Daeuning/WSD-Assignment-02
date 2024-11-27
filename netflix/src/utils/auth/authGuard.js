import React from "react";
import { Navigate } from "react-router-dom";

// Higher Order Component for Protected Routes
const AuthGuard = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("TMDb-Key") !== null;

  // If not authenticated, redirect to /signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Render the child component if authenticated
  return children;
};

export default AuthGuard;
