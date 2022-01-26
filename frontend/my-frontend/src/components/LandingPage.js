import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Connector } from 'mqtt-react-hooks'

// const mqtt = require('mqtt')

// Called when trying to start the sensor
function handleStart() {
  // Calling the api to start the sensor
  fetch('http://localhost:4000/start', {
    method: 'POST',
  })
}

// Called when trying to stop the sensor
function handleStop() {
  // Calling the api to stop the sensor
  fetch('http://localhost:4000/stop', {
    method: 'POST',
  })
}

// Creating the landing page
export default function LandingPage() {
  const [isLedOn, setIsLedOn] = React.useState(false)
  const [isSensorOn, setIsSensorOn] = React.useState(false)

  useEffect(() => {
    console.log('useEffect')
    axios.get('http://localhost:8000/status').then((res) => {
      console.log(res.data.status)
      setIsLedOn(res.data.status)
    })

    setInterval(() => {
      axios.get('http://localhost:8000/status').then((res) => {
        console.log(res.data.status)
        setIsLedOn(res.data.status)
      })
    }, 1000)

    console.log(isLedOn)

    return () => {}
  }, [])

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          color: 'goldenrod',
        }}
      >
        Temperature and Humidity Sensor
      </h1>

      <div>
        <button
          onClick={() => {
            setIsSensorOn(true), handleStart()
          }}
        >
          Start
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setIsSensorOn(false), handleStop()
          }}
        >
          Stop
        </button>
      </div>
      {/* {isLedOn ? (
        <div>
          <h1 style={{ color: 'white' }}>LED ON</h1>
        </div>
      ) : (
        <div>
          <h1 style={{ color: 'white' }}>LED OFF</h1>
        </div>
      )} */}
      {isSensorOn ? (
        isLedOn ? (
          <h1 style={{ color: 'white' }}>LED ON</h1>
        ) : (
          <h1 style={{ color: 'white' }}>LED OFF</h1>
        )
      ) : (
        <h1 style={{ color: 'white' }}>Sensor is off</h1>
      )}
    </div>
  )
}
