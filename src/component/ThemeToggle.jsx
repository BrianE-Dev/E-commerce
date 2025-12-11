//Trying the build a context provider for theme toggle to accept children and act like div container

import React, { useState } from 'react';
import '../style/theme.css'

function ThemeToggle({ children }) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    return (
        <div className={`theme-card ${theme}`}>
            <div className="theme-toggle-container">
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    Switch to {theme === 'light' ? 'dark' : 'light'} theme
                </button>
            </div>
            <div className="theme-content">
                {children}
            </div>
        </div>
    )
};

export default ThemeToggle;

// import React, { useState } from 'react';
// import '../style/theme.css'
// function ThemeToggle() {
//     const [theme, setTheme] = useState('light');
//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//     };
//     return (
//         <div className = {`theme-card ${theme}`}>
//             <button onClick = {toggleTheme}>
//                 Switch to { theme === 'light' ? 'dark' : 'light' } theme
//             </button>
//         </div>
//     )
// };
// export default ThemeToggle;