/* eslint-disable react/no-unknown-property */
import "./App.scss";
import Modal from "./Modal.tsx";

function App() {
  return (
      <div className="container">
        <div className="left">
          <div className="header">
            <h2 className="animation a1">Welcome to the Vehicle Price Clculator</h2>
            <h4 className="animation a2">
              Let&apos;s start by entering the year of your vehicle. 
            </h4>
          </div>
          <Modal />
        </div>
        <div className="right"></div>
      </div>
  );
}

export default App;
