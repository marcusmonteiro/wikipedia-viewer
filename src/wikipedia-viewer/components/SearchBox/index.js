import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TextField, IconButton } from 'material-ui'

export default function SearchBox ({hintText, textFieldChangeHandler, searchIconClickHandler}) {
  return (
    <MuiThemeProvider>
      <div>
        <TextField hintText={hintText} onChange={textFieldChangeHandler} />
        <IconButton iconClassName='fa fa-search' onClick={searchIconClickHandler} />
      </div>
    </MuiThemeProvider>
  )
}

SearchBox.propTypes = {
  hintText: React.PropTypes.string,
  textFieldChangeHandler: React.PropTypes.func.isRequired,
  searchIconClickHandler: React.PropTypes.func.isRequired
}
