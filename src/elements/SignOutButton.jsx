// Dependencies
import React from "react";
import { auth } from "../firebase/firebaseConfig"; // Auth/SignOut method
import { useHistory } from "react-router-dom";
// Elements
import { ReactComponent as SignOutIcon } from "../images/log-out.svg";
import { Button } from "./Button";

const SignOutButton = () => {
  const history = useHistory(); // Initialize redirection method from 'react-router-dom'
  // Function to LogOut when boton is clicked
  const logOutSesion = async () => {
    try {
      // call to Firebase method 'signOut'
      await auth.signOut();
      history.push("/login"); // Redirection
      console.log("sign out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // Button is  a "Link" component from 'react-router-dom' styled as Button HTML,
    // with a class 'bigIcon' transform Icon to bigger size
    <Button bigIcon as="button" onClick={logOutSesion}>
      <SignOutIcon />
    </Button>
  );
};

export default SignOutButton;
