import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
// Make context
const AuthContext = React.createContext();

// Access context as hook
const useAuth = () => {
  return useContext(AuthContext);
};

// Provider receive children elements (components) in Index.js
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); // State to loged user
  const [loaded, setLoaded] = useState(true); // To know when onAuthStateChanged() ends
  // Execute validation once
  useEffect(() => {
    // Validate if user exist/have an account
    const cancelSubscription = auth.onAuthStateChanged((user) => {
      setUser(user); // If an user is loged, change state to true, else throw Null
      setLoaded(false);
    });
    return cancelSubscription;
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>
      {/* Only show 'children' components when 'loaded' state is FALSE*/}
      {!loaded && children}
    </AuthContext.Provider>
  );
};

// Export Context, Provider and the shorcut function to this AuthContext
export { AuthProvider, AuthContext, useAuth };
