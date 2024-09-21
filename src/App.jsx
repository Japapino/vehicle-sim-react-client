import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Container, Select, MenuItem } from "@mui/material";
function App() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [makes, setMakes] = useState([]);

  const mockResult = 
  [
    {
        "vehicle_make": "Acura"
    },
    {
        "vehicle_make": "Audi"
    },
    {
        "vehicle_make": "Buick"
    },
    {
        "vehicle_make": "BMW"
    },
    {
        "vehicle_make": "Cadillac"
    },
    {
        "vehicle_make": "Chevrolet"
    },
    {
        "vehicle_make": "Chrysler"
    },
    {
        "vehicle_make": "Dodge"
    },
    {
        "vehicle_make": "Eagle"
    },
    {
        "vehicle_make": "Ford"
    },
    {
        "vehicle_make": "Geo"
    },
    {
        "vehicle_make": "GMC"
    },
    {
        "vehicle_make": "Honda"
    },
    {
        "vehicle_make": "Hyundai"
    },
    {
        "vehicle_make": "INFINITI"
    },
    {
        "vehicle_make": "Isuzu"
    },
    {
        "vehicle_make": "Kia"
    },
    {
        "vehicle_make": "Jeep"
    },
    {
        "vehicle_make": "Jaguar"
    },
    {
        "vehicle_make": "Lexus"
    },
    {
        "vehicle_make": "Land_Rover"
    },
    {
        "vehicle_make": "Lincoln"
    },
    {
        "vehicle_make": "MAZDA"
    },
    {
        "vehicle_make": "Mercedes-Benz"
    },
    {
        "vehicle_make": "Mercury"
    },
    {
        "vehicle_make": "Mitsubishi"
    },
    {
        "vehicle_make": "Nissan"
    },
    {
        "vehicle_make": "Oldsmobile"
    },
    {
        "vehicle_make": "Plymouth"
    },
    {
        "vehicle_make": "Pontiac"
    },
    {
        "vehicle_make": "Porsche"
    },
    {
        "vehicle_make": "HUMMER"
    },
    {
        "vehicle_make": "Saab"
    },
    {
        "vehicle_make": "Saturn"
    },
    {
        "vehicle_make": "Suzuki"
    },
    {
        "vehicle_make": "Subaru"
    },
    {
        "vehicle_make": "Toyota"
    },
    {
        "vehicle_make": "Volkswagen"
    },
    {
        "vehicle_make": "Volvo"
    }
 ]

  const years = Array.from({ length: 33 }, (_, i) => (1992 + i).toString());

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  const convertResponse = (resp) => {

    // console.log(resp); 
    let result = []; 
    resp.forEach((i) => {
      result.push(i.vehicle_make); 
    }); 

    return result; 
  }
  
  async function getMakes(year) {
    console.log('year: ', year); 
    await axios
      .get(`http://localhost:3000/vehicles/2004`, {
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
    setMakes(convertResponse(mockResult)); 
  }

  useEffect(() => {
    console.log('get makes');
    // getMakes(year);
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
