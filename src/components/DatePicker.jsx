// Elements
import theme from "../theme";
// Components
import React from "react";
import styled from "styled-components";
// date-fns and react-day-picker configuration
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

import dateFnsFormat from "date-fns/format"; // Format returns a legible date
import dateFnsParse from "date-fns/parse"; // Parse returns an abstract date

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

// Extract date state from 'ExpenseForm' (date is the 1st date showed)
const DatePicker = ({ date, setDate, darkMode }) => {
  return (
    <InputDatePicker darkMode={darkMode}>
      {/* DayPickerInput is a default calendar component from 'react-day-picker, and accept set props. */}
      {/* value(prop from default input package)=(instead YYY-M-D change to date (extracted prop (new Date))) */}
      {/* onDayChange (prop from default input package) receive a day (changed/selected by the user) and that value is setted to 'date' modifier state from props.*/}
      <DayPickerInput
        value={date}
        onDayChange={(day) => setDate(day)}
        format="MMM dd, yyyy"
        formatDate={formatDate}
        parseDate={parseDate}
        darkMode={darkMode}
        /* There are more changeable props for DayPickerInput, like 'dayPickerProps' we can change
        the language days/months adding as object months: 'month1'...etc */
      />
    </InputDatePicker>
  );
};
const InputDatePicker = styled.div`
  input {
    font-family: "Work Sans", sans-serif;
    box-sizing: border-box;
    background: ${(props) => (props.darkMode ? "#676262eb" : `${theme.greySecondary}`)};
    color: ${(props) => (props.darkMode ? "#ffffff" : "#nnn")};
    border: none;
    cursor: pointer;
    border-radius: 0.625rem; /* 10px */
    height: 5rem; /* 80px */
    width: 100%;
    padding: 0 1.25rem; /* 20px */
    font-size: 1.5rem; /* 24px */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 60rem) {
    /* 950px (responsive style) */
    & > * {
      width: 100%;
    }
  }
`;
export default DatePicker;
