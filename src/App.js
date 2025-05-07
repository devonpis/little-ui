import React, { useState } from "react";
import "./App.css";

function App() {
  const [time] = useState(() => new Date().toLocaleTimeString());

  return (
    <div className="app-container">
      <h1>Atlassian Coding Interview Environment</h1>
      <p>Loaded at: {time}</p>
    </div>
  );
}

export default App;
