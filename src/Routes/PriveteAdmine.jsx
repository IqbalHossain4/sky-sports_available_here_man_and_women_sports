import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAdmine from "../Hook/useAdmine";
import Loader from "../Component/Loader/Loader";

const PriveteAdmine = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdmineLoading] = useAdmine();
  const location = useLocation();

  if (loading || isAdmineLoading) {
    return <Loader></Loader>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PriveteAdmine;
