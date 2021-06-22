// Dependencies
import React, { useState, useEffect } from "react";
import fromUnixTime from "date-fns/fromUnixTime"; // get timestamp from UnixTime
import getUnixTime from "date-fns/getUnixTime"; // get abstract date (digits) from timestamp
// Elements
import {
  FilterContainer,
  Form,
  Input,
  BigInput,
  ButtonContainer,
} from "../elements/FormElements";
import { Button } from "../elements/Button";
import { ReactComponent as Plus } from "../images/plus.svg";
import Alert from "../elements/Alert";
// Components
import CategorySelection from "./CategorySelection";
import DatePicker from "./DatePicker";
// Functions
import addExpense from "../firebase/addExpense"; // function when Submit form (access to fireStore)
import editExpense from "../firebase/editExpense"; // function to update a document if is in Edit-Form case
// Hooks
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Context to extract user info.

// 'expense' and 'id' prop is set in edit Form
const ExpenseForm = ({ expense, id, darkMode, texts }) => {
  // Inputs states
  const [inputDescription, setInputDescription] = useState("");
  const [inputValue, setInputValue] = useState("");
  // Category Selection state (Will set in 'CategorySelection' component)
  const [category, setCategory] = useState("House");
  // Date state
  const [date, setDate] = useState(new Date());
  // Alert states to active any alert
  const [alertState, setAlertState] = useState(false);
  const [alert, setAlert] = useState(""); // Alert type and value
  // Extract user object (all credentials) in context (when is loged)
  const { user } = useAuth();
  const history = useHistory();

  // If useEffect condition (If) is true, then it is an Edit Form
  useEffect(() => {
    // Validate if exist any expense (function params/props), if true, will set the state with that values
    if (expense) {
      // console.log('EXPENSE DATA ', expense.userUid) // Only call expense + prop, because its hook returns the expense object
      // If exists, validate main user, asking by current user ID and uID expense (all expense/docs has uid)
      // ('user.uid') is the current user finded from fireStore
      // All this setted data is provided by fireStore collection
      if (expense.userUid === user.uid) {
        // Set each value from the expense to inputs Form
        setInputValue(expense.amount);
        setInputDescription(expense.description);
        setDate(fromUnixTime(expense.date)); // transform from UnixTime to JS date
        setCategory(expense.category);
      } else {
        history.push("/list");
      }
    }
  }, [expense, user, history]);

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "description") {
      setInputDescription(event.target.value);
    } else if (event.target.name === "value") {
      // If user enter a different number character, replace to blank spaces (regular expression)
      setInputValue(event.target.value.replace(/[^0-9.]/g, ""));
    }
  };

  // Submit data form
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(category, inputDescription, inputValue, amount, date); // Input/values verification
    // Parse to Int-float (2 decimal) amount value ($)
    let amount = parseFloat(inputValue).toFixed(2);
    // Validate values (no empty inputs)
    if (inputDescription !== "" && inputValue !== "") {
      // Validate amount is a number type then continue sending data
      if (Number(amount)) {
        // This validation is to check Add-expense-Form and Update-expense-Forn
        if (expense) {
          // console.log(expense, id) // Access to all properties expense and id(params-url)
          editExpense({
            idExpenseToEdit: id,
            category: category,
            description: inputDescription,
            amount: amount, // Parsed-amount
            date: getUnixTime(date), // Send data in unixTime format
          })
            .then(() => {
              history.push("/list");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // Send data to FireStore (Submit form), addExpense() is a firebase function
          addExpense({
            // user object is extracted from Context-API, and contains all user credentials
            userUid: user.uid, // Access to users Universal ID
            category: category,
            description: inputDescription,
            amount: amount, // Parsed-amount
            date: getUnixTime(date), // Send data in unixTime format
          })
            // addExpense() is asyncronous function so accepts promise methods (then, catch)
            // Cleaning states
            .then(() => {
              setCategory("House");
              setInputDescription("");
              setInputValue("");
              setDate(new Date());
              setAlertState(true); // Active alerts
              setAlert({
                type: "success",
                message: "Expense successfully added!",
              }); // set alert props
            })
            .catch((error) => {
              setAlertState(true); // Active alerts
              setAlert({
                type: "error",
                message: "Something went wrong :( , try again",
              }); // set alert props
            });
        }
      } else {
        setAlertState(true); // Active alerts
        setAlert({ type: "error", message: "Incorrect value" }); // set alert props
      }
    } else {
      setAlertState(true); // Active alerts
      setAlert({ type: "error", message: "Please, fill all blank inputs" }); // set alert props
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FilterContainer>
        {/* -DROPDOWN-Send category state to its component */}
        <CategorySelection category={category} setCategory={setCategory} darkMode={darkMode} />
        {/* -DATE PICKER-Send date state (current Date) to its component to rechange date */}
        <DatePicker date={date} setDate={setDate} darkMode={darkMode}/>
      </FilterContainer>
      <div>
        <Input
          type="text"
          name="description"
          id="description"
          placeholder= {texts.expensiveDescription}
          value={inputDescription}
          onChange={handleChange}
          darkMode={darkMode}
        />
        <BigInput
          type="text"
          name="value"
          id="value"
          placeholder="$0.00"
          value={inputValue}
          onChange={handleChange}
          darkMode={darkMode}
        />
        {/* 'ButtonContainer' to center any button */}
        <ButtonContainer>
          {expense ? (
            <Button as="button" primary withIcon type="submit">
              {texts.titleUpdateSection} <Plus />
            </Button>
          ) : (
            <Button as="button" primary withIcon type="submit" bigIcon darkMode={darkMode}>
              {texts.buttonAddExpense} <Plus />
            </Button>
          )}
        </ButtonContainer>
        <Alert
          type={alert.type}
          message={alert.message}
          alertState={alertState}
          setAlertState={setAlertState}
        />
      </div>
    </Form>
  );
};

export default ExpenseForm;
