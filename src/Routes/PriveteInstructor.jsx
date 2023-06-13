import React from "react";
import Loader from "../Component/Loader/Loader";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useInstructor from "../Hook/useInstructor";

const PriveteInstructor = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, isInsLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInsLoading) {
    return <Loader></Loader>;
  }
  if (user && isInstructor) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PriveteInstructor;
