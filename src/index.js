import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'

import './index.css'
import 'font-awesome/css/font-awesome.min.css'

injectTapEventPlugin()

const MuiApp = () => (
  <App />
)

ReactDOM.render(
  <MuiApp />,
  document.getElementById('root')
)
