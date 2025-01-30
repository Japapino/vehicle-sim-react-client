import { Input } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

interface InputFieldProps {
  id: string;
  className: string; 
  label: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({id, className, onChange, label }) => {
  const [loanProp, setLoanProp] = useState("");

  const handlePropChange = (e) => {
    setLoanProp(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <div className={className}>
        <h3>{label}</h3>
        <Input
          sx={{ width: "100%", height: "100%" }}
          type="number"
          id={id}
          value={loanProp}
          placeholder= {loanProp || ""}
          onChange={handlePropChange}
        >
        </Input>
      </div>
    </>
  );
};

export default InputField;
