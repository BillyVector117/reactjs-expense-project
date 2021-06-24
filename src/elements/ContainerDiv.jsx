import { useContext } from 'react'
import ThemeContext from "../context/ThemeContext";
import React from 'react'
import ContainerDivStyle from "./ContainerDivStyle";

const ContainerDiv = ({children}) => {
  const { darkMode } = useContext(ThemeContext)
  return (

    <ContainerDivStyle darkMode={darkMode} >
      {children}
    </ContainerDivStyle>
  )
}


export default ContainerDiv;
