import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import axios from "axios";

function Modal() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [makeList, setMakeList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);

  const years = Array.from({ length: 33 }, (_, i) => (1992 + i).toString());

  const validateResponse = (resp: string[]): string[] => {
    if (!Array.isArray(resp)) {
      console.error("Invalid response format: expected an array");
      return [];
    }

    return resp
    .filter((item) => item && typeof item === "string")
    .map((item) => item);;
  };

  async function getMakes(year) {
    try {
      await axios
        .get(`http://localhost:3000/vehicles/${year}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const makesArray: string[] = validateResponse(response.data);
          setMakeList(makesArray);
        });
    } catch (error) {
      console.error("Error fetching vehicle makes:", error);
    }
  }

  async function getModels(year, make) {
    try {
      await axios
        .get(`http://localhost:3000/vehicles/${year}/${make}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const modelsArray: string[] = validateResponse(response.data);
          setModelList(modelsArray);
        });
    } catch (error) {
      console.error("Error fetching vehicle makes:", error);
    }
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .get(`http://localhost:3000/estimate/${year}/${make}/${model}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log('response: ', response); 
        });
    } catch (error) {
      console.error("Error fetching vehicle estimate:", error);
    }
  };

  useEffect(() => {
    if (year) {
      getMakes(year);
    }
  }, [year]);

  useEffect(() => {
    if (make) {
      getModels(year, make);
    }
  }, [make]);
// TODO: FIX padding for input fields and submit
  return (
        <form onSubmit={() => {}} className="form">
          <InputField
            id="name"
            className="form-field animation a3"
            dataType="vehicleYear"
            placeholder="Year"
            dropDownOptions={years}
            onChange={(c) => {setYear(c)}}
          />
          {year && (<InputField
            id="name"
            className="form-field animation a2"
            dataType="vehicleMake"
            placeholder="Make"
            dropDownOptions={makeList}
            onChange={(c) => {setMake(c)}}
          />)}
          {make && (<InputField
            id="name"
            className="form-field animation a3"
            dataType="vehicleModel"
            placeholder="Model"
            dropDownOptions={modelList}
            onChange={(c) => {setModel(c)}}
          />)}
          {model && (<button className="animation a6" onClick={submit}>
            Submit
          </button>)}
        </form>

  );
}

export default Modal;
