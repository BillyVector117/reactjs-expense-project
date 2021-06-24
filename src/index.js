// Dependencies
import React from "react";
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
import MyBackground from "./components/MyBackground";
// Elements
import ContainerDiv from "./elements/ContainerDiv";
import logoFav from "./images/logo.png";
// Context
import { AuthProvider } from "./context/AuthContext"; // Authenticate User global context
import { TotalExpenseMonthyProvider } from "./context/TotalExpenseMonthy.Contex"; // Total expenses global context
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

// WebFont package configuration
WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "sans-Serif"],
  },
});

const Index = () => {
  // Destructuring global variables from Context-API (Theme)

  return (
    <>
      <LanguageProvider>
        <ThemeProvider >
          <Helmet>
            {/* Change Favicon in all application*/}
            <link rel="shortcut icon" href={logoFav} type="image/x-icon" />
          </Helmet>

          <AuthProvider>
            <TotalExpenseMonthyProvider>
              {/* Wrap main component in a Router-Provider, 'ContainerDiv' is a styled div tag*/}
              <BrowserRouter>
                <ContainerDiv >
                  {/* Switch-tag defines the rendered component once enter on it  */}
                  <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    {/* In private routes 'path="..." is '...restProps, and the children elements are {children} 
              (component to show) */}
                    <PrivateRoute path="/category">
                      <ExpensesByCategory />
                    </PrivateRoute>
                    <PrivateRoute path="/edit/:id">
                      <EditExpense />
                    </PrivateRoute>
                    <PrivateRoute path="/list">
                      <ExpenseList  />
                    </PrivateRoute>
                    <PrivateRoute path="/">
                      <App/>
                    </PrivateRoute>
                  </Switch>
                </ContainerDiv>
              </BrowserRouter>

            </TotalExpenseMonthyProvider>
          </AuthProvider>

          <MyBackground />

        </ThemeProvider>
      </LanguageProvider>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
