// Dependencies
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
// Components
import ExpenseForm from "./components/ExpenseForm";
import TotalExpenseBar from "./components/TotalExpenseBar";
// Elements
import {
  Header,
  Title,
  HeaderContainer,
  ButtonContainer,
} from "./elements/Header";
import { Button } from "./elements/Button"; // En realidad es un 'Link' con estilos de botón
import SignOutButton from "./elements/SignOutButton";
import ThemeContext from "./context/ThemeContext";
import LanguageContext from "./context/LanguageContext";
const App = () => {
  const { texts, handleLanguage } = useContext(LanguageContext)
  const { darkMode, handlerDarkMode } = useContext(ThemeContext)

  // Dark mode
  const handleDarkMode = (event) => {
    if (event.target.value === "dark") {
      handlerDarkMode(true)
      // console.log('dark true:', darkMode)
    } else {
      handlerDarkMode(null)
      // console.log('dark false:', darkMode)
    }
  }

  return (
    <>
      <Helmet>
        <title>Home | Add expense</title>
      </Helmet>
      <Header darkMode={darkMode} >
        <select name="language" onChange={handleLanguage} >
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        <div style={{
          justifyContent: "space-between",
          width: "4rem",
          marginLeft: "1rem",
          marginRight: "0.1rem"
        }} >
          <input type="radio" name="theme" id="light" value="light" onClick={handleDarkMode} />
          <label style={{ color: `${darkMode ? "white" : "black"}` }} htmlFor="light"> {texts.lightCheck}</label>
          < br />
          <input type="radio" name="theme" id="dark" value="dark" onClick={handleDarkMode} />
          <label style={{ color: `${darkMode ? "white" : "black"}` }} htmlFor="dark"> {texts.darkCheck}</label>
        </div>
        <HeaderContainer>
          <Title darkMode={darkMode}>{texts.headerTitle}</Title>
          <ButtonContainer>
            <Button to="/category">{texts.buttonCategories}</Button>
            <Button to="/list">{texts.buttonExpenseList}</Button>
            <SignOutButton />
          </ButtonContainer>
        </HeaderContainer>
      </Header>
      <ExpenseForm darkMode={darkMode} texts={texts} /> {/* Main expensive form */}
      <TotalExpenseBar darkMode={darkMode} texts={texts} />
      
    </>
  );
};

export default App;
