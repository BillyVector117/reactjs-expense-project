// Dependencies
import { useState, useEffect } from "react";
// Functions
import { db } from "../firebase/firebaseConfig";
// Hooks/functions/context
import { useAuth } from "../context/AuthContext"; // to extract the current user
// This hooks returns data in an array (expenses state)
const useGetExpenses = () => {
  const { user } = useAuth(); // Extract user from global context
  const [expenses, setExpenses] = useState([]); // All loaded expenses from fireStore
  const [lastExpense, setLastExpense] = useState(null); // Get the last document loaded in each Expenses call
  const [WillLoadMore, setWillLoadMore] = useState(false); // To validate if 'load-More-button' appears

  const loadMoreExpenses = () => {
    db.collection("expenses")
      // Filters
      .where("userUid", "==", user.uid) // Condition to get only the documents of current user
      .orderBy("date", "desc")
      .limit(5)
      .startAfter(lastExpense) //return 10 new data after the previous data
      // Load more documents
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length > 0) {
          // Set the last document founded after the previous function that find the 1st 10 docs
          setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
          // In this case .concat() return new array with the new getted data/docs
          setExpenses(
            expenses.concat(
              snapshot.docs.map((expense) => {
                return { ...expense.data(), id: expense.id };
              })
            )
          );
        } else {
          setWillLoadMore(false); // no documents to load
        }
      });
  };

  useEffect(() => {
    // Try a database connection and get ONLY THE CURRENT USER DOCUMENTS
    const unsubscribe = db
      .collection("expenses")
      .where("userUid", "==", user.uid) // Condition to get only the documents of current user
      .orderBy("date", "desc")
      .limit(5)
      // Get every chnge and map the documents in 'expenses' state
      .onSnapshot((snapshot) => {
        // Only if there are more than 1 item,
        // set the last expense/document on 'lastExpense' state
        if (snapshot.docs.length > 0) {
          setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
          setWillLoadMore(true); // Because exist more items yet
        } else {
          setWillLoadMore(false); // To hide load-more button
        }
        // console.log(snapshot.docs[0].data()); // getting data from array test order by ascend date
        // Mount on 'expenses' state all documents with their data and adding them default document id
        setExpenses(
          snapshot.docs.map((expense) => {
            // console.log(expense.data()) // returns each data from 'expenses' collection
            return { ...expense.data(), id: expense.id }; // return the same document (expense) but adding an id (in an objeact each doc.)
            // returned data: id, userUid, description, date, category, amount
          })
        );
      });
    return unsubscribe; // RETURN ALL DOCUMENTS
  }, [user]); // only change the 2st time and when the user changes
  return [expenses, loadMoreExpenses, WillLoadMore];
};

export default useGetExpenses;
