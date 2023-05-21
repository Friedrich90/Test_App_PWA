import React, { Component, useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";
//import Accelerometer from './react-accelerometer';

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("Ich bin da");
    window.addEventListener("devicemotion", (e) => {
      console.log("Bewegung gefeuert", e);
      setData(e);
    });
  }, []);

  if (!data) return <div>nicht da</div>;
  return (
    <div>
      {JSON.stringify(data)}
      <div>
        <li>Acceleration Alpha: {data.rotationRate.alpha}</li>
        <li>Acceleration Beta: {data.rotationRate.beta}</li>
        <li>Acceleration Gamma: {data.rotationRate.gamma}</li>
      </div>
    </div>
  );
}
export default App;
