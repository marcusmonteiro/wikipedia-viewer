import React, { Component } from 'react'
import Header from './header'
import WikipediaViewer from './wikipedia-viewer'
import Footer from './footer'
import { Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <WikipediaViewer />
          </Col>
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
