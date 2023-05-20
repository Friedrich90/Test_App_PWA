//import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
// import Accelerometer from './components/react-accelerometer';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [sensorData, setSensorData] = useState({
    acceleration: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    magneticField: { x: null, y: null, z: null },
  });

  useEffect(() => {
    const handleSensorData = (event) => {
      const { accelerationIncludingGravity, rotationRate, magneticField } = event;

      setSensorData({
        acceleration: {
          x: accelerationIncludingGravity.x,
          y: accelerationIncludingGravity.y,
          z: accelerationIncludingGravity.z,
        },
        rotationRate: {
          alpha: rotationRate.alpha,
          beta: rotationRate.beta,
          gamma: rotationRate.gamma,
        },
        magneticField: {
          x: magneticField.x,
          y: magneticField.y,
          z: magneticField.z,
        },
      });
    };

    // Start listening for the 'devicemotion' event
    window.addEventListener('devicemotion', handleSensorData);

    return () => {
      // Clean up - stop listening for the 'devicemotion' event
      window.removeEventListener('devicemotion', handleSensorData);
    };
  }, []);

  return (
    <div>
      <h1>Sensor Data</h1>
      <h2>Linear Acceleration</h2>
      <p>X: {sensorData.acceleration.x}</p>
      <p>Y: {sensorData.acceleration.y}</p>
      <p>Z: {sensorData.acceleration.z}</p>
      <h2>Gyroscope</h2>
      <p>Alpha: {sensorData.rotationRate.alpha}</p>
      <p>Beta: {sensorData.rotationRate.beta}</p>
      <p>Gamma: {sensorData.rotationRate.gamma}</p>
      <h2>Magnetometer</h2>
      <p>X: {sensorData.magneticField.x}</p>
      <p>Y: {sensorData.magneticField.y}</p>
      <p>Z: {sensorData.magneticField.z}</p>
    </div>
  );
};

export default App;


/*
export default class App extends Component {
  render() {
    let gyroscope = new Gyroscope({ frequency: 60 });

    gyroscope.addEventListener("reading", (e) => {
    console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
    console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
    console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
    });
    gyroscope.start();
    return (
      <div className="App">
        <Accelerometer timeout={100} render={({ x, y, z, alpha, beta, gamma, north }) => (
          <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{
              transform: `rotate(${north}deg)`
            }}
          />
          <ul>
            <li>x: {x}</li>
            <li>y: {y}</li>
            <li>z: {z}</li>
            <li>rotation alpha: {alpha}</li>
            <li>rotation beta: {beta}</li>
            <li>rotation gamma: {gamma}</li>
          </ul>
          <p> North: {north}</p>
        </header>
        )}
        />
      </div>
    );
  }
}
*/
