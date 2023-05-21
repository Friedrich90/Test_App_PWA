import React from 'react'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

//https://github.com/ruimaranhao/pwa-accelerometer

export default class Gyroscope extends React.Component {

  static defaultProps = {
    multiplier: 1,
    useGravity: true,
    render: () => {}
  }

  state = {
    position: {
      x: null,
      y: null,
      z: null
    },
    rotation: {
      alpha: null,
      beta: null,
      gamma: null
    },
    landscape: false,

    north: null,
  }

  componentDidMount () {
    const {timeout} = this.props

    window.addEventListener('deviceorientation', this.handleOrientation)

    fromEvent(window, 'deviceorientation')
        .pipe(throttleTime(timeout))
        .subscribe((event) => {
            const { orientation } = window
            this.setState(() => ({ landscape: orientation === 90 || orientation === -90 }))});

      fromEvent(window, 'deviceorientation')
        .pipe(throttleTime(timeout))
        .subscribe((event) => {
            const { landscape } = this.state
            const { useGravity, multiplier } = this.props
            const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
            const rotation = event.rotationRate || null
            const { x, y, z } = acceleration
    
            this.setState(() => ({
              rotation,
              position: {
                x: (landscape ? y : x) * multiplier,
                y: (landscape ? x : y) * multiplier,
                z: z * multiplier
              },
          }))});


      fromEvent(window, 'deviceorientation')
            .pipe(throttleTime(timeout))
            .subscribe((event) => {    
                this.setState(() => ({
                  north: (360.0 - event.alpha).toFixed(2),
            }))});
  }

  render () {
    const {render} = this.props
    const {position, rotation, north} = this.state
    
    return (
      <div>
        {render({...position, ...rotation, north})}
      </div>
    )
  } 
}