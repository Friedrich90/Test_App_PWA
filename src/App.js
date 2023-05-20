//import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
// import Accelerometer from './components/react-accelerometer';
import React, { useEffect, useState } from 'react';
import {Accelerometer, Gyroscope, AbsoluteOrientationSensor} from './motion-sensors.js';

//https://developer.chrome.com/en/articles/generic-sensor/

const App = () => {

  const [sensorData, setSensorData] = useState({
    acceleration: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    magneticField: { x: null, y: null, z: null },
  });

  if ('Accelerometer' in window) {
    // The `Accelerometer` interface is supported by the browser.
    // Does the device have an accelerometer, though?
    console.log("'Accelerometer' in window")
  }

  let accelerometer = null;
  try {
  accelerometer = new Accelerometer({ frequency: 10 });
  accelerometer.onerror = (event) => {
    // Handle runtime errors.
    if (event.error.name === 'NotAllowedError') {
      console.log('Permission to access sensor was denied.');
    } else if (event.error.name === 'NotReadableError') {
      console.log('Cannot connect to the sensor.');
    }
  };
  accelerometer.onreading = (event) => {
    const { accelerationIncludingGravity } = event;
    console.log(event);
    console.log("accelerometer X-axis " + accelerometer.x);
    console.log("accelerometer Y-axis " + accelerometer.y);
    console.log("accelerometer Z-axis " + accelerometer.z);
    setSensorData({
    acceleration: {
      x: accelerationIncludingGravity.x,
      y: accelerationIncludingGravity.y,
      z: accelerationIncludingGravity.z,
    }});
};
  accelerometer.start();
} catch (error) {
  // Handle construction errors.
  if (error.name === 'SecurityError') {
    console.log('Sensor construction was blocked by the Permissions Policy.');
  } else if (error.name === 'ReferenceError') {
    console.log('Sensor is not supported by the User Agent.');
  } else {
    throw error;
  }
}

let gyroscope = null;
try {
  gyroscope = new Gyroscope({ frequency: 10 });
  gyroscope.onerror = (event) => {
  // Handle runtime errors.
  if (event.error.name === 'NotAllowedError') {
    console.log('Permission to access sensor was denied.');
  } else if (event.error.name === 'NotReadableError') {
    console.log('Cannot connect to the sensor.');
  }
};
gyroscope.onreading = (event) => {
  const { rotationRate } = event;
  console.log(event)
  console.log("Angular velocity around the X-axis " + gyroscope.alpha);
  console.log("Angular velocity around the Y-axis " + gyroscope.beta);
  console.log("Angular velocity around the Z-axis " + gyroscope.gamma);
  setSensorData({
    rotationRate: {
      alpha: rotationRate.alpha,
      beta: rotationRate.beta,
      gamma: rotationRate.gamma,
    }});
};
gyroscope.start();
} catch (error) {
// Handle construction errors.
if (error.name === 'SecurityError') {
  console.log('Sensor construction was blocked by the Permissions Policy.');
} else if (error.name === 'ReferenceError') {
  console.log('Sensor is not supported by the User Agent.');
} else {
  throw error;
}
}

let orientation = null;
try {
  orientation = new AbsoluteOrientationSensor({ frequency: 10 });
  orientation.onerror = (event) => {
  // Handle runtime errors.
  if (event.error.name === 'NotAllowedError') {
    console.log('Permission to access sensor was denied.');
  } else if (event.error.name === 'NotReadableError') {
    console.log('Cannot connect to the sensor.');
  }
};
orientation.onreading = (event) => {
  const { magneticField } = event;
  console.log(event);
  console.log("orientation X-axis " + orientation.x);
  console.log("orientation Y-axis " + orientation.y);
  console.log("orientation Z-axis " + orientation.z);
  setSensorData({
    magneticField: {
      x: magneticField.x,
      y: magneticField.y,
      z: magneticField.z,
}});
};
orientation.start();
} catch (error) {
// Handle construction errors.
if (error.name === 'SecurityError') {
  console.log('Sensor construction was blocked by the Permissions Policy.');
} else if (error.name === 'ReferenceError') {
  console.log('Sensor is not supported by the User Agent.');
} else {
  throw error;
}
}


/*
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

  */

  return (
    <div>
      <h1>Sensor Data</h1>
      <h2>Linear Acceleration</h2>
      <p>X: {sensorData.acceleration.x}</p>
      <p>Y: {sensorData.acceleration.y}</p>
      <p>Z: {sensorData.acceleration.z}</p>
      <h2>Gyroscope</h2>
      <p>Alpha: {sensorData.acceleration.x}</p>
      <p>Beta: {sensorData.acceleration.beta}</p>
      <p>Gamma: {sensorData.acceleration.gamma}</p>
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
