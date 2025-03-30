import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "../services/firebase"; // Import Firebase Auth
import { useAuthState } from "react-firebase-hooks/firestore";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to="/" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
