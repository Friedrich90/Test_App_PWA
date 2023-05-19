import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import Accelerometer from './components/Accelometer.js'; 

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const addItem = (newItem) => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem('');
      }
    };

  const handleInputChange = (event) => {
    setNewItem(event.target.value);
  };

  function accelerometer() {
    
    // Request permission to access accelerometer
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              startLoggingAccelerometer();
            } else {
              console.log('Permission to access accelerometer denied.');
              addItem('Permission to access accelerometer denied.');
            }
          })
          .catch(console.error);
      } else {
        console.log('DeviceMotionEvent.requestPermission() is not supported.');
        addItem('DeviceMotionEvent.requestPermission() is not supported.');
      }
    }
    
      // Start logging accelerometer data
      function startLoggingAccelerometer() {
        if (typeof DeviceMotionEvent === 'function' && typeof DeviceMotionEvent.requestPermission === 'function') {
          // Register the event listener
          window.addEventListener('devicemotion', handleAccelerometerData);
          console.log('Logging accelerometer data...');
          addItem('Logging accelerometer data...');
    
        } else {
          console.log('DeviceMotionEvent is not supported.');
          addItem('DeviceMotionEvent is not supported.');
        }
      }
      
      // Handle accelerometer data
      function handleAccelerometerData(event) {
        const { accelerationIncludingGravity, rotationRate } = event;
      
        // Log accelerometer data
        console.log('Acceleration (including gravity):', accelerationIncludingGravity);
        addItem('Acceleration (including gravity):', accelerationIncludingGravity);

        console.log('Rotation rate:', rotationRate);
        addItem('Rotation rate:', rotationRate);
      
        // You can perform further processing or store the data as needed
      }
      
      // Stop logging accelerometer data
      function stopLoggingAccelerometer() {
        window.removeEventListener('devicemotion', handleAccelerometerData);
        console.log('Stopped logging accelerometer data.');
        addItem('Stopped logging accelerometer data.');

      }
    

    return(
      <div className = "App">
      
      <h1>Item List</h1>
      <input
        type="text"
        value={newItem}
        onChange={handleInputChange}
        placeholder="Enter an item"
      />
      <button onClick={accelerometer}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>


      </div>
      
    );
  }


export default App;