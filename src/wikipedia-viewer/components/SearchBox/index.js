import React, { PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { TextField, IconButton } from 'material-ui'
import { Grid, Row } from 'react-bootstrap'

export default function SearchBox ({hintText, textFieldChangeHandler, searchIconClickHandler}) {
  return (
    <MuiThemeProvider>
      <Grid>
        <Row>
          <TextField hintText={hintText} onChange={textFieldChangeHandler} />
          <IconButton iconClassName='fa fa-search' onClick={searchIconClickHandler} />
        </Row>
      </Grid>
    </MuiThemeProvider>
  )
}

SearchBox.propTypes = {
  hintText: PropTypes.string,
  textFieldChangeHandler: PropTypes.func.isRequired,
  searchIconClickHandler: PropTypes.func.isRequired
}
