import React, { useState } from "react";
// Dependencies
import { Helmet } from "react-helmet"; // Header modifier
import styled from "styled-components";
import { useHistory } from "react-router-dom"; // Redirect to routes
// Configuration
import { auth } from "../firebase/firebaseConfig";
// Elements (Each one is a styled HTML element)
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Button } from "../elements/Button";
import { Form, Input, ButtonContainer } from "../elements/FormElements";
import { ReactComponent as SvgLoginForm } from "../images/loginForm.svg";
import Alert from "../elements/Alert";

const Login = () => {
  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Alert states
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});
  // Initialize history (react-router-dom)
  const history = useHistory();

  // Input text function
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Verify Alert state is empty to avoid sending errors
    setAlertState(false);
    setAlert({});
    // Email validations
    const emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailExpression.test(email)) {
      console.log("Enter a correct Email");
      setAlertState(true);
      setAlert({ type: "error", message: "Enter a correct Email" });
      return;
    }
    if (email === "" || password === "") {
      console.log("Value is empty");
      setAlertState(true);
      setAlert({ type: "error", message: "Value is empty" });
      return;
    }
    // Using async/await
    try {
      await auth.signInWithEmailAndPassword(email, password);
      let message = "Logged successfully!";
      setAlertState(true);
      setAlert({ type: "success", message: message });
      setTimeout(() => {
        // Redirect to Home page with react-router-dom
        history.push("/");
      }, 1000);
    } catch (error) {
      setAlertState(true); // in All cases 'setAlertState' state will be TRUE because there's an error
      let message;
      switch (error.code) {
        case "auth/wrong-password":
          message = "Your password is incorrect";
          break;
        case "auth/user-not-found":
          message = "User not found with this E-mail";
          break;
        default:
          message = "Something went wrong :( ";
          break;
      }
      console.log(message);
      setAlert({ type: "error", message: message });
    }
  };

  return (
    <>
      <Helmet>
        <title>SignIn | Login</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Login Section</Title>
          <div>
            <Button to="/signup">Signup</Button>
          </div>
        </HeaderContainer>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />

        <ButtonContainer>
          <Button as="button" primary type="submit">
            Log in app!
          </Button>
        </ButtonContainer>
      </Form>
      {/* Only show Alert when  'alertState' state is TRUE, 'message and type' are provided 
      by 'alert' state in this module, is re asigned depending on the error 'if condition' */}
      <Alert
        type={alert.type} // value depending on the state (errors)
        message={alert.message} // value depending on the state (errors)
        alertState={alertState} // False by default
        setAlertState={setAlertState} // To change 'alertState' using useEffect
      />
    </>
  );
};
const Svg = styled(SvgLoginForm)`
  width: 100%;
  max-height: 12.5rem; // 200px
  margin-bottom: 1.25rem; // 20px
`;
export default Login;
