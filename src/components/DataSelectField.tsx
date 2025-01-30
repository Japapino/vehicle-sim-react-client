import { Select, MenuItem } from "@mui/material";
import React from "react";
import { useState } from "react";

interface DataSelectProps {
  id: string;
  className: string; 
  dataType: string;
  placeholder: string;
  dropDownOptions: string[];
  onChange: (value: string) => void;
}

const DataSelectField: React.FC<DataSelectProps> = ({id, className, dataType, placeholder, dropDownOptions, onChange }) => {
  const [vehicleProp, setVehicleProp] = useState("");

  const handlePropChange = (e) => {
    setVehicleProp(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
    {dropDownOptions && (
      <div className={className}>
        <Select
          sx={{ width: "100%", height: "100%" }}
          labelId="select-box"
          id={id}
          value={vehicleProp}
          placeholder= {placeholder ?? "Select"}
          onChange={handlePropChange}
        >
          {dropDownOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      )}
    </>
  );
};

export default DataSelectField;
