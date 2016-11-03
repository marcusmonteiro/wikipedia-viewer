import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TextField, IconButton } from 'material-ui'

export default function SearchBox ({hintText, func}) {
  return (
    <MuiThemeProvider>
      <div>
        <TextField hintText={hintText} />
        <IconButton iconClassName='fa fa-search' onClick={func} />
      </div>
    </MuiThemeProvider>
  )
}

SearchBox.propTypes = {
  hintText: React.PropTypes.string,
  func: React.PropTypes.func.isRequired
}
