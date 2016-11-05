import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IconButton } from 'material-ui'

export default function PreviousNext ({previousFunc, nextFunc}) {
  return (
    <MuiThemeProvider>
      <div>
        <IconButton iconClassName='fa fa-arrow-left' onClick={previousFunc} />
        <IconButton iconClassName='fa fa-arrow-right' onClick={nextFunc} />
      </div>
    </MuiThemeProvider>
  )
}

PreviousNext.propTypes = {
  previousFunc: PropTypes.func.isRequired,
  nextFunc: PropTypes.func.isRequired
}
