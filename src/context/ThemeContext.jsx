import { createContext, useState } from "react";

const ThemeContext = createContext();
const initialTheme = false
const ThemeProvider = ({ children }) => {
    const [darkMode, setdarkMode] = useState(initialTheme)
    const handlerDarkMode = (isTrue) => {
        if (isTrue) {
            return setdarkMode(true)
        } else {
            setdarkMode(false)
        }
    }
    // 'data' object can be accessed by any component children
    const data = {
        darkMode, handlerDarkMode
    }
    return <ThemeContext.Provider value={data} > {children} </ThemeContext.Provider >

}
export { ThemeProvider }
export default ThemeContext;