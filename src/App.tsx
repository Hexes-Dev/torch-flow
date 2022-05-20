import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Areas from './ui/Areas';
import Flow from './Flow/Flow';

function App() {
  
  let defaultAreas = [
    <Flow/>,
    <div></div>,
    <p>Column 3</p>
  ]

  return (
    <div className="App">
            <div style={{
        border: '1px solid red',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}>
        <Areas defaultAreas={defaultAreas} />
      </div>
    </div>
  )
}

export default App
