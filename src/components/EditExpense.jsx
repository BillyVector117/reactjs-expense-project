// Dependencies
import React, { useContext } from "react";
import { Helmet } from "react-helmet"; // Header modifier
// Elements (Each one is a styled HTML element)
import { Header, Title } from "../elements/Header";
import ButtonReturn from "../elements/ButtonReturn";
// Components
import TotalExpenseBar from "./TotalExpenseBar";
import ExpenseForm from "./ExpenseForm";
// Hooks
import { useParams } from "react-router-dom";
import useGetExpense from "../hooks/useGetExpense";
import LanguageContext from "../context/LanguageContext";

const EditExpense = () => {
  const { texts } = useContext(LanguageContext) 

  const { id } = useParams(); // URL params (/:id)
  const [expense] = useGetExpense(id); // returns the specified expense/doc. with its info.
  // console.log(expense)
  return (
    <>
      <Helmet>
        <title>Update expense</title>
      </Helmet>
      <Header>
        <ButtonReturn route="/list" />
        <Title>{texts.titleUpdateSection}</Title>
      </Header>
      <ExpenseForm expense={expense} id={id}  />
      <TotalExpenseBar />
    </>
  );
};

export default EditExpense;
