import React, { Component } from 'react'

import { Col, Grid, Row } from 'react-bootstrap'

import TestRunner from './TestRunner.jsx!'

import tests from '../tests.js'

class App extends Component {

  render () {
    return <Grid>
      <Row>
        <Col xs={10} xsOffset={1}>
          <h1>NRI Test Runner</h1>
          <TestRunner tests={tests}/>
        </Col>
      </Row>
    </Grid>
  }
}

export default App
