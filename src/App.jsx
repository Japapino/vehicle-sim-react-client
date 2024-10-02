/* eslint-disable react/no-unknown-property */
import "./App.scss";
import Modal from "./modal.tsx";

function App() {
  return (
      <div class="container">
        <div class="left">
          <div class="header">
            <h2 class="animation a1">Welcome to the Vehicle Price Clculator</h2>
            <h4 class="animation a2">
              Let&apos;s start by entering the year of your vehicle. 
            </h4>
          </div>
          <Modal />
        </div>
        <div class="right"></div>
      </div>
  );
}

export default App;
