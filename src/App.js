import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Managements from "./components/Managements";
import { Neworders } from "./components/Neworders";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Managements />} />
          <Route path="/neworders" element={<Neworders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
