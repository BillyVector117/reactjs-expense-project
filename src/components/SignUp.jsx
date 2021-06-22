// Dependencies
import React, { useState } from "react";
import { Helmet } from "react-helmet"; // Header modifier
import styled from "styled-components";
import { useHistory } from "react-router-dom"; // Redirect to routes
// Configuration
import { auth } from "../firebase/firebaseConfig";
// Elements (Each one is a styled HTML element)
import { Header, Title, HeaderContainer } from "../elements/Header";
import { Button } from "../elements/Button";
import { Form, Input, ButtonContainer } from "../elements/FormElements";
import { ReactComponent as SvgLogin } from "../images/accessLogin.svg";
import Alert from "../elements/Alert";
const SignUp = () => {
  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // Alert states
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState({});
  // initialize history (react-router-dom)
  const history = useHistory();

  // onChange event input
  const handlerChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        // console.log("email: ", email);
        break;
      case "password":
        setPassword(event.target.value);
        // console.log("password: ", password);
        break;
      case "password2":
        setPassword2(event.target.value);
        // console.log("password 2: ", password2);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Verify alert state empty to send with no errors
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
    if (email === "" || password === "" || password2 === "") {
      console.log("Value is empty");
      setAlertState(true);
      setAlert({ type: "error", message: "Value is empty" });
      return;
    }
    if (password !== password2) {
      console.log("Passwords must be the same value");
      setAlertState(true);
      setAlert({ type: "error", message: "Passwords must be the same value" });
      return;
    }
    // Using async/await
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log("user created");
      let message = "user created successfully!";
      setAlertState(true);
      setAlert({ type: "success", message: message });
      // Extra time to show a success message
      setTimeout(() => {
        // Redirect to Home page with react-router-dom method
        history.push("/");
      }, 1000);
    } catch (error) {
      setAlertState(true); // in All cases 'setAlertState' state will be TRUE because there's an error
      let message;
      switch (error.code) {
        case "auth/invalid-password":
          message = "Your password is too short!";
          break;
        case "auth/email-already-in-use":
          message = "E-mail is linked to another account try using other:(";
          break;
        case "auth/invalid-email":
          message = "E-mail incorrect, try another";
          break;
        default:
          message = "Something is wrong while creating your account :( ";
          break;
      }
      console.log(message);
      setAlert({ type: "error", message: message });
    }
  };
  return (
    <>
      <Helmet>
        <title>SignUp | Register</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>SignUp Section</Title>
          <div>
            <Button to="/login">Login</Button>
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
          onChange={handlerChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlerChange}
        />
        <Input
          type="password"
          name="password2"
          placeholder="Repeat your Password"
          value={password2}
          onChange={handlerChange}
        />
        <ButtonContainer>
          {/* primary class to set it primary props */}
          <Button as="button" primary type="submit">
            Create account!
          </Button>
        </ButtonContainer>
      </Form>
      {/* Only show Alert when  'alertState' state is TRUE, 'message and type' are provided 
      by 'alert' state in this module, is re asigned depending on the error 'switch' case*/}
      <Alert
        type={alert.type} // value depending on the state (errors)
        message={alert.message} // value depending on the state (errors)
        alertState={alertState} // False by default
        setAlertState={setAlertState} // To change 'alertState' using useEffect
      />
    </>
  );
};
const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; // 100px
  margin-bottom: 1.25rem; // 20px
`;
export default SignUp;
