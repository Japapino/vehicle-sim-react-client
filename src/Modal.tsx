import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import axios from "axios";

interface MakeResponse {
  vehicle_make: string; 
}

interface ModelResponse {
  vehicle_model: string 
}

function Modal() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [makeList, setMakeList] = useState<string[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);

  const years = Array.from({ length: 33 }, (_, i) => (1992 + i).toString());

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const convertMakeResponse = (resp: MakeResponse[]): string[] => {
    let result: string[] = [];

    resp.forEach((i) => {
      result.push(i.vehicle_make);
    });

    return result;
  };

  const convertModelResponse = (resp: ModelResponse[]): string[] => {
    let result: string[] = [];

    resp.forEach((i) => {
      result.push(i.vehicle_model);
    });

    return result;
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
          const makesArray: string[] = convertMakeResponse(response.data);

          setMakeList(makesArray);
          // setLoadingData(false);
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
          const modelsArray = convertModelResponse(response.data);
          setModelList(modelsArray);
        });
    } catch (error) {
      console.error("Error fetching vehicle makes:", error);
    }
  }

  useEffect(() => {
    console.log("get makes");
    if (year) {
      getMakes(year);
    }
  }, [year]);

  useEffect(() => {
    console.log("get models");
    if (make) {
      getModels(year, make);
    }
  }, [make]);

  return (
      <div className="Modal">
        <form onSubmit={() => {}} className="ModalForm">
          <InputField
            id="name"
            className="form-field animation a1"
            dataType="vehicleYear"
            placeholder="Year"
            dropDownOptions={years}
            onChange={handleYearChange}
          />
          <InputField
            id="name"
            className="form-field animation a2"
            dataType="vehicleMake"
            placeholder="Make"
            dropDownOptions={makeList}
            onChange={handleMakeChange}
          />
          <InputField
            id="name"
            className="form-field animation a3"
            dataType="vehicleModel"
            placeholder="Model"
            dropDownOptions={modelList}
            onChange={handleModelChange}
          />
          <button>
            Submit <i className="fa fa-fw fa-chevron-right"></i>
          </button>
        </form>
      </div>
  );
}

export default Modal;
