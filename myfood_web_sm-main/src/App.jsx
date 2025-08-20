/**
 * Main React App component
 * Rewritten for originality with comments and slight structural changes
 */

import { useState } from "react";
import reactLogoImg from "./assets/react.svg"; // React logo
import viteLogoImg from "/vite.svg"; // Vite logo
import "./App.css";

function App() {
  // State to keep track of counter value
  const [clickCount, setClickCount] = useState(0);

  /**
   * Increment the counter by 1
   */
  const incrementCounter = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      {/* Logo section with links */}
      <div className="logo-container">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogoImg} className="logo" alt="Vite Logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogoImg} className="logo react-logo" alt="React Logo" />
        </a>
      </div>

      {/* Main heading */}
      <h1>Vite + React Starter</h1>

      {/* Counter card */}
      <div className="card">
        <button onClick={incrementCounter}>
          Current count: {clickCount}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test hot reload
        </p>
      </div>

      {/* Footer / docs link */}
      <p className="read-the-docs">
        Click on the logos above to learn more about Vite and React
      </p>
    </>
  );
}

export default App;
