import React, { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const time = new Date().toLocaleTimeString();

  return (
    <div className="master-layout">
      <a href="#content" id="skip-to-content">
        skip to content
      </a>
      <h1 id="header">Atlassian Coding Interview Environment</h1>
      <p>Loaded time: {time}</p>
      <main id="content"></main>
    </div>
  );
}

export default App;
