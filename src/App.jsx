import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Container, Select, MenuItem } from "@mui/material";
function App() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");

  const years = Array.from({ length: 33 }, (_, i) => (1992 + i).toString());

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  async function getMakes(year) {
    await axios
      .get(`https://localhost:3000/vehicles/${year}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        var test_data = response.data.data;
        setMake(
          test_data.map((x) => {
            return {
              product_name: `${x.vehicle_make}`,
            };
          })
        );
        // setLoadingData(false);
      });
  }

  useEffect(() => {
    getMakes(year);
    // if (loadingData) {
    //     getProducts();
    // }
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
          onChange={handleYearChange}
        >
          {make.map((option) => (
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
