import React from "react";

function accelerometer() {
// Request permission to access accelerometer
if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          startLoggingAccelerometer();
        } else {
          console.log('Permission to access accelerometer denied.');
        }
      })
      .catch(console.error);
  } else {
    console.log('DeviceMotionEvent.requestPermission() is not supported.');
  }
}

  // Start logging accelerometer data
  function startLoggingAccelerometer() {
    if (typeof DeviceMotionEvent === 'function' && typeof DeviceMotionEvent.requestPermission === 'function') {
      // Register the event listener
      window.addEventListener('devicemotion', handleAccelerometerData);
      console.log('Logging accelerometer data...');

    } else {
      console.log('DeviceMotionEvent is not supported.');
    }
  }
  
  // Handle accelerometer data
  function handleAccelerometerData(event) {
    const { accelerationIncludingGravity, rotationRate } = event;
  
    // Log accelerometer data
    console.log('Acceleration (including gravity):', accelerationIncludingGravity);
    console.log('Rotation rate:', rotationRate);
  
    // You can perform further processing or store the data as needed
  }
  
  // Stop logging accelerometer data
  function stopLoggingAccelerometer() {
    window.removeEventListener('devicemotion', handleAccelerometerData);
    console.log('Stopped logging accelerometer data.');
  }

export default accelerometer