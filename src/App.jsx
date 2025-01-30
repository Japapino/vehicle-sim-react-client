// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.scss";
import Modal from "./Modal.tsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoanCalculator from "./LoanCalculator.tsx";

function App() {
  return (
    <Router>
      <div className="container">
        <nav id='nav-bar'>
          <Link to="/">Home</Link>
          <Link to="/sim">Loan Calculator</Link>
        </nav>
        <div className="left">
          <Routes>
            <Route path="/" element={<Modal />} />
            <Route path="/sim" element={<LoanCalculator />} />
          </Routes>
        </div>
        <div className="right"></div>
      </div>
    </Router>
  );
}

export default App;
