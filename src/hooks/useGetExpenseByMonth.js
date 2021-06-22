// Functions
import { db } from "../firebase/firebaseConfig";
import { endOfMonth, startOfMonth, getUnixTime } from "date-fns"; // to get start/end of month
// Hooks
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // To know/validate an active user
// Get only one Document/expense from url-Params
const useGetExpense = () => {
  const [expensesByMonth, setExpensesByMonth] = useState([]); // Here is the finded Document/expense
  const { user } = useAuth(); // Extract the final result of useAuth() (Hook), return the user
  useEffect(() => {
    // Get data of start/end of month but transforming to unixTime
    const startOfMonthDate = getUnixTime(startOfMonth(new Date())); // Get the start of month with current date
    const endOfMonthDate = getUnixTime(endOfMonth(new Date())); // Get the end of month with current date

    if (user) {
      // Save the function in a var to end the database connection, returning the same variable.
      // Try get the document using the id from params
      const unsubscribe = db
        .collection("expenses") // From 'expenses' collection
        .orderBy("date", "desc") // Order by date
        .where("date", ">=", startOfMonthDate) // condition (only show docs starting the month)
        .where("date", "<=", endOfMonthDate) // Condition 2 (set the ending of month)
        .where("userUid", "==", user.uid) // Ensure this query returns only USER UNIQUE DATA (current user)
        .onSnapshot((snapshot) => {
          // console.log(snapshot.docs[0].data())
          // Map documents with query, and return each documents mounting in 'expensesByMonth' state
          setExpensesByMonth(
            snapshot.docs.map((document) => {
              // console.log(document.data());
              return {
                // extract all properties and add its id
                ...document.data(),
                id: document.id,
              };
            })
          );
        });
      // useEffect needs to return a function when it is unmounted, in this case will execute 'unsuscribe' variable to
      // end the connection to fireStore
      return unsubscribe;
    }
  }, [user]);

  return expensesByMonth;
};
export default useGetExpense;
