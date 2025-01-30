import React, { useEffect } from "react";
import useLoanStore from "./store.ts";
import "./style/LoanCalculator.scss";

const LoanCalculator = () => {
  const {
    principal,
    rate,
    time,
    emi,
    formComplete,
    setPrincipal,
    setRate,
    setTime,
    setEmi,
    setFormComplete,
  } = useLoanStore();

  useEffect(() => {
    if (principal > 0 && rate > 0 && time > 0) setFormComplete(true);
  }, [principal, rate, time]);

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) /
      (Math.pow(1 + monthlyRate, time) - 1);
    setEmi(Number(emi.toFixed(2)));
  };

  return (
    <div className="loan-calculator">
      <h2>Loan Calculator</h2>

      <div className="form-field animation a3 input-container">
        <p>Principal Amount:</p>
        <input
          type="number"
          value={principal || ""}
          onChange={(e) => setPrincipal(Number(e.target.value))}
        />
      </div>
      <div className="form-field animation a3 input-container">
        <p>Annual Interest Rate (%):</p>
        <input
          type="number"
          value={rate || ""}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </div>
      <div className="form-field animation a3 input-container">
        <p>Loan Tenure (months):</p>
        <input
          type="number"
          value={time || ""}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </div>
      {formComplete && <button onClick={calculateEMI}>Calculate EMI</button>}
      {emi > 0 && (
        <div>
          <h3>Estimated Monthly Installment (EMI): {emi}</h3>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
