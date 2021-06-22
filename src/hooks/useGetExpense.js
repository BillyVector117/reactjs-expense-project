// Functions
import { db } from "../firebase/firebaseConfig";
// Hooks
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Get only one Document/expense from url-Params
const useGetExpense = (expenseParamsId) => {
  const [expense, setExpense] = useState(""); // Here is the finded Document/expense
  const history = useHistory(); // To redirect

  useEffect(() => {
    // Try get the document using the id from params
    db.collection("expenses")
      .doc(expenseParamsId)
      .get()
      .then((doc) => {
        // Validate if exist that url (so users can not modify url params)
        if (doc.exists) {
          // If the doc. exists then mount in 'expense' state
          setExpense(doc.data());
        } else {
          // if Document does not exist redirect to List-section
          history.push("/list");
        }
      });
  }, [expenseParamsId, history]);

  return [expense];
};
export default useGetExpense;
