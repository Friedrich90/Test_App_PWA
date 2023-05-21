//import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
// import Accelerometer from './components/react-accelerometer';
import React, { useEffect, useState, Component } from 'react';
//import {Accelerometer, Gyroscope, AbsoluteOrientationSensor} from './motion-sensors.js';
import Accelerometer from './components/react-accelerometer';
import Gyroscope from './components/gyroscope';
//import React from 'react';
//import Toggle  from './Toggle';
//import { useDeviceOrientation } from './useDeviceOrientation';

//https://itnext.io/gyro-web-accessing-the-device-orientation-in-javascript-387da43eeb84


function App() {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [rotationRate, setRotationRate] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    requestPermission();

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  const requestPermission = () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('devicemotion', handleMotion, true);
          } else {
            console.log('Permission denied for accelerometer access');
          }
        })
        .catch((error) => {
          console.error('Error requesting accelerometer permission:', error);
        });
    } else {
      console.log('DeviceMotionEvent.requestPermission not supported');
    }
  };

  const handleMotion = (event) => {
    const { acceleration, rotationRate } = event;
    setAcceleration({
      x: acceleration.x.toFixed(2),
      y: acceleration.y.toFixed(2),
      z: acceleration.z.toFixed(2),
    });
    setRotationRate({
      alpha: rotationRate.alpha.toFixed(2),
      beta: rotationRate.beta.toFixed(2),
      gamma: rotationRate.gamma.toFixed(2),
    });
  };

  return (
    <div className="App">
      <h1>Accelerometer Data</h1>
      <div>
        <h2>Acceleration</h2>
        <p>X: {acceleration.x}</p>
        <p>Y: {acceleration.y}</p>
        <p>Z: {acceleration.z}</p>
      </div>
      <div>
        <h2>Rotation Rate</h2>
        <p>Alpha: {rotationRate.alpha}</p>
        <p>Beta: {rotationRate.beta}</p>
        <p>Gamma: {rotationRate.gamma}</p>
      </div>
    </div>
  );
}

export default App;
          

//export default App;

/*
export default class App extends Component {
  render() {

    function onClick() {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Handle iOS 13+ devices.
        DeviceMotionEvent.requestPermission()
          .then((state) => {
            if (state === 'granted') {
              window.addEventListener('devicemotion', handleOrientation, tue);
            } else {
              console.error('Request to access the orientation was rejected');
            }
          })
          .catch(console.error);
      } else {
        // Handle regular non iOS 13+ devices.
        window.addEventListener('devicemotion', handleOrientation, true);
      }
    }

    window.addEventListener('deviceorientation', this.handleOrientation, true)

    function handleOrientation(event) {
      const absolute = event.absolute;
      const alpha = event.alpha;
      const beta = event.beta;
      const gamma = event.gamma;
    
      // Do stuff with the new orientation data
    }

    return (
      <div className="App">
        <Accelerometer timeout={100} render={({ x, y, z, alpha_old, beta_old, gamma_old, north }) => (
          <Gyroscope timeout={100} render={({ x_new, y_new, z_new, alpha, beta, gamma, north_new }) => (
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
            <li>rotation new alpha: {alpha}</li>
            <li>rotation new beta: {beta}</li>
            <li>rotation new gamma: {gamma}</li>
          </ul>
          <p> North: {north}</p>
        </header>
        )}
        />
        )}
        />
      </div>
    );
  }
}

*/


//https://developer.chrome.com/en/articles/generic-sensor/
/*
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

*/
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
  /*
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

*/
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
