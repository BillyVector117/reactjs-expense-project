// Dependencies
import React from "react";
import styled from "styled-components";
// Elements
import theme from "../theme";
import AmountFormat from "../functions/CurrencyConverter"; //currency converter
// Context
import { useTotalExpenseMonthyContext } from "../context/TotalExpenseMonthy.Contex"; // Access global state of TotalExpense

const TotalExpenseBar = ({texts}) => {
  const { total } = useTotalExpenseMonthyContext(); // Extract a value from Context main
  // console.log(total)
  // Use 'total' value in this component
  return (
    <TotalBar>
      <p>{texts.totalExpenseBar} </p>
      <p>{AmountFormat(total)}</p>
    </TotalBar>
  );
};
const TotalBar = styled.div`
  background: ${theme.green};
  font-size: 1.25rem; /* 20px */
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 0.62rem 2.25rem; /* 10px 40px */
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 31.25rem) {
    /* 500px */
    flex-direction: column;
    font-size: 14px;
  }
`;
export default TotalExpenseBar;
