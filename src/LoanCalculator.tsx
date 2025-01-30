import React, { useEffect } from "react";
import useLoanStore from "./store.ts";
import "./style/LoanCalculator.scss";
import InputField from "./components/InputField";

const LoanCalculator = () => {
  const {
    principal,
    rate,
    time,
    emi,
    formComplete,
    downPayment,
    setPrincipal,
    setRate,
    setTime,
    setEmi,
    setFormComplete,
    setDownPayment,
  } = useLoanStore();

  useEffect(() => {
    if (principal > 0 && rate > 0 && time > 0) setFormComplete(true);
  }, [principal, rate, time]);

  const calculateEMI = () => {
    const loanAmount = principal - downPayment;
    const monthlyRate = rate / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, time)) /
      (Math.pow(1 + monthlyRate, time) - 1);
    setEmi(Number(emi.toFixed(2)));
  };

  // TODO: auto fill principal with vehicle value 

  return (
    <div className="loan-calculator animation a1">
      <h2 className="animation a2">Now lets fill out our loan information</h2>
      <InputField
        id={""}
        className={"loan-form-field animation a3 input-container"}
        label={"Principal Amount"}
        onChange={(n) => setPrincipal(Number(n))}
      />
      <InputField
        id={""}
        className={"loan-form-field animation a3 input-container"}
        label={"Down Payment"}
        onChange={(n) => setDownPayment(Number(n))}
      />
      <InputField
        id={""}
        className={"loan-form-field  animation a3 input-container"}
        label={"Annual Interest Rate (%)"}
        onChange={(n) => setRate(Number(n))}
      />
      <InputField
        id={""}
        className={"loan-form-field  animation a3 input-container"}
        label={"Loan Tenure (months)"}
        onChange={(n) => setTime(Number(n))}
      />
      {formComplete && (
        <button
          className="loan-form-field input-container"
          onClick={calculateEMI}
        >
          Calculate EMI
        </button>
      )}
      {emi > 0 && (
        <div className="loan-form-field input-container">
          <h3>Estimated Monthly Installment (EMI): {emi}</h3>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
