import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      alert("Please enter valid positive values for all fields.");
      return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthly =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const total = monthly * numberOfPayments;
    const interest = total - loanAmount;

    setMonthlyPayment(parseFloat(monthly.toFixed(2)));
    setTotalPayment(parseFloat(total.toFixed(2)));
    setTotalInterest(parseFloat(interest.toFixed(2)));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Loan Calculator</h1>
      <Card className="w-full max-w-md p-4 shadow-md">
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Loan Amount ($)</label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                placeholder="Enter loan amount"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Interest Rate (%)</label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                placeholder="Enter annual interest rate"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Loan Term (Years)</label>
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseFloat(e.target.value) || 0)}
                placeholder="Enter loan term in years"
              />
            </div>
            <Button className="w-full mt-4" onClick={calculateLoan}>
              Calculate
            </Button>
          </div>
        </CardContent>
      </Card>

      {monthlyPayment !== null && (
        <Card className="w-full max-w-md p-4 shadow-md mt-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Calculation Results</h2>
            <p className="mb-2">Monthly Payment: <strong>${monthlyPayment}</strong></p>
            <p className="mb-2">Total Payment: <strong>${totalPayment}</strong></p>
            <p>Total Interest: <strong>${totalInterest}</strong></p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoanCalculator;
