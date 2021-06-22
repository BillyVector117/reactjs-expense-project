import styled from "styled-components";
import { Link } from "react-router-dom"; // to use link in buttons

// Estilisa el componente/enlace "Link" de "react-router-dom"
const Button = styled(Link)`
  // This is a Link tag styled as Button, it allows to receive props
  background: ${(props) => (props.darkMode ? "#030304": props.primary ? "#5B69E2" : "#000")};
  // Si el botón tiene un icono sera un poco mas ancho, mediante sus props obtenemos si tiene icono o no
  width: ${(props) => (props.withIcon ? "15.62rem" : "auto")}; /* 250px */
  margin-left: 1.25rem; /* 20px */
  border: none;
  border-radius: 0.625rem; /* 10px */
  color: #fff;
  font-family: "Work Sans", sans-serif;
  height: 3.75rem; /* 60px */
  padding: 1.25rem 1.87rem; /* 20px 30px */
  font-size: 1.25rem; /* 20px */
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  // inline-flex para usar flex en boton
  display: inline-flex;
  justify-content: space-between; // justificar el espaciado separando los dos elementos (texto e icono)
  align-items: center;
  outline: none;

  // icono .svg dentro del boton
  svg {
    // Si existe la propiedad de bigIcon la altura sera del 100%, si no de 0.75rem
    height: ${(props) => (props.bigIcon ? "100%" : "0.75rem;")}; /* 12px */
    fill: white;
  }
`;
export { Button };
