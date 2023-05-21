import React, { Component, useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("Ich bin da");
    window.addEventListener("devicemotion", (e) => {
      console.log("Bewegung gefeuert", e);
      console.log(Date.now());
      setData(e);
    });
  }, []);
  /*
  const [data2, setData2] = useState();
  useEffect(() => {
    console.log("Ich bin da");
    sensor.addEventListener("reading", (event2) => {
      sensor = new AbsoluteOrientationSensor();
      console.log("Bewegung gefeuert", event2);
      setData2(event2);
    });
  }, []);
  */

  if (!data) return <div>nicht da</div>;
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <div>
        <h1>Acceleration</h1>
        <li>Acceleration X: {data.acceleration.x?.toFixed(5)}</li>
        <li>Acceleration Y: {data.acceleration.y?.toFixed(5)}</li>
        <li>Acceleration Z: {data.acceleration.z?.toFixed(5)}</li>
      </div>
      <div>
        <h1>AccelerationIncludingGravity</h1>
        <li>
          AccelerationIncludingGravity X:{" "}
          {data.accelerationIncludingGravity.x?.toFixed(5)}
        </li>
        <li>
          AccelerationIncludingGravity Y:{" "}
          {data.accelerationIncludingGravity.y?.toFixed(5)}
        </li>
        <li>
          AccelerationIncludingGravity Z:{" "}
          {data.accelerationIncludingGravity.z?.toFixed(5)}
        </li>
      </div>
      <div>
        <h1>RotationRate</h1>
        <li>RotationRate Alpha: {data.rotationRate.alpha?.toFixed(5)}</li>
        <li>RotationRate Beta: {data.rotationRate.beta?.toFixed(5)}</li>
        <li>RotationRate Gamma: {data.rotationRate.gamma?.toFixed(5)}</li>
      </div>
      <div>
        <h1>Deviceorientation</h1>
      </div>
      <div>
        <h1>TimeStamp</h1>
        <li>TimeStamp: {data.timeStamp}</li>
        <h1>Current Time</h1>
        <li>{Date.now()}</li>
        <li>Year: {new Date(Date.now()).getFullYear()}</li>
        <li>Month: {new Date(Date.now()).getMonth()}</li>
        <li>Day: {new Date(Date.now()).getDay()}</li>
        <li>Hours: {new Date(Date.now()).getHours()}</li>
        <li>Minutes: {new Date(Date.now()).getMinutes()}</li>
        <li>Seconds: {new Date(Date.now()).getSeconds()}</li>
        <li>Millisenonds: {new Date(Date.now()).getMilliseconds()}</li>
      </div>
    </div>
  );
}
export default App;
