// Dependencies
import React, { useContext } from "react";
import { Helmet } from "react-helmet"; // Header modifier
// Elements (Each one is a styled HTML element)
import { Header, Title } from "../elements/Header";
import ButtonReturn from "../elements/ButtonReturn";
import {
  CategoriesList,
  CategoriesListElements,
  Category,
  Value,
} from "../elements/ListElements";
import CategoryIcon from "../elements/CategoryIcon";
// Components
import TotalExpenseBar from "./TotalExpenseBar";
// Hooks
import useGetMonthExpensesByCategory from "../hooks/useGetMonthExpensesByCategory";
//import useGetExpenseByMonth from "../hooks/useGetExpenseByMonth";
// Functions
import currencyConverter from "../functions/CurrencyConverter";
// Context
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";

const ExpensesByCategory = () => {
  const { texts } = useContext(LanguageContext)

  const { darkMode } = useContext(ThemeContext)
  /* const ex = useGetExpenseByMonth(); // Returns an array with expenses of month
  console.log(ex) */
  const expensesByCategory = useGetMonthExpensesByCategory(); // Returns Total expense data/docs/expenses by category
  //console.log(expensesByCategory); // Ex: [{cat:Bank, amount:300},{cat:Food, amount:200}...]
  return (
    <>
      <Helmet>
        <title>Expense category</title>
      </Helmet>

      <Header darkMode={darkMode} >
        <ButtonReturn />
        <Title>{texts.titleExpenseByCategory}</Title>
      </Header>
      {/* <<ul>> */}
      <CategoriesList>
        {/* <<li>> (for each iteration) */}
        {expensesByCategory.map((item, index) => {
          return (
            <CategoriesListElements key={index}>
              {/* <<div>> (category name) */}
              <Category>
                <CategoryIcon name={item.category}></CategoryIcon>
                {item.category}
              </Category>
              {/* <<div>> category total expense amount */}
              <Value>{currencyConverter(item.amount)}</Value>
            </CategoriesListElements>
          );
        })}
      </CategoriesList>
      <TotalExpenseBar />
    </>
  );
};

export default ExpensesByCategory;
