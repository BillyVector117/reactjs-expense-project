import React from "react";
// Dependencies
import styled from "styled-components";
import { useHistory } from "react-router-dom"; // Hook to redirect
// Elements
// Import .SVG as component to stylish with styled-components
import { ReactComponent as ArrowIcon } from "../images/flecha.svg";

// This component receive the last visited route if no one, then redirect 'Home' ("/")
const ButtonReturn = ({ route = "/" }) => {
  const history = useHistory();

  return (
    <Btn
      onClick={() => {
        history.push(route); // Use props to return/redirect previous route
      }}
    >
      <Icon />
    </Btn>
  );
};

export default ButtonReturn;

const Btn = styled.button`
  display: block;
  // ----- Icono cuadrado
  width: 3.12rem; /* 50px */
  height: 3.12rem; /* 50px */
  // ----- Icono cuadrado
  line-height: 3.12rem; /* 50px */
  text-align: center;
  margin-right: 1.25rem; /* 20px */
  border: none;
  background: #02f799;
  color: #fff;
  display: flex; // Para centrar icono vertical/horizontal
  align-items: center;
  justify-content: center;
  border-radius: 0.31rem; /* 5px */
  cursor: pointer;

  @media (max-width: 60rem) {
    /* 950px */
    // En dispositivos menores a 950px se reducira su tamaño
    width: 2.5rem; /* 40px */
    height: 2.5rem; /* 40px */
    line-height: 2.5rem; /* 40px */
  }
`;
// Estilisa el componente/.svg de arrow (icono)
const Icon = styled(ArrowIcon)`
  width: 50%;
  height: auto;
  fill: #fff;
`;
