import React from "react";
import { useAuth } from "../context/AuthContext";
import { Route, Redirect } from "react-router-dom";
// PrivateRoute takes children elements (components in index.js), then return that component if pass auth test (only if an user is active)

const PrivateRoute = ({ children, ...restProps }) => {
  const { user } = useAuth();
  // If an user is founded show route content
  if (user) {
    /* '...restProps refers to setted props in index.js to the private route (like classes (in this case path="" is an attribute)) 
    and {children} is the render component */
    return <Route {...restProps}>{children}</Route>;
  } else {
    // Error case: No current users / redirect to login section
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
