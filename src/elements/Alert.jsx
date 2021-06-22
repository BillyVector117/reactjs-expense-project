// Dependencies
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
// Elements
import theme from "../theme"; // Contains variable-colors

// 'type' and 'message' are props must be setted when Alert component is called
const Alert = ({ type, message, alertState, setAlertState }) => {
  // useEffect Hook to change 'alertState' by TRUE to FALSE and clear the setTimeOut()
  useEffect(() => {
    let time;
    // Only if alertState is TRUE, Change to FALSE under 4 seconds
    if (alertState === true) {
      time = setTimeout(() => {
        setAlertState(false);
      }, 4000);
    }
    // Clean timeOut
    return () => clearTimeout(time);
    // Only repeat when 'alertState, setAlertState' are changing
  }, [alertState, setAlertState]);
  return (
    <>
      {/* ONLY show AlertContainer (alert component) if  'alertState' props. are TRUE*/}
      {alertState && (
        <AlertContainer type={type}>
          {/* Type will be 'success, error, nothing' */}
          <p>{message}</p>
          {/* The message setted */}
        </AlertContainer>
      )}
    </>
  );
};
export default Alert;

// Animación de desplazamiento hacia abajo
const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;

// Div alert container
const AlertContainer = styled.div`
  z-index: 1000; // Higher level position
  width: 100%;
  left: 0;
  top: 1.25rem; /* 20px up-to-down*/
  position: fixed; // Fixed on screen
  display: flex; // To set elements inside
  justify-content: center; // center the message
  align-items: center;
  animation: ${slideDown} 4s ease forwards; // animaton provided by slideDown component

  // background depends on props. value (red/green/default: black)
  p {
    background: ${(props) => {
      if (props.type === "error") {
        return theme.red;
      } else if (props.type === "success") {
        return theme.green;
      } else {
        return "#000"; // black
      }
    }};
    color: #fff;
    padding: 1.25rem 2.5rem; /* 20px 40px */
    border-radius: 0.31rem; /* 5px */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
`;
