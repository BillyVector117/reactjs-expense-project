import { createContext, useState } from "react";

const LanguageContext = createContext();
const initialLanguage = "en"
const LanguageProvider = ({ children }) => {

    const translations = {
      en: {
        headerTitle: "Add Expense",
        buttonCategories: "Categories",
        buttonExpenseList: "Expense List",
        lightCheck: "Light",
        darkCheck: "Dark",
        titleUpdateSection: "Update expense",
        buttonAddExpense: "Add expense ",
        titleExpenseList: "Expense list",
        loadMoreButton: "Load more",
        noExpensesMessage: "No expensives to show yet :(",
        buttonAddExpenseNow: "Add expense now",
        titleExpenseByCategory: "Expense By category",
        loginSectionTitle: "Login Section",
        buttonSignUp: "Signup",
        buttonLoginApp: "Log in app!",
        titleSignUpSection: "SignUp Section",
        buttonLogin: "Login",
        totalExpenseBar: "Total spent in the month:",
        expensiveDescription: "Expensive description",
      },
      es: {
        headerTitle: "Agregar gasto",
        buttonCategories: "Categorias",
        buttonExpenseList: "Lista de gastos",
        lightCheck: "Claro",
        darkCheck: "Oscuro",
        titleUpdateSection: "Actualizar gasto",
        buttonAddExpense: "Agregar gasto",
        titleExpenseList: "Lista de gastos",
        loadMoreButton: "Cargar mas",
        noExpensesMessage: "Aun no hay gastos por mostrar :(",
        buttonAddExpenseNow: "Agregar gasto ahora",
        titleExpenseByCategory: "Gastos por categoria",
        loginSectionTitle: "Sección para ingresar",
        buttonSignUp: "Registrarse",
        buttonLoginApp: "Ingresar a la aplicación!",
        titleSignUpSection: "Sección de registo",
        buttonLogin: "Ingresar",
        totalExpenseBar: "Gasto total mensual:",
        expensiveDescription: "Descripción del gasto",
      }
    }
    const [language, setLanguage] = useState(initialLanguage)
    const [texts, setTexts] = useState(translations[language]) // Load translations.en object as DEFAULT
    // console.log(texts) // Return all object
    const handleLanguage = (event) => {
        if (event.target.value === "en") {
          setLanguage("en")
          setTexts(translations.en)
        } else {
          setLanguage("es")
          setTexts(translations.es)
        }
      }
    // 'data' object can be accessed by any component children
    const data = {
        texts, handleLanguage
    }
    return <LanguageContext.Provider value={data} > {children} </LanguageContext.Provider >

}
export { LanguageProvider }
export default LanguageContext;