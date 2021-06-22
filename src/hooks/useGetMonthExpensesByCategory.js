import { useState, useEffect } from "react";
// Hooks
import useGetExpenseByMonth from "../hooks/useGetExpenseByMonth"; // Returns an array with monthy data/docs/expense (each doc. in an object)

const useGetMonthExpensesByCategory = () => {
  const [expensesByCategory, setExpensesByCategory] = useState([]); // Final data will store here
  const expensesByMonth = useGetExpenseByMonth(); // Hook call to extract the result data (monthy docs, each doc. in an object)
  // console.log("Monthy Expenses By category (hook): ", expensesByMonth);

  // .reduce method to plus add (++) values in each category, depending on the times the document/expense match with its category
  // 'resultObject' is the modified 'Initial object' (param) from each iteration, 'currentObject' is the current object in iteration
  //'currentObject' is basically each object of 'expensesByMonth' array therefore has properties from 'expensesByMonth' array

  useEffect(() => {
    const sumTotalAmountMonth = expensesByMonth.reduce(
      (resultObject, currentObject) => {
        const currentCategory = currentObject.category; // Save  'category' property of each iteration object from 'expensesByMonth' array
        const currentAmount = currentObject.amount; // Save 'amount' property of each iteration object from 'expensesByMonth' array
        // Modifie 'Initial Object' properties, depending on the matches of each iteration
        // Here will access to a specific propery depending on the object category/amount iteration

        resultObject[currentCategory] += currentAmount;
        return resultObject; //return the modified object to each iteration
      },
      {
        // Initial object (for each iteration a category will sum ++)
        Food: 0,
        "Bank & payments": 0,
        House: 0,
        Transport: 0,
        Clothes: 0,
        "Health and Hygiene": 0,
        Shopping: 0,
        Fun: 0,
      }
      // In this case '.reducer' method returns an object with categories as clave and total amount as value
    );
    // console.log(sumTotalAmountMonth); // Return the Sum-total expense for each category (Ex: nameCate: 100..)
    // console.log(Object.keys(sumTotalAmountMonth)) // Return AN ARRAY with the object setted as Key (without value)
    setExpensesByCategory(
      Object.keys(sumTotalAmountMonth).map((eachCategory) => {
        // For each element (category) of 'sumTotalAmountMonth' (transformed to array) return an object with clave: category and value: sumExpense
        return {
          category: eachCategory,
          amount: sumTotalAmountMonth[eachCategory],
        };
      })
    );
  }, [expensesByMonth, setExpensesByCategory]);

  // Return state result of useEffect (array with clave:(category) and value:(TotalAmount) ine ach object)
  return expensesByCategory;
};

export default useGetMonthExpensesByCategory;
