//import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
// import Accelerometer from './components/react-accelerometer';
import { Accelerometer, Gyroscope } from 'react-native-sensors';
import React, { useEffect, useState } from 'react';


const App = () => {

  const SensorComponent = () => {
    const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
    const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  
    useEffect(() => {
      const accelerometerSubscription = new Accelerometer({
        updateInterval: 100,
      })
        .then(observable => {
          const subscription = observable.subscribe(({ x, y, z }) => {
            setAccelerometerData({ x, y, z });
          });
          return () => subscription.unsubscribe();
        })
        .catch(error => {
          console.log('The accelerometer is not available on this device:', error);
        });
  
      const gyroscopeSubscription = new Gyroscope({
        updateInterval: 100,
      })
        .then(observable => {
          const subscription = observable.subscribe(({ x, y, z }) => {
            setGyroscopeData({ x, y, z });
          });
          return () => subscription.unsubscribe();
        })
        .catch(error => {
          console.log('The gyroscope is not available on this device:', error);
        });
  
      return () => {
        accelerometerSubscription && accelerometerSubscription.unsubscribe();
        gyroscopeSubscription && gyroscopeSubscription.unsubscribe();
      };
    }, []);
  
    return (
      <View>
        <Text>Accelerometer:</Text>
        <Text>X: {accelerometerData.x}</Text>
        <Text>Y: {accelerometerData.y}</Text>
        <Text>Z: {accelerometerData.z}</Text>
  
        <Text>Gyroscope:</Text>
        <Text>X: {gyroscopeData.x}</Text>
        <Text>Y: {gyroscopeData.y}</Text>
        <Text>Z: {gyroscopeData.z}</Text>
      </View>
    );
  };
  
  return (
    <View>
      {/* ... */}
      <SensorComponent />
      {/* ... */}
    </View>
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
