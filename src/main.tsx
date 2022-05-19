import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Flow from './Flow/Flow'
import Panel from './ui/panel'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Panel panels={[<Flow></Flow>, <p>Test!</p>]}/>
  </React.StrictMode>
)
