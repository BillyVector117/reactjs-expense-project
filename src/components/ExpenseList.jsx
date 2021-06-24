// Dependencies
import React, { useContext } from "react";
import { Helmet } from "react-helmet"; // Header modifier
import { Link } from "react-router-dom";
// Elements (Each one is a styled HTML element)
import { Header, Title } from "../elements/Header";
import ButtonReturn from "../elements/ButtonReturn";
import {
  List,
  ListElement,
  Category,
  Description,
  Value,
  Date,
  ButtonAction,
  LoadMoreButton,
  CenterButtonContainer,
  SubtitleContainer,
  Subtitle,
} from "../elements/ListElements";
import CategoryIcon from "../elements/CategoryIcon";
import { ReactComponent as EditIcon } from "../images/editar.svg";
import { ReactComponent as DeleteIcon } from "../images/borrar.svg";
import { Button } from "../elements/Button";
// Context
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
// import { useAuth } from "../context/AuthContext";
// Components
import TotalExpenseBar from "./TotalExpenseBar";
// Hooks
import useGetExpenses from "../hooks/useGetExpenses"; // to get data (is a function / hook)
// Functions
import CurrencyConverter from "../functions/CurrencyConverter"; // Currency converter
import { format, fromUnixTime } from "date-fns"; // format any date with format(), and transform JS-Date to Date with "fromUnixTime"
import { en } from "date-fns/locale"; // English language (default)
import deleteExpense from "../firebase/deleteExpense";

const ExpenseList = () => {
  const { texts } = useContext(LanguageContext)

  const { darkMode } = useContext(ThemeContext)

  // Extract 'user' value from context
  // const { user } = useAuth();
  // const context = useAuth(); // Initialize context hook
  // console.log(user); // This component has access to User
  const [expenses, loadMoreExpenses, WillLoadMore] = useGetExpenses(); // Execute Hook call to get all user documents
  // console.log(expenses);

  // Format date function
  const dateFormat = (date) => {
    // return fromUnixTime(date); // Returns from UnixTime to JavaScript Date
    return format(fromUnixTime(date), "MMM dd, yyyy", {
      locale: en /* Here is your Language*/,
    }); // transform from JavaScript date to Legiable Date
  };

  // Recognize the same Date in documents/expenses
  // Params: 1: Array list, 2: current Element Index, 3: expense info.
  const equalDate = (expenses, index, expense) => {
    // Only continue if index is different to 0, (the 1st element no count) NEED AT LEAST TWO DOCUMENTS
    if (index !== 0) {
      // Get previous/current date (in UnixTime format) and format with a previous function
      const currentDate = dateFormat(expense.date); // Get the date of each document
      const previousDate = dateFormat(expenses[index - 1].date); // Get the previous document date
      // console.log("DATES:", currentDate, previousDate); // Show the current/previous date

      if (currentDate === previousDate) {
        return true; // This functions return TRUE if current/previous date are the same
      } else {
        return false; // Return false if current/previous date are different
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Expense list</title>
      </Helmet>
      <Header darkMode={darkMode} >
        <ButtonReturn />
        <Title>{texts.titleExpenseList}</Title>
      </Header>
      {/* -Document/expenses iteration- Like container <<ul>> element*/}
      <List>
        {expenses.map((expense, index) => {
          return (
            <div key={expense.id}>
              {/* Show Date if 'equalDate' IS ONLY FALSE (1 date per equal documents date to avoid repetead dates) */}
              {!equalDate(expenses, index, expense) && (
                <Date>{dateFormat(expense.date)}</Date>
              )}
              <ListElement key={expense.id}>
                {/* <<li>> element */}
                <Category darkMode={darkMode}>
                  {/* Icon container */}
                  <CategoryIcon name={expense.category} />
                  {/* CategoryIcon needs a 'name' prop. to get the icon */}
                  {expense.category}
                </Category>
                {/* description container */}
                <Description darkMode={darkMode} >{expense.description}</Description>
                <Value darkMode={darkMode}>
                  {/* value/amount container */}
                  {CurrencyConverter(expense.amount)}
                </Value>
                {/* Buttons container */}
                <CenterButtonContainer>
                  {/* Styled button 1 (act as custom Link*/}
                  <ButtonAction as={Link} to={`/edit/${expense.id}`}>
                    <EditIcon />
                  </ButtonAction>
                  {/* Styled button 2*/}
                  <ButtonAction onClick={() => deleteExpense(expense.id)}>
                    <DeleteIcon />
                  </ButtonAction>
                </CenterButtonContainer>
              </ListElement>
            </div>
          );
        })}
        {WillLoadMore && (
          <CenterButtonContainer>
            {/* Center Button container (Only appears if there are more documents) */}
            <LoadMoreButton onClick={loadMoreExpenses}>
              {texts.loadMoreButton}
            </LoadMoreButton>
          </CenterButtonContainer>
        )}

        {/* Validate if expenses length is 0 so will show a message */}
        {expenses.length === 0 && (
          /* Show a Link-Button which redirect to Home page */
          <SubtitleContainer>
            <Subtitle>{texts.noExpensesMessage}</Subtitle>
            <Button as={Link} to="/">
              {texts.buttonAddExpenseNow}
            </Button>
          </SubtitleContainer>
        )}
      </List>
      <TotalExpenseBar/>
    </>
  );
};

export default ExpenseList;
