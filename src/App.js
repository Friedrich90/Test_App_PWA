import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Accelerometer from './src/react-accelerometer';

export default class App extends Component {
  render() {
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
