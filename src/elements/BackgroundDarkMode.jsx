import React from 'react'
// Elements
import Image from "../images/StockChart.svg"; // Load SVG file as component
const BackgroundDarkMode = () => {
    const styles = {
        backgroundImage: `url(${Image})`,
        height: "100%",
        width: "100%",
        position: "fixed",
        bottom: "0",
        zIndex: "0",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }
    return (
        <>
        <div className="" style={styles} ></div>
        
      </>
    )
}

export default BackgroundDarkMode
