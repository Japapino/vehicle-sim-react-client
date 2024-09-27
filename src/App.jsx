import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Container, Select, MenuItem } from "@mui/material";

function App() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [makes, setMakes] = useState([]);

  const years = Array.from({ length: 33 }, (_, i) => (1992 + i).toString());

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  const convertResponse = (resp) => {
    let result = []; 
    
    resp.forEach((i) => {
      result.push(i.vehicle_make); 
    }); 

    return result; 
  }
  
  async function getMakes(year) {
    try {
    await axios
      .get(`http://localhost:3000/vehicles/${year}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {

        const makesArray = convertResponse(response.data); 
        console.log('result: ', makesArray); 

        setMakes(makesArray);
        // setLoadingData(false);
      });

    } catch (error) {
      console.error('Error fetching vehicle makes:', error);
    }
  }

  useEffect(() => {
    console.log('get makes');
    getMakes(year);
}, [year]);

  return (
    <Container
      sx={{
        height: "100vh",
        width: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "slategray",
      }}
    >
      <Select
        sx={{ width: "200px", height: "100px" }}
        labelId="select-box"
        id="select-box-1"
        value={year}
        label="Year"
        onChange={handleYearChange}
      >
        {years.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {year && (
        <Select
          sx={{ width: "200px", height: "100px" }}
          labelId="select-box"
          id="select-box-1"
          value={make}
          label="Make"
          onChange={handleMakeChange}
        >
          {makes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )}
      {/* <Box sx={{ width: "70vw", height: "90vh", bgcolor: "slategray" }}></Box> */}
    </Container>
  );
}

export default App;
