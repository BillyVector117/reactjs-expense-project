import React, { useEffect, useState, useContext } from "react";
// Hooks
// Returns an array with docs./expensses of month, (using Auth and Queries)
import useGetExpenseByMonth from "../hooks/useGetExpenseByMonth";
// Define global Context
const TotalExpenseMonthyContext = React.createContext();

// Create hook to use automatically the context (No necessary, but useful)
const useTotalExpenseMonthyContext = () =>
  useContext(TotalExpenseMonthyContext);

// Define provider
const TotalExpenseMonthyProvider = ({ children }) => {
  let [total, setTotal] = useState(0); // Final Total Expense value
  const monthExpenses = useGetExpenseByMonth();

  useEffect(() => {
    let iteration = 0;
    // console.log(monthExpenses);
    monthExpenses.forEach((expense) => {
      // console.log(expense) // Shows all expenses of month
      iteration += expense.amount;
    });
    // console.log(iteration); // shows result iteration
    setTotal(iteration);
  }, [monthExpenses]);
  return (
    //Sending data to all children components
    <TotalExpenseMonthyContext.Provider value={{ total: total }}>
      {children}
    </TotalExpenseMonthyContext.Provider>
  );
};

// Export the provider and hook/function to use easly
export { TotalExpenseMonthyProvider, useTotalExpenseMonthyContext };
