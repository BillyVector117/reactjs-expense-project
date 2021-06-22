import React from "react";
import styled from "styled-components";
// Elements
import { ReactComponent as Puntos } from "../images/puntos.svg"; // Load SVG file as component
const Background = () => {
  return (
    <>
      <PoinstUp />
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="hsla(204,60%,50%,1)"
          fillOpacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,106.7C384,75,480,53,576,74.7C672,96,768,160,864,186.7C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </Svg>
      <PointsBottom />
    </>
  );
};
const Svg = styled.svg`
  height: 50vh;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 0;
  path {
    fill: rgba(135, 182, 194, 0.15);
  }
`;
// Styling 'Puntos' (.svg)
const PoinstUp = styled(Puntos)`
  position: fixed;
  z-index: 1;
  top: 2.5rem; /* 40px */
  left: 2.5rem; /* 40px */
`;

const PointsBottom = styled(Puntos)`
  position: fixed;
  z-index: 1;
  bottom: 2.5rem; /* 40px */
  right: 2.5rem; /* 40px */
`;
export default Background;
