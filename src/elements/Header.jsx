import styled from "styled-components";

const Header = styled.div`
  width: 100%; //100% de ancho
  padding: 2.5rem; /*  padding en los 4 ejes de 40px */
  display: flex; // Para usar flexbox
  justify-content: space-between; // y tener elementos a la izquierda y derecha
  align-items: center; // Centrar elementos verticalmente
  background-color: ${(props) => (props.darkMode ? "#3a3636" : "#fff;")};
  @media (max-width: 60rem) {
    /* 950px */
    justify-content: start; // En dispositivos chicos colocar los elementos solo a la izquierda
  }
`;

const Title = styled.h1`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 2.5rem; /* 40px */
  color: ${(props) => (props.darkMode ? "#f9f9f9" : "#000000;")};
  @media (max-width: 60rem) {
    /* 950px */
    font-size: 2rem; /* En dispositivos pequeños disminuye el tamaño a 32px */
  }
`;

const HeaderContainer = styled.div`
  // Contenedor del header (se colocara titulo, botones, etc)
  width: 100%;
  display: flex;
  justify-content: space-between; // Ancho del 100% y separar elementos con flex-box
  @media (max-width: 60rem) {
    /*en dispositivos menores o iguales a 950px */
    // los elementos seran flex y con columna invertida, centrando los elementos para que queden como "pila"
    flex-direction: column-reverse;
    align-items: center;

    // Los elementos div de este elemento padre...
    & > div {
      display: flex;
      margin-bottom: 1.25rem; /* 20px */
      justify-content: end; // posicionar los elementos al final
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; // Separar espacio de botones
  align-items: center; // centarlos
  
`;
export { Header, Title, HeaderContainer, ButtonContainer };
