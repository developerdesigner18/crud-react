import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import OrderManagement from "./components/OrderManagement";
import  Neworder  from "./components/Neworder";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<OrderManagement />} />
          <Route path="/neworders" element={<Neworder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
