import React, { Component } from 'react'

import { Button, Col, Grid, Row } from 'react-bootstrap'

import TestRunner from './TestRunner.jsx!'

import tests from '../tests.js'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      tests: []
    }
  }

  runTests () {
    this.setState({
      tests: tests
    })
  }

  render () {
    return <Grid>
      <Row>
        <Col xs={10} xsOffset={1}>
          <Button
            onClick={this.runTests.bind(this)}
            bsStyle='success'
            bsSize='small'
            style={{float: 'right'}}
          >Run Tests</Button>
        </Col>
      </Row>
      <Row>
        <Col xs={10} xsOffset={1}>
          <h1>NRI Test Runner</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={10} xsOffset={1}>
          <TestRunner tests={this.state.tests}/>
        </Col>
      </Row>
    </Grid>
  }
}

export default App
