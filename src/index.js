// Dependencies
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
// Packages
import { BrowserRouter, Route, Switch } from "react-router-dom"; // Work with routes
import { Helmet } from "react-helmet"; // Modify header section
import WebFont from "webfontloader"; // To use Google fonts
// let WebFont = require("webfontloader"); // Node import
// Components
import EditExpense from "./components/EditExpense";
import ExpenseList from "./components/ExpenseList";
import ExpensesByCategory from "./components/ExpensesByCategory";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute"; // Contains current user as global variable
// Elements
import ContainerDiv from "./elements/ContainerDiv";
import logoFav from "./images/logo.png";
import Background from "./elements/Background";
// Context
import { AuthProvider } from "./context/AuthContext"; // Authenticate User global context
import { TotalExpenseMonthyProvider } from "./context/TotalExpenseMonthy.Contex"; // Total expenses global context
import BackgroundDarkMode from "./elements/BackgroundDarkMode";
// WebFont package configuration
WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "sans-Serif"],
  },
});

const Index = () => {
  const initialLanguage = "en"
  const [darkMode, setdarkMode] = useState(false)
  const translations = {
    en: {
      headerTitle: "Add Expense",
      buttonCategories: "Categories",
      buttonExpenseList: "Expense List",
      lightCheck: "Light",
      darkCheck: "Dark",
      titleUpdateSection: "Update expense",
      buttonAddExpense: "Add expense ",
      titleExpenseList: "Expense list",
      loadMoreButton: "Load more",
      noExpensesMessage: "No expensives to show yet :(",
      buttonAddExpenseNow: "Add expense now",
      titleExpenseByCategory: "Expense By category",
      loginSectionTitle: "Login Section",
      buttonSignUp: "Signup",
      buttonLoginApp: "Log in app!",
      titleSignUpSection: "SignUp Section",
      buttonLogin: "Login",
      totalExpenseBar: "Total spent in the month:",
      expensiveDescription: "Expensive description",
    },
    es: {
      headerTitle: "Agregar gasto",
      buttonCategories: "Categorias",
      buttonExpenseList: "Lista de gastos",
      lightCheck: "Claro",
      darkCheck: "Oscuro",
      titleUpdateSection: "Actualizar gasto",
      buttonAddExpense: "Agregar gasto",
      titleExpenseList: "Lista de gastos",
      loadMoreButton: "Cargar mas",
      noExpensesMessage: "Aun no hay gastos por mostrar :(",
      buttonAddExpenseNow: "Agregar gasto ahora",
      titleExpenseByCategory: "Gastos por categoria",
      loginSectionTitle: "Sección para ingresar",
      buttonSignUp: "Registrarse",
      buttonLoginApp: "Ingresar a la aplicación!",
      titleSignUpSection: "Sección de registo",
      buttonLogin: "Ingresar",
      totalExpenseBar: "Gasto total mensual:",
      expensiveDescription: "Descripción del gasto",
    }
  }
  const [language, setLanguage] = useState(initialLanguage)
  const [texts, setTexts] = useState(translations[language]) // Load translations.en object as DEFAULT
  // console.log(texts) // Return all object
  const handlerDarkMode = (isTrue) => {
    if (isTrue) {
      return setdarkMode(true)
    } else {
      setdarkMode(false)
    }
  }
  const handleLanguage = (event) => {
    if (event.target.value === "en") {
      setLanguage("en")
      setTexts(translations.en)
    } else {
      setLanguage("es")
      setTexts(translations.es)

    }
  }
  return (



    <>
      <Helmet>
        {/* Change Favicon in all application*/}
        <link rel="shortcut icon" href={logoFav} type="image/x-icon" />
      </Helmet>

      <AuthProvider>
        <TotalExpenseMonthyProvider>
          {/* Wrap main component in a Router-Provider, 'ContainerDiv' is a styled div tag*/}
          <BrowserRouter>
            <ContainerDiv darkMode={darkMode} >
              {/* Switch-tag defines the rendered component once enter on it  */}
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                {/* In private routes 'path="..." is '...restProps, and the children elements are {children} 
              (component to show) */}
                <PrivateRoute path="/category">
                  <ExpensesByCategory darkMode={darkMode} texts={texts} />
                </PrivateRoute>
                <PrivateRoute path="/edit/:id">
                  <EditExpense darkMode={darkMode} texts={texts} />
                </PrivateRoute>
                <PrivateRoute path="/list">
                  <ExpenseList darkMode={darkMode} texts={texts} />
                </PrivateRoute>
                <PrivateRoute path="/">
                  <App handlerDarkMode={handlerDarkMode} darkMode={darkMode} texts={texts} handleLanguage={handleLanguage} />
                </PrivateRoute>
              </Switch>

            </ContainerDiv>
          </BrowserRouter>

        </TotalExpenseMonthyProvider>
      </AuthProvider>
      {
        darkMode ? <BackgroundDarkMode /> : <Background />

      }
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
