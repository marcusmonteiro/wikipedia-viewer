import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TextField } from 'material-ui'

export default function SearchBox ({hintText}) {
  return (
    <MuiThemeProvider>
      <TextField hintText={hintText} />
    </MuiThemeProvider>
  )
}

SearchBox.propTypes = {
  hintText: React.PropTypes.string
}
