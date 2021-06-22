import { db } from "./firebaseConfig";
// ADD EXPENSE
const addExpense = async ({ category, description, amount, date, userUid }) => {
  // If 'expenses' collection does not exists then create it
  await db.collection("expenses").add({
    // category: category, etc...
    category,
    description,
    amount: Number(amount), // Ensure this is a number value
    date,
    userUid,
  });
};

export default addExpense;
