import { db } from "./firebaseConfig";

// DELETE EXPENSE
const deleteExpense = async (expenseId) => {
  try {
    // Find the document with id setted and delete it
    await db.collection("expenses").doc(expenseId).delete();
  } catch (error) {
    console.log(error);
  }
};

export default deleteExpense;
