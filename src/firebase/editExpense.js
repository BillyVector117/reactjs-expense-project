import { db } from "./firebaseConfig";

// EDIT EXPENSE
const editExpense = async ({
  idExpenseToEdit,
  category,
  description,
  amount,
  date,
}) => {
  try {
    // Find the document with id setted and delete it
    await db
      .collection("expenses")
      .doc(idExpenseToEdit)
      .update({
        // there are the values to update
        // category: category, etc...
        category,
        description,
        amount: Number(amount), // Ensure this is a number value
        date,
      });
  } catch (error) {
    console.log(error);
  }
};

export default editExpense;
