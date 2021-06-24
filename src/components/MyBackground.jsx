import React, { useContext } from 'react'
import Background from '../elements/Background'
import BackgroundDarkMode from '../elements/BackgroundDarkMode'
import ThemeContext from "../context/ThemeContext";
const MyBackground = () => {
    // Destructuring global variables from Context-API (Theme)
    const { darkMode } = useContext(ThemeContext)
    return (
        <>
            {
                darkMode ? <BackgroundDarkMode /> : <Background />
            }
        </>
    )
}

export default MyBackground
