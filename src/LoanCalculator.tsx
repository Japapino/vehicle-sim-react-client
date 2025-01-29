import React, { useEffect, useState } from "react";

function LoanCalculator() {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [emi, setEmi] = useState<number>(0);
  const [formComplete, setFormComplete] = useState<boolean>(false); 

  const calculateEMI = () => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / (Math.pow(1 + monthlyRate, time) - 1);
    setEmi(Number(emi.toFixed(2)));
  };

  useEffect(() => {
    console.log(principal, rate, time);
    if (principal > 0 && rate > 0 && time > 0) setFormComplete(true); 
  }, [principal, rate, time]); 

  console.log(formComplete); 

  return (
    <div className="loan-calculator">
      <h2>Loan Calculator</h2>
      <div className="form-field animation a3">
        <label>
          Principal Amount:
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
        </label>
      </div>
      <div className="form-field animation a2">
        <label>
          Annual Interest Rate (%):
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
      </div>
      <div className="form-field animation a3">
        <label>
          Loan Tenure (months):
          <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
        </label>
      </div>
      
      {formComplete && <button onClick={calculateEMI}>Calculate EMI</button>}
      {emi > 0 && (
        <div>
          <h3>Estimated Monthly Installment (EMI): {emi}</h3>
        </div>
      )}
    </div>
  );
}

export default LoanCalculator;